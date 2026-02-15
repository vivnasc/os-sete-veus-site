-- ============================================================
-- Schema para novas features: Diário Espelho + Eco Guardado
-- Executar no Supabase SQL Editor
-- ============================================================

-- 1. DIÁRIO ESPELHO — Interacções IA do journal
-- Guarda cada par reflexão/pergunta para síntese mensal
CREATE TABLE IF NOT EXISTS diario_espelho (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reflexao TEXT NOT NULL,
  pergunta_espelho TEXT NOT NULL,
  veu_numero INT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS: utilizador só vê as suas próprias entradas
ALTER TABLE diario_espelho ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own diario_espelho"
  ON diario_espelho FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own diario_espelho"
  ON diario_espelho FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Index para queries de síntese mensal
CREATE INDEX idx_diario_espelho_user_date
  ON diario_espelho(user_id, created_at DESC);


-- 2. ECOS GUARDADOS — Colecção pessoal de ecos que tocaram
CREATE TABLE IF NOT EXISTS ecos_guardados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  eco_id UUID NOT NULL REFERENCES ecos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, eco_id)
);

-- RLS: utilizador só vê os seus próprios guardados
ALTER TABLE ecos_guardados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own ecos_guardados"
  ON ecos_guardados FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own ecos_guardados"
  ON ecos_guardados FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own ecos_guardados"
  ON ecos_guardados FOR DELETE
  USING (auth.uid() = user_id);

-- Index
CREATE INDEX idx_ecos_guardados_user
  ON ecos_guardados(user_id, created_at DESC);
