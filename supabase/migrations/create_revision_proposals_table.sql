-- Tabela para propostas de revisão de conteúdo (Espelhos e Nós)
-- A Vivianne propõe alterações via /admin/revisao/[livro]
-- Claude Code lê as propostas pendentes e aplica nos ficheiros de dados

CREATE TABLE IF NOT EXISTS public.revision_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  book_slug text NOT NULL,
  book_title text NOT NULL,
  chapter_slug text NOT NULL,
  chapter_title text NOT NULL,
  paragraph_index int NOT NULL,
  original_text text NOT NULL,
  proposed_text text NOT NULL,
  note text DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'applied', 'rejected', 'skipped')),
  created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  applied_at timestamptz,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- Trigger para updated_at
CREATE TRIGGER update_revision_proposals_updated_at
  BEFORE UPDATE ON public.revision_proposals
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Index para queries comuns
CREATE INDEX idx_revision_proposals_status ON public.revision_proposals(status);
CREATE INDEX idx_revision_proposals_book ON public.revision_proposals(book_slug);

-- RLS
ALTER TABLE public.revision_proposals ENABLE ROW LEVEL SECURITY;

-- Admins podem tudo
CREATE POLICY "Admins full access on revision_proposals"
  ON public.revision_proposals
  FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.is_admin = true
    )
  );

-- Service role pode tudo (para o script de aplicação)
CREATE POLICY "Service role full access on revision_proposals"
  ON public.revision_proposals
  FOR ALL
  USING (auth.role() = 'service_role');
