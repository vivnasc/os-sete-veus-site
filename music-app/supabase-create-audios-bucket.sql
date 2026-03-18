-- Criar bucket "audios" para armazenamento de música
-- Correr no Supabase SQL Editor (https://supabase.com/dashboard)

INSERT INTO storage.buckets (id, name, public)
VALUES ('audios', 'audios', true)
ON CONFLICT (id) DO NOTHING;

-- Leitura publica (qualquer pessoa pode ouvir/stream)
CREATE POLICY "Public read audios" ON storage.objects
  FOR SELECT USING (bucket_id = 'audios');

-- Upload apenas via service role (API admin)
CREATE POLICY "Service role upload audios" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'audios');

-- Overwrite (upsert) apenas via service role
CREATE POLICY "Service role update audios" ON storage.objects
  FOR UPDATE USING (bucket_id = 'audios');

-- Delete apenas via service role
CREATE POLICY "Service role delete audios" ON storage.objects
  FOR DELETE USING (bucket_id = 'audios');
