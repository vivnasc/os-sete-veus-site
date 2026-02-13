-- ============================================
-- SCHEMA PARA SISTEMA DE ACESSOS E PAGAMENTOS
-- Os Sete Véus - Viviane Saraiva
-- ============================================

-- 1. Tabela de tipos de acesso
CREATE TABLE IF NOT EXISTS access_types (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- 'livro-fisico', 'colecao-sete-veus', 'admin'
  name TEXT NOT NULL,
  description TEXT,
  is_paid BOOLEAN DEFAULT false,
  price_mzn NUMERIC(10,2), -- Preço em Meticais
  price_usd NUMERIC(10,2), -- Preço em USD
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Tabela de pagamentos
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  access_type_code TEXT REFERENCES access_types(code),

  -- Dados do pagamento
  payment_method TEXT NOT NULL, -- 'paypal', 'mpesa', 'bank_transfer'
  amount NUMERIC(10,2) NOT NULL,
  currency TEXT NOT NULL DEFAULT 'MZN',

  -- Status
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'confirmed', 'rejected', 'expired'

  -- Detalhes específicos por método
  transaction_id TEXT, -- Número de transação (para transferência/mpesa)
  paypal_order_id TEXT, -- ID do PayPal
  mpesa_reference TEXT, -- Referência MPesa

  -- Confirmação admin
  confirmed_by UUID REFERENCES auth.users(id), -- Admin que confirmou
  confirmed_at TIMESTAMP WITH TIME ZONE,
  rejection_reason TEXT,

  -- Metadados
  user_email TEXT,
  user_phone TEXT,
  notes TEXT,

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Tabela de links especiais (para livro físico)
CREATE TABLE IF NOT EXISTS special_links (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL, -- Código único do link
  access_type_code TEXT REFERENCES access_types(code) DEFAULT 'livro-fisico',

  -- Status e uso
  is_active BOOLEAN DEFAULT true,
  is_used BOOLEAN DEFAULT false,
  used_by UUID REFERENCES auth.users(id),
  used_at TIMESTAMP WITH TIME ZONE,

  -- Limites
  max_uses INTEGER DEFAULT 1, -- Quantas vezes pode ser usado
  current_uses INTEGER DEFAULT 0,
  expires_at TIMESTAMP WITH TIME ZONE, -- Data de expiração (opcional)

  -- Metadados
  created_by UUID REFERENCES auth.users(id), -- Admin que criou
  notes TEXT, -- Notas internas (ex: "João Silva - compra 15/02")

  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Atualizar tabela purchases para incluir método de acesso
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS access_type_code TEXT REFERENCES access_types(code);
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS granted_via TEXT; -- 'payment', 'special_link', 'admin', 'migration'
ALTER TABLE purchases ADD COLUMN IF NOT EXISTS granted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 5. Índices para performance
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(status);
CREATE INDEX IF NOT EXISTS idx_special_links_code ON special_links(code);
CREATE INDEX IF NOT EXISTS idx_special_links_active ON special_links(is_active, is_used);

-- 6. Inserir tipos de acesso padrão
INSERT INTO access_types (code, name, description, is_paid, price_mzn, price_usd) VALUES
  ('admin', 'Administrador', 'Acesso total ao sistema', false, NULL, NULL),
  ('livro-fisico', 'Livro Físico', 'Acesso gratuito para quem comprou o livro físico', false, NULL, NULL),
  ('colecao-sete-veus', 'Coleção Os 7 Véus', 'Experiência completa dos 7 véus', true, 2500.00, 50.00)
ON CONFLICT (code) DO NOTHING;

-- 7. Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 8. Trigger para payments
DROP TRIGGER IF EXISTS update_payments_updated_at ON payments;
CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON payments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. Row Level Security (RLS)

-- Payments: usuários veem só os seus, admins veem todos
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all payments"
  ON payments FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'viv.saraiva@gmail.com'
    )
  );

CREATE POLICY "Users can create own payments"
  ON payments FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update payments"
  ON payments FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'viv.saraiva@gmail.com'
    )
  );

-- Special Links: só admins podem ver/criar
ALTER TABLE special_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage special links"
  ON special_links FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'viv.saraiva@gmail.com'
    )
  );

-- Access Types: todos podem ler, só admins podem modificar
ALTER TABLE access_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view access types"
  ON access_types FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage access types"
  ON access_types FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM auth.users
      WHERE auth.users.id = auth.uid()
      AND auth.users.email = 'viv.saraiva@gmail.com'
    )
  );

-- ============================================
-- CONCLUÍDO!
-- Execute este SQL no Supabase SQL Editor
-- ============================================
