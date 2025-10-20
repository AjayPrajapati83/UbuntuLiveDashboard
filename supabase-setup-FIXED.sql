-- Ubuntu 2025 Dashboard - Supabase Database Schema (FIXED VERSION)
-- Run this in your Supabase SQL Editor

-- STEP 1: Create all tables first
-- Colleges table
CREATE TABLE IF NOT EXISTS colleges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  total_points INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Events table (static data, matches your current events)
CREATE TABLE IF NOT EXISTS events (
  id TEXT PRIMARY KEY,
  themed_event_name TEXT NOT NULL,
  event TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('Flagship', 'Large', 'Small')),
  category TEXT NOT NULL,
  day INTEGER NOT NULL CHECK (day IN (1, 2)),
  participation_points INTEGER NOT NULL,
  winner_points JSONB NOT NULL DEFAULT '{"1st": 1000, "2nd": 500, "3rd": 250}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Participations table (for tracking all point awards and deductions)
CREATE TABLE IF NOT EXISTS participations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  college_id UUID REFERENCES colleges(id) ON DELETE CASCADE,
  event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  position TEXT NOT NULL CHECK (position IN ('participant', '1st', '2nd', '3rd')),
  points INTEGER NOT NULL, -- Can be negative for deductions
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(college_id, event_id) -- Prevent duplicate awards for same event
);

-- STEP 2: Create function to update college total points
CREATE OR REPLACE FUNCTION update_college_total_points()
RETURNS TRIGGER AS $$
BEGIN
  -- Update total points for the affected college
  UPDATE colleges 
  SET 
    total_points = (
      SELECT COALESCE(SUM(points), 0) 
      FROM participations 
      WHERE college_id = COALESCE(NEW.college_id, OLD.college_id)
    ),
    updated_at = NOW()
  WHERE id = COALESCE(NEW.college_id, OLD.college_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

-- STEP 3: Create triggers to automatically update total points
DROP TRIGGER IF EXISTS trigger_update_college_points_insert ON participations;
DROP TRIGGER IF EXISTS trigger_update_college_points_update ON participations;
DROP TRIGGER IF EXISTS trigger_update_college_points_delete ON participations;

CREATE TRIGGER trigger_update_college_points_insert
  AFTER INSERT ON participations
  FOR EACH ROW EXECUTE FUNCTION update_college_total_points();

CREATE TRIGGER trigger_update_college_points_update
  AFTER UPDATE ON participations
  FOR EACH ROW EXECUTE FUNCTION update_college_total_points();

CREATE TRIGGER trigger_update_college_points_delete
  AFTER DELETE ON participations
  FOR EACH ROW EXECUTE FUNCTION update_college_total_points();

-- STEP 4: Set up Row Level Security (RLS) policies
ALTER TABLE colleges ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE participations ENABLE ROW LEVEL SECURITY;

-- Allow read access to all authenticated and anonymous users
CREATE POLICY "Allow read access to colleges" ON colleges FOR SELECT USING (true);
CREATE POLICY "Allow read access to events" ON events FOR SELECT USING (true);
CREATE POLICY "Allow read access to participations" ON participations FOR SELECT USING (true);

-- Allow insert/update/delete for authenticated users (admin functionality)
CREATE POLICY "Allow admin operations on colleges" ON colleges FOR ALL USING (true);
CREATE POLICY "Allow admin operations on events" ON events FOR ALL USING (true);
CREATE POLICY "Allow admin operations on participations" ON participations FOR ALL USING (true);

-- STEP 5: Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_colleges_total_points ON colleges(total_points DESC);
CREATE INDEX IF NOT EXISTS idx_participations_college_id ON participations(college_id);
CREATE INDEX IF NOT EXISTS idx_participations_event_id ON participations(event_id);
CREATE INDEX IF NOT EXISTS idx_participations_timestamp ON participations(timestamp DESC);

-- STEP 6: Enable real-time subscriptions (AFTER tables are created)
ALTER PUBLICATION supabase_realtime ADD TABLE colleges;
ALTER PUBLICATION supabase_realtime ADD TABLE participations;

-- No initial colleges - Admin will create them through the UI
-- This ensures a clean start with full admin control
