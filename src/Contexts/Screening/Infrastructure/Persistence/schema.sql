-- ===============================================
-- PRISMA - Screening Module Database Schema
-- ===============================================

-- screening_sessions
CREATE TABLE screening_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  status VARCHAR(20) NOT NULL CHECK (status IN ('ACTIVE', 'PAUSED', 'COMPLETED', 'CANCELLED')),
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_sessions_user ON screening_sessions(user_id);
CREATE INDEX idx_sessions_status ON screening_sessions(status);
CREATE INDEX idx_sessions_started_at ON screening_sessions(started_at DESC);

-- screening_messages
CREATE TABLE screening_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES screening_sessions(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  role VARCHAR(20) NOT NULL CHECK (role IN ('USER', 'ASSISTANT', 'SYSTEM')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  metadata JSONB
);

CREATE INDEX idx_messages_session ON screening_messages(session_id);
CREATE INDEX idx_messages_created_at ON screening_messages(created_at);

-- cognitive_traits
CREATE TABLE cognitive_traits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID NOT NULL REFERENCES screening_sessions(id) ON DELETE CASCADE,
  category VARCHAR(50) NOT NULL CHECK (category IN ('INTELLECTUAL', 'CREATIVE', 'SOCIO_EMOTIONAL', 'SENSORY', 'EXECUTIVE_FUNCTION')),
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  evidence TEXT NOT NULL,
  confidence DECIMAL(3,2) NOT NULL CHECK (confidence >= 0 AND confidence <= 1),
  detected_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_traits_session ON cognitive_traits(session_id);
CREATE INDEX idx_traits_category ON cognitive_traits(category);
CREATE INDEX idx_traits_confidence ON cognitive_traits(confidence DESC);

-- ===============================================
-- Row Level Security (RLS) Policies
-- ===============================================
-- NOTA: Descomentar y ajustar según tu autenticación

-- ALTER TABLE screening_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE screening_messages ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE cognitive_traits ENABLE ROW LEVEL SECURITY;

-- CREATE POLICY "Users can view their own sessions"
--   ON screening_sessions FOR SELECT
--   USING (auth.uid() = user_id);

-- CREATE POLICY "Users can insert their own sessions"
--   ON screening_sessions FOR INSERT
--   WITH CHECK (auth.uid() = user_id);

-- CREATE POLICY "Users can update their own sessions"
--   ON screening_sessions FOR UPDATE
--   USING (auth.uid() = user_id);

-- ===============================================
-- Triggers para updated_at
-- ===============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_screening_sessions_updated_at
  BEFORE UPDATE ON screening_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
