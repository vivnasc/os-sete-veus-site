-- ============================================================
-- FIX: Corrigir TODAS as foreign keys que bloqueiam apagar users
-- Executar no Supabase SQL Editor
-- ============================================================

-- 1. Primeiro, descobrir TODAS as foreign keys que apontam para auth.users
-- (este SELECT mostra quais existem — pode ser corrido separadamente para diagnostico)

-- SELECT
--   tc.table_schema,
--   tc.table_name,
--   kcu.column_name,
--   rc.delete_rule,
--   tc.constraint_name
-- FROM information_schema.table_constraints tc
-- JOIN information_schema.key_column_usage kcu
--   ON tc.constraint_name = kcu.constraint_name
-- JOIN information_schema.referential_constraints rc
--   ON tc.constraint_name = rc.constraint_name
-- JOIN information_schema.constraint_column_usage ccu
--   ON rc.unique_constraint_name = ccu.constraint_name
-- WHERE ccu.table_schema = 'auth'
--   AND ccu.table_name = 'users'
--   AND rc.delete_rule != 'CASCADE'
-- ORDER BY tc.table_schema, tc.table_name;

-- 2. Corrigir livro_codes.used_by → SET NULL (codigo fica, user desaparece)
ALTER TABLE IF EXISTS public.livro_codes
  DROP CONSTRAINT IF EXISTS livro_codes_used_by_fkey;

ALTER TABLE IF EXISTS public.livro_codes
  ADD CONSTRAINT livro_codes_used_by_fkey
  FOREIGN KEY (used_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 3. Corrigir livro_code_requests.reviewed_by → SET NULL
ALTER TABLE IF EXISTS public.livro_code_requests
  DROP CONSTRAINT IF EXISTS livro_code_requests_reviewed_by_fkey;

ALTER TABLE IF EXISTS public.livro_code_requests
  ADD CONSTRAINT livro_code_requests_reviewed_by_fkey
  FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- 4. Corrigir livro_code_requests.generated_code_id (referencia livro_codes, nao auth.users,
--    mas pode bloquear em cadeia)
ALTER TABLE IF EXISTS public.livro_code_requests
  DROP CONSTRAINT IF EXISTS livro_code_requests_generated_code_id_fkey;

ALTER TABLE IF EXISTS public.livro_code_requests
  ADD CONSTRAINT livro_code_requests_generated_code_id_fkey
  FOREIGN KEY (generated_code_id) REFERENCES public.livro_codes(id) ON DELETE SET NULL;

-- 5. Se user_roles existir, corrigir tambem
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'user_roles') THEN
    -- Verificar se tem FK para auth.users
    IF EXISTS (
      SELECT 1 FROM information_schema.table_constraints tc
      JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
      WHERE tc.table_name = 'user_roles' AND tc.constraint_type = 'FOREIGN KEY'
        AND ccu.table_schema = 'auth' AND ccu.table_name = 'users'
    ) THEN
      -- Apagar a constraint antiga
      EXECUTE (
        SELECT 'ALTER TABLE public.user_roles DROP CONSTRAINT ' || tc.constraint_name
        FROM information_schema.table_constraints tc
        JOIN information_schema.constraint_column_usage ccu ON tc.constraint_name = ccu.constraint_name
        WHERE tc.table_name = 'user_roles' AND tc.constraint_type = 'FOREIGN KEY'
          AND ccu.table_schema = 'auth' AND ccu.table_name = 'users'
        LIMIT 1
      );
      -- Recriar com CASCADE
      ALTER TABLE public.user_roles
        ADD CONSTRAINT user_roles_user_id_fkey
        FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;
    END IF;
  END IF;
END $$;

-- 6. Garantir que profiles tem CASCADE (normalmente ja tem, mas para seguranca)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints tc
    JOIN information_schema.referential_constraints rc ON tc.constraint_name = rc.constraint_name
    JOIN information_schema.constraint_column_usage ccu ON rc.unique_constraint_name = ccu.constraint_name
    WHERE tc.table_name = 'profiles' AND tc.constraint_type = 'FOREIGN KEY'
      AND ccu.table_schema = 'auth' AND ccu.table_name = 'users'
      AND rc.delete_rule != 'CASCADE'
  ) THEN
    ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_id_fkey
      FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 7. Fix generico: encontrar e corrigir QUALQUER FK restante sem CASCADE/SET NULL
DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN (
    SELECT
      tc.table_schema,
      tc.table_name,
      kcu.column_name,
      tc.constraint_name
    FROM information_schema.table_constraints tc
    JOIN information_schema.key_column_usage kcu
      ON tc.constraint_name = kcu.constraint_name AND tc.table_schema = kcu.table_schema
    JOIN information_schema.referential_constraints rc
      ON tc.constraint_name = rc.constraint_name
    JOIN information_schema.constraint_column_usage ccu
      ON rc.unique_constraint_name = ccu.constraint_name
    WHERE ccu.table_schema = 'auth'
      AND ccu.table_name = 'users'
      AND rc.delete_rule = 'NO ACTION'
      AND tc.table_schema = 'public'
  ) LOOP
    -- Drop a constraint velha
    EXECUTE format('ALTER TABLE %I.%I DROP CONSTRAINT %I',
      r.table_schema, r.table_name, r.constraint_name);
    -- Recriar com CASCADE
    EXECUTE format('ALTER TABLE %I.%I ADD CONSTRAINT %I FOREIGN KEY (%I) REFERENCES auth.users(id) ON DELETE CASCADE',
      r.table_schema, r.table_name, r.constraint_name, r.column_name);

    RAISE NOTICE 'Fixed: %.% (%) → CASCADE', r.table_schema, r.table_name, r.column_name;
  END LOOP;
END $$;

-- 8. Antes de apagar, limpar dados do user manualmente (opcional, mas seguro)
-- Substitui USER_ID_AQUI pelo UUID do user que queres apagar
-- DELETE FROM public.livro_codes WHERE used_by = 'USER_ID_AQUI';
-- DELETE FROM public.livro_code_requests WHERE reviewed_by = 'USER_ID_AQUI';

-- Agora podes apagar o user no dashboard do Supabase!
