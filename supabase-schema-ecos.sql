-- ================================
-- SCHEMA SUPABASE: ECOS — COMUNIDADE DOS SETE VÉUS
-- ================================
-- Uma comunidade construída sobre ressonância, não interação.
-- Tudo é anónimo. Tudo é impermanente. Como os véus.

-- ============================================
-- 1. ECOS — Reflexões partilhadas anonimamente
-- ============================================
CREATE TABLE IF NOT EXISTS public.ecos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reflexao_id UUID REFERENCES public.reflexoes(id) ON DELETE SET NULL,
    veu_numero INTEGER NOT NULL CHECK (veu_numero >= 1 AND veu_numero <= 7),
    capitulo INTEGER,
    conteudo TEXT NOT NULL,
    temas TEXT[] DEFAULT '{}',
    -- Impermanência: ecos desvanecem-se após 30 dias
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '30 days') NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS ecos_veu_numero_idx ON public.ecos(veu_numero);
CREATE INDEX IF NOT EXISTS ecos_expires_at_idx ON public.ecos(expires_at);
CREATE INDEX IF NOT EXISTS ecos_temas_idx ON public.ecos USING GIN(temas);

ALTER TABLE public.ecos ENABLE ROW LEVEL SECURITY;

-- Qualquer utilizador autenticado pode ver ecos (são anónimos)
CREATE POLICY "Authenticated users can view non-expired ecos"
    ON public.ecos FOR SELECT
    USING (auth.uid() IS NOT NULL AND expires_at > now());

-- Utilizadores só podem inserir os seus próprios ecos
CREATE POLICY "Users can insert their own ecos"
    ON public.ecos FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Utilizadores podem apagar os seus próprios ecos
CREATE POLICY "Users can delete their own ecos"
    ON public.ecos FOR DELETE
    USING (auth.uid() = user_id);


-- ============================================
-- 2. RECONHECIMENTOS — "Reconheço-me" silenciosos
-- ============================================
CREATE TABLE IF NOT EXISTS public.reconhecimentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    eco_id UUID NOT NULL REFERENCES public.ecos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(eco_id, user_id) -- Um reconhecimento por eco, por pessoa
);

CREATE INDEX IF NOT EXISTS reconhecimentos_eco_id_idx ON public.reconhecimentos(eco_id);

ALTER TABLE public.reconhecimentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view reconhecimentos count"
    ON public.reconhecimentos FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert their own reconhecimentos"
    ON public.reconhecimentos FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reconhecimentos"
    ON public.reconhecimentos FOR DELETE
    USING (auth.uid() = user_id);


-- ============================================
-- 3. SUSSURROS — Mensagens efémeras de uma só via
-- ============================================
CREATE TABLE IF NOT EXISTS public.sussurros (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    eco_id UUID NOT NULL REFERENCES public.ecos(id) ON DELETE CASCADE,
    from_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    to_user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL CHECK (char_length(conteudo) <= 100),
    lido BOOLEAN DEFAULT FALSE,
    -- Desaparece após ser lido ou após 7 dias
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '7 days') NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS sussurros_to_user_idx ON public.sussurros(to_user_id);

ALTER TABLE public.sussurros ENABLE ROW LEVEL SECURITY;

-- Destinatários podem ver os seus sussurros
CREATE POLICY "Users can view sussurros sent to them"
    ON public.sussurros FOR SELECT
    USING (auth.uid() = to_user_id AND expires_at > now());

-- Utilizadores podem enviar sussurros
CREATE POLICY "Users can send sussurros"
    ON public.sussurros FOR INSERT
    WITH CHECK (auth.uid() = from_user_id);

-- Destinatários podem marcar como lido (update)
CREATE POLICY "Recipients can update their sussurros"
    ON public.sussurros FOR UPDATE
    USING (auth.uid() = to_user_id);


-- ============================================
-- 4. MARCAS NO CAMINHO — Frases deixadas ao completar um véu
-- ============================================
CREATE TABLE IF NOT EXISTS public.marcas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    veu_numero INTEGER NOT NULL CHECK (veu_numero >= 1 AND veu_numero <= 7),
    conteudo TEXT NOT NULL CHECK (char_length(conteudo) <= 200),
    -- Marcas desvanecem-se após 90 dias
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '90 days') NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, veu_numero) -- Uma marca por véu por pessoa
);

CREATE INDEX IF NOT EXISTS marcas_veu_numero_idx ON public.marcas(veu_numero);
CREATE INDEX IF NOT EXISTS marcas_expires_at_idx ON public.marcas(expires_at);

ALTER TABLE public.marcas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view non-expired marcas"
    ON public.marcas FOR SELECT
    USING (auth.uid() IS NOT NULL AND expires_at > now());

CREATE POLICY "Users can insert their own marcas"
    ON public.marcas FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own marcas"
    ON public.marcas FOR UPDATE
    USING (auth.uid() = user_id);


