-- ================================
-- SCHEMA SUPABASE: OS 7 VÉUS
-- ================================

-- TABELA: reflexoes
-- Armazena as reflexões dos leitores
CREATE TABLE IF NOT EXISTS public.reflexoes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    veu_numero INTEGER NOT NULL CHECK (veu_numero >= 1 AND veu_numero <= 7),
    capitulo INTEGER NOT NULL,
    conteudo TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index para performance
CREATE INDEX IF NOT EXISTS reflexoes_user_id_idx ON public.reflexoes(user_id);
CREATE INDEX IF NOT EXISTS reflexoes_veu_numero_idx ON public.reflexoes(veu_numero);

-- RLS (Row Level Security)
ALTER TABLE public.reflexoes ENABLE ROW LEVEL SECURITY;

-- Políticas
CREATE POLICY "Users can view their own reflexoes"
    ON public.reflexoes FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own reflexoes"
    ON public.reflexoes FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- TABELA: progresso
CREATE TABLE IF NOT EXISTS public.progresso (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    veu_numero INTEGER NOT NULL CHECK (veu_numero >= 1 AND veu_numero <= 7),
    capitulo_numero INTEGER NOT NULL,
    completado BOOLEAN DEFAULT FALSE,
    last_read_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, veu_numero, capitulo_numero)
);

-- RLS
ALTER TABLE public.progresso ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own progresso"
    ON public.progresso FOR SELECT
    USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own progresso"
    ON public.progresso FOR INSERT
    WITH CHECK (auth.uid() = user_id);
