-- ============================================
-- ADICIONAR CONTROLO DE ACESSOS À TABELA PROFILES
-- ============================================

-- Adicionar campos de acesso
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS has_book_access BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS has_mirrors_access BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS has_audiobook_access BOOLEAN DEFAULT false;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS purchased_products JSONB DEFAULT '[]'::jsonb;

-- Comentários para documentação
COMMENT ON COLUMN profiles.has_book_access IS 'Acesso ao livro digital (Os 7 Véus)';
COMMENT ON COLUMN profiles.has_mirrors_access IS 'Acesso aos espelhos contemplativos';
COMMENT ON COLUMN profiles.has_audiobook_access IS 'Acesso ao audiobook';
COMMENT ON COLUMN profiles.purchased_products IS 'Array JSON com histórico de produtos comprados: [{"type": "livro", "date": "2024-01-01", "code": "LIVRO-12345"}]';

-- Criar índices para performance
CREATE INDEX IF NOT EXISTS idx_profiles_book_access ON profiles(has_book_access);
CREATE INDEX IF NOT EXISTS idx_profiles_mirrors_access ON profiles(has_mirrors_access);

-- ============================================
-- FUNÇÃO HELPER: Verificar se user tem acesso
-- ============================================

CREATE OR REPLACE FUNCTION user_has_access(user_id UUID, access_type TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  CASE access_type
    WHEN 'book' THEN
      RETURN (SELECT has_book_access FROM profiles WHERE id = user_id);
    WHEN 'mirrors' THEN
      RETURN (SELECT has_mirrors_access FROM profiles WHERE id = user_id);
    WHEN 'audiobook' THEN
      RETURN (SELECT has_audiobook_access FROM profiles WHERE id = user_id);
    ELSE
      RETURN false;
  END CASE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- FUNÇÃO: Conceder acesso quando código é usado
-- ============================================

CREATE OR REPLACE FUNCTION grant_access_from_code()
RETURNS TRIGGER AS $$
BEGIN
  -- Se código foi usado, conceder acesso ao livro
  IF NEW.used_by_email IS NOT NULL AND OLD.used_by_email IS NULL THEN
    UPDATE profiles
    SET
      has_book_access = true,
      purchased_products = purchased_products || jsonb_build_object(
        'type', 'livro',
        'date', NOW(),
        'code', NEW.code
      )
    WHERE email = NEW.used_by_email;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para conceder acesso automaticamente
DROP TRIGGER IF EXISTS trigger_grant_access_on_code_use ON livro_codes;
CREATE TRIGGER trigger_grant_access_on_code_use
  AFTER UPDATE ON livro_codes
  FOR EACH ROW
  WHEN (NEW.used_by_email IS NOT NULL AND OLD.used_by_email IS NULL)
  EXECUTE FUNCTION grant_access_from_code();

-- ============================================
-- ATUALIZAR ADMIN PARA TER TODOS OS ACESSOS
-- ============================================

UPDATE profiles
SET
  has_book_access = true,
  has_mirrors_access = true,
  has_audiobook_access = true
WHERE is_admin = true;

-- ============================================
-- PRONTO! ✅
-- ============================================