-- ============================================
-- 5. CÍRCULOS DE ESPELHO — Grupos temporários por véu
-- ============================================
CREATE TABLE IF NOT EXISTS public.circulos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    veu_numero INTEGER NOT NULL CHECK (veu_numero >= 1 AND veu_numero <= 7),
    max_membros INTEGER DEFAULT 7,
    activo BOOLEAN DEFAULT TRUE,
    -- Círculos dissolvem-se após 14 dias
    expires_at TIMESTAMP WITH TIME ZONE DEFAULT (timezone('utc'::text, now()) + interval '14 days') NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS circulos_veu_activo_idx ON public.circulos(veu_numero, activo);

ALTER TABLE public.circulos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view active circulos"
    ON public.circulos FOR SELECT
    USING (auth.uid() IS NOT NULL AND activo = TRUE AND expires_at > now());


-- Membros do círculo
CREATE TABLE IF NOT EXISTS public.circulo_membros (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    circulo_id UUID NOT NULL REFERENCES public.circulos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    -- Sombra: cor do véu + número anónimo
    sombra_nome TEXT NOT NULL,
    joined_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(circulo_id, user_id)
);

CREATE INDEX IF NOT EXISTS circulo_membros_user_idx ON public.circulo_membros(user_id);
CREATE INDEX IF NOT EXISTS circulo_membros_circulo_idx ON public.circulo_membros(circulo_id);

ALTER TABLE public.circulo_membros ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circle members can view their circle"
    ON public.circulo_membros FOR SELECT
    USING (
        auth.uid() IS NOT NULL AND
        circulo_id IN (
            SELECT circulo_id FROM public.circulo_membros WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can join circles"
    ON public.circulo_membros FOR INSERT
    WITH CHECK (auth.uid() = user_id);


-- Fragmentos partilhados no círculo (não são mensagens — são fragmentos anónimos)
CREATE TABLE IF NOT EXISTS public.circulo_fragmentos (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    circulo_id UUID NOT NULL REFERENCES public.circulos(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL CHECK (char_length(conteudo) <= 300),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS circulo_fragmentos_circulo_idx ON public.circulo_fragmentos(circulo_id);

ALTER TABLE public.circulo_fragmentos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Circle members can view fragmentos"
    ON public.circulo_fragmentos FOR SELECT
    USING (
        auth.uid() IS NOT NULL AND
        circulo_id IN (
            SELECT circulo_id FROM public.circulo_membros WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Circle members can insert fragmentos"
    ON public.circulo_fragmentos FOR INSERT
    WITH CHECK (
        auth.uid() = user_id AND
        circulo_id IN (
            SELECT circulo_id FROM public.circulo_membros WHERE user_id = auth.uid()
        )
    );


-- ============================================
-- 6. FOGUEIRA — Sessões de contemplação colectiva
-- ============================================
CREATE TABLE IF NOT EXISTS public.fogueiras (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    titulo TEXT NOT NULL,
    descricao TEXT,
    -- Agendamento
    starts_at TIMESTAMP WITH TIME ZONE NOT NULL,
    ends_at TIMESTAMP WITH TIME ZONE NOT NULL,
    -- Estado
    activa BOOLEAN DEFAULT FALSE,
    -- Frase de abertura da Vivianne
    frase_abertura TEXT,
    frase_fecho TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

ALTER TABLE public.fogueiras ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view fogueiras"
    ON public.fogueiras FOR SELECT
    USING (auth.uid() IS NOT NULL);


-- Faíscas (reflexões anónimas durante a fogueira)
CREATE TABLE IF NOT EXISTS public.fogueira_faiscas (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    fogueira_id UUID NOT NULL REFERENCES public.fogueiras(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    conteudo TEXT NOT NULL CHECK (char_length(conteudo) <= 200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS fogueira_faiscas_fogueira_idx ON public.fogueira_faiscas(fogueira_id);

ALTER TABLE public.fogueira_faiscas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view faiscas"
    ON public.fogueira_faiscas FOR SELECT
    USING (auth.uid() IS NOT NULL);

CREATE POLICY "Users can insert faiscas"
    ON public.fogueira_faiscas FOR INSERT
    WITH CHECK (auth.uid() = user_id);


-- ============================================
-- 7. MARÉ DE CONSCIÊNCIA — Dados colectivos para visualização
-- ============================================
-- View que agrega temas de ecos activos (sem dados pessoais)
CREATE OR REPLACE VIEW public.mare_consciencia AS
SELECT
    unnest(temas) AS tema,
    veu_numero,
    COUNT(*) AS intensidade,
    DATE_TRUNC('hour', created_at) AS periodo
FROM public.ecos
WHERE expires_at > now()
GROUP BY tema, veu_numero, periodo
ORDER BY periodo DESC, intensidade DESC;
