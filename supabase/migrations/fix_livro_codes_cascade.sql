-- Corrigir foreign keys em livro_codes e livro_code_requests
-- para permitir apagar utilizadores sem bloquear.
-- ON DELETE SET NULL: o codigo fica marcado como "used" mas o user_id fica null.

-- livro_codes.used_by
ALTER TABLE livro_codes
  DROP CONSTRAINT IF EXISTS livro_codes_used_by_fkey;

ALTER TABLE livro_codes
  ADD CONSTRAINT livro_codes_used_by_fkey
  FOREIGN KEY (used_by) REFERENCES auth.users(id) ON DELETE SET NULL;

-- livro_code_requests.reviewed_by
ALTER TABLE livro_code_requests
  DROP CONSTRAINT IF EXISTS livro_code_requests_reviewed_by_fkey;

ALTER TABLE livro_code_requests
  ADD CONSTRAINT livro_code_requests_reviewed_by_fkey
  FOREIGN KEY (reviewed_by) REFERENCES auth.users(id) ON DELETE SET NULL;
