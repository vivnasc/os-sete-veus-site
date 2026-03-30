-- Subscribers to new album releases.
-- Users opt-in via "Receber novidades" button on album pages.
-- Email sent when admin publishes a new album.

CREATE TABLE IF NOT EXISTS music_album_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  subscribed_at timestamptz DEFAULT now(),
  unsubscribed_at timestamptz,
  active boolean DEFAULT true,
  UNIQUE(email)
);

-- Anyone can insert (subscribe)
-- Users can update their own (unsubscribe)
-- Admin can read all
ALTER TABLE music_album_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can subscribe"
  ON music_album_subscribers FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can manage own subscription"
  ON music_album_subscribers FOR UPDATE
  USING (auth.uid() = user_id OR email = auth.email());

CREATE POLICY "Admin can read all"
  ON music_album_subscribers FOR SELECT
  USING (
    auth.email() = 'viv.saraiva@gmail.com'
    OR email = auth.email()
  );
