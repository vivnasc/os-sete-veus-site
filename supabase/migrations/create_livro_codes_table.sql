-- Tabela para códigos de acesso ao livro digital
CREATE TABLE IF NOT EXISTS livro_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code VARCHAR(20) UNIQUE NOT NULL,
  email VARCHAR(255),
  status VARCHAR(20) DEFAULT 'unused' CHECK (status IN ('unused', 'used', 'expired')),
  generated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE,
  used_by UUID REFERENCES auth.users(id),
  created_by VARCHAR(50) DEFAULT 'auto', -- 'auto', 'admin', 'manual'
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela para pedidos de códigos (clientes que compraram físico)
CREATE TABLE IF NOT EXISTS livro_code_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  whatsapp VARCHAR(50),
  purchase_location TEXT, -- onde comprou (livraria, evento, etc.)
  proof_url TEXT, -- URL do comprovativo (imagem upload)
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  generated_code_id UUID REFERENCES livro_codes(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  rejection_reason TEXT
);

-- Índices para performance
CREATE INDEX IF NOT EXISTS idx_livro_codes_status ON livro_codes(status);
CREATE INDEX IF NOT EXISTS idx_livro_codes_email ON livro_codes(email);
CREATE INDEX IF NOT EXISTS idx_livro_code_requests_status ON livro_code_requests(status);
CREATE INDEX IF NOT EXISTS idx_livro_code_requests_email ON livro_code_requests(email);

-- Função para gerar código único
CREATE OR REPLACE FUNCTION generate_unique_livro_code()
RETURNS VARCHAR(20) AS $$
DECLARE
  new_code VARCHAR(20);
  code_exists BOOLEAN;
BEGIN
  LOOP
    -- Gera código no formato: LIVRO-XXXXX (5 caracteres aleatórios alfanuméricos)
    new_code := 'LIVRO-' || upper(substring(md5(random()::text) from 1 for 5));

    -- Verifica se código já existe
    SELECT EXISTS(SELECT 1 FROM livro_codes WHERE code = new_code) INTO code_exists;

    -- Se não existe, retorna
    IF NOT code_exists THEN
      RETURN new_code;
    END IF;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_livro_codes_updated_at
  BEFORE UPDATE ON livro_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_livro_code_requests_updated_at
  BEFORE UPDATE ON livro_code_requests
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE livro_codes ENABLE ROW LEVEL SECURITY;
ALTER TABLE livro_code_requests ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para livro_codes
-- Admins podem ver tudo
CREATE POLICY "Admins can view all codes"
  ON livro_codes FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins podem inserir
CREATE POLICY "Admins can insert codes"
  ON livro_codes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins podem atualizar
CREATE POLICY "Admins can update codes"
  ON livro_codes FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Políticas RLS para livro_code_requests
-- Qualquer um pode criar pedido (público)
CREATE POLICY "Anyone can create code request"
  ON livro_code_requests FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Usuários podem ver seus próprios pedidos
CREATE POLICY "Users can view own requests"
  ON livro_code_requests FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');

-- Admins podem ver todos os pedidos
CREATE POLICY "Admins can view all requests"
  ON livro_code_requests FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Admins podem atualizar pedidos
CREATE POLICY "Admins can update requests"
  ON livro_code_requests FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_roles
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Comentários
COMMENT ON TABLE livro_codes IS 'Códigos de acesso ao livro digital "Os 7 Véus do Despertar"';
COMMENT ON TABLE livro_code_requests IS 'Pedidos de códigos por clientes que compraram livro físico';
COMMENT ON COLUMN livro_codes.code IS 'Código único no formato LIVRO-XXXXX';
COMMENT ON COLUMN livro_codes.status IS 'Status: unused (novo), used (já usado), expired (expirado)';
COMMENT ON COLUMN livro_code_requests.status IS 'Status: pending (aguardando), approved (aprovado), rejected (rejeitado)';
