CREATE TYPE platform AS ENUM ('PC', 'PlayStation', 'Xbox', 'Nintendo', 'Mobile');

CREATE TABLE games (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform platform NOT NULL,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP DEFAULT NOW() NOT NULL
); 