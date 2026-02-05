-- Sete Ecos - Schema de base de dados para Supabase
-- Executar este SQL no Supabase Dashboard > SQL Editor

-- Tabela de perfis (extends auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  current_veu TEXT CHECK (current_veu IN ('ilusao', 'medo', 'desejo', 'controlo', 'culpa', 'identidade', 'separacao')),
  veus_completed TEXT[] DEFAULT '{}',
  followers_count INTEGER DEFAULT 0,
  following_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de posts
CREATE TABLE public.posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('reflexao', 'desafio', 'progresso', 'pergunta', 'partilha')),
  veu_tag TEXT CHECK (veu_tag IN ('ilusao', 'medo', 'desejo', 'controlo', 'culpa', 'identidade', 'separacao')),
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabela de seguidores
CREATE TABLE public.follows (
  follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (follower_id, following_id),
  CHECK (follower_id != following_id)
);

-- Tabela de likes
CREATE TABLE public.likes (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, post_id)
);

-- Tabela de comentários
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indices para performance
CREATE INDEX idx_posts_author ON public.posts(author_id);
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);
CREATE INDEX idx_posts_veu ON public.posts(veu_tag);
CREATE INDEX idx_comments_post ON public.comments(post_id);
CREATE INDEX idx_follows_follower ON public.follows(follower_id);
CREATE INDEX idx_follows_following ON public.follows(following_id);
CREATE INDEX idx_likes_post ON public.likes(post_id);

-- Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança: Profiles
CREATE POLICY "Profiles são visíveis para todos" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Utilizadores editam o próprio perfil" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Políticas de segurança: Posts
CREATE POLICY "Posts são visíveis para todos" ON public.posts
  FOR SELECT USING (true);

CREATE POLICY "Utilizadores autenticados criam posts" ON public.posts
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Utilizadores apagam os próprios posts" ON public.posts
  FOR DELETE USING (auth.uid() = author_id);

-- Políticas de segurança: Follows
CREATE POLICY "Follows são visíveis para todos" ON public.follows
  FOR SELECT USING (true);

CREATE POLICY "Utilizadores autenticados seguem" ON public.follows
  FOR INSERT WITH CHECK (auth.uid() = follower_id);

CREATE POLICY "Utilizadores removem follows" ON public.follows
  FOR DELETE USING (auth.uid() = follower_id);

-- Políticas de segurança: Likes
CREATE POLICY "Likes são visíveis para todos" ON public.likes
  FOR SELECT USING (true);

CREATE POLICY "Utilizadores autenticados dão like" ON public.likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Utilizadores removem likes" ON public.likes
  FOR DELETE USING (auth.uid() = user_id);

-- Políticas de segurança: Comments
CREATE POLICY "Comentários são visíveis para todos" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "Utilizadores autenticados comentam" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Utilizadores apagam os próprios comentários" ON public.comments
  FOR DELETE USING (auth.uid() = author_id);

-- Trigger para criar perfil automáticamente quando um user se regista
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Triggers para atualizar contadores
CREATE OR REPLACE FUNCTION public.update_follow_counts()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles SET followers_count = followers_count + 1 WHERE id = NEW.following_id;
    UPDATE profiles SET following_count = following_count + 1 WHERE id = NEW.follower_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles SET followers_count = followers_count - 1 WHERE id = OLD.following_id;
    UPDATE profiles SET following_count = following_count - 1 WHERE id = OLD.follower_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_follow_change
  AFTER INSERT OR DELETE ON public.follows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_follow_counts();

CREATE OR REPLACE FUNCTION public.update_like_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET likes_count = likes_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET likes_count = likes_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_like_change
  AFTER INSERT OR DELETE ON public.likes
  FOR EACH ROW
  EXECUTE FUNCTION public.update_like_count();

CREATE OR REPLACE FUNCTION public.update_comment_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE posts SET comments_count = comments_count + 1 WHERE id = NEW.post_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE posts SET comments_count = comments_count - 1 WHERE id = OLD.post_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_comment_change
  AFTER INSERT OR DELETE ON public.comments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_comment_count();
