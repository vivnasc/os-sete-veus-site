-- Reading progress (tracks which chapters have been read)
CREATE TABLE IF NOT EXISTS reading_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_slug text NOT NULL,
  completed boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, chapter_slug)
);

-- Checklist progress (tracks interactive checklist items)
CREATE TABLE IF NOT EXISTS checklist_progress (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_slug text NOT NULL,
  item_index int NOT NULL,
  checked boolean DEFAULT false,
  checked_at timestamp with time zone,
  UNIQUE(user_id, chapter_slug, item_index)
);

-- Journal entries (reflection diary per chapter)
CREATE TABLE IF NOT EXISTS journal_entries (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  chapter_slug text NOT NULL,
  content text DEFAULT '',
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  UNIQUE(user_id, chapter_slug)
);

-- Enable Row Level Security
ALTER TABLE reading_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE checklist_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE journal_entries ENABLE ROW LEVEL SECURITY;

-- RLS policies: users can only access their own data
CREATE POLICY "Users manage own reading progress"
  ON reading_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users manage own checklist progress"
  ON checklist_progress FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users manage own journal entries"
  ON journal_entries FOR ALL
  USING (auth.uid() = user_id);
