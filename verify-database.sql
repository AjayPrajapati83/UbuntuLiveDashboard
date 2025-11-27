-- Ubuntu 2025 Dashboard - Database Verification Script
-- Run this in Supabase SQL Editor to check your current setup

-- 1. Check if all required tables exist
SELECT 
  'Tables Check' as check_type,
  CASE 
    WHEN COUNT(*) = 3 THEN '✅ All tables exist'
    ELSE '❌ Missing tables: ' || (3 - COUNT(*))::text
  END as status
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('colleges', 'events', 'participations');

-- 2. Check current event count
SELECT 
  'Events Count' as check_type,
  CASE 
    WHEN COUNT(*) = 29 THEN '✅ Correct (29 events)'
    ELSE '⚠️ Current: ' || COUNT(*)::text || ' events (should be 29)'
  END as status
FROM events;

-- 3. Check event distribution by type and day
SELECT 
  'Event Distribution' as info,
  event_type,
  day,
  COUNT(*) as count
FROM events
GROUP BY event_type, day
ORDER BY day, event_type;

-- Expected:
-- Flagship | 1 | 2
-- Large    | 1 | 8
-- Small    | 1 | 6
-- Flagship | 2 | 7
-- Large    | 2 | 3
-- Small    | 2 | 3

-- 4. Check if real-time is enabled
SELECT 
  'Real-time Check' as check_type,
  CASE 
    WHEN COUNT(*) >= 2 THEN '✅ Real-time enabled for ' || COUNT(*)::text || ' tables'
    ELSE '❌ Real-time not fully enabled'
  END as status
FROM pg_publication_tables 
WHERE pubname = 'supabase_realtime'
AND tablename IN ('colleges', 'participations');

-- 5. Check if triggers exist for automatic point calculation
SELECT 
  'Triggers Check' as check_type,
  CASE 
    WHEN COUNT(*) >= 3 THEN '✅ All triggers exist'
    ELSE '⚠️ Missing triggers: ' || (3 - COUNT(*))::text
  END as status
FROM pg_trigger 
WHERE tgname LIKE '%college_points%';

-- 6. List all event categories (should only be 5)
SELECT 
  'Categories Check' as info,
  category,
  COUNT(*) as event_count
FROM events
GROUP BY category
ORDER BY category;

-- Expected categories (5 only):
-- Creative Challenges
-- Fine Arts
-- Online Games
-- Performing Arts
-- Sports

-- 7. Check colleges count
SELECT 
  'Colleges' as info,
  COUNT(*) as total_colleges,
  SUM(total_points) as total_points_awarded
FROM colleges;

-- 8. Check participations count
SELECT 
  'Participations' as info,
  COUNT(*) as total_transactions,
  COUNT(CASE WHEN points > 0 THEN 1 END) as additions,
  COUNT(CASE WHEN points < 0 THEN 1 END) as deductions
FROM participations;

-- 9. Summary
SELECT 
  '=== SUMMARY ===' as summary,
  (SELECT COUNT(*) FROM events) as total_events,
  (SELECT COUNT(*) FROM colleges) as total_colleges,
  (SELECT COUNT(*) FROM participations) as total_participations,
  (SELECT COUNT(DISTINCT category) FROM events) as total_categories;
