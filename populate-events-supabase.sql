-- Ubuntu 2025 Dashboard - Populate Events Table
-- Run this AFTER running supabase-setup-FIXED.sql
-- This will populate the events table with all 29 events

-- Clear existing events (if any)
TRUNCATE TABLE events CASCADE;

-- DAY 1 - Flagship Events (2)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('f1', 'BGMI', 'BGMI', 'Flagship', 'Online Games', 1, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f2', 'Winds of Trade', 'Mock Stock', 'Flagship', 'Online Games', 1, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}');

-- DAY 1 - Large Events (8)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('l1', 'Whisper of Air', 'Singing', 'Large', 'Performing Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l2', 'Vadyon ka Mahasangram', 'Instrumental', 'Large', 'Performing Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l3', 'Canva Carnival', 'Canva', 'Large', 'Fine Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l4', 'Battle of Minds', 'Chess', 'Large', 'Sports', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l5', 'PrithviSrijan - Navrachna', 'Best Out of Waste', 'Large', 'Creative Challenges', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l6', 'Rahasaymayi Band Darwaze', 'Escape Room', 'Large', 'Creative Challenges', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l7', 'VayuSmash', 'Badminton', 'Large', 'Sports', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l8', 'Streams of Stories', 'Story Mode Photography', 'Large', 'Creative Challenges', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}');

-- DAY 1 - Small Events (6)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('s1', 'One Frame Drama', 'Mono Act', 'Small', 'Performing Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s2', 'Colours of Heritage', 'Rangoli', 'Small', 'Fine Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s3', 'PrithviChitra - Art of the Earth', 'Face Beauty', 'Small', 'Fine Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s4', 'Shabdon Ki Mehfil', 'Slam Poetry', 'Small', 'Fine Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s5', 'E-Football', 'E-Football', 'Small', 'Online Games', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s6', 'Realm of Reels', 'Reel Making', 'Small', 'Creative Challenges', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}');

-- DAY 2 - Flagship Events (7)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('f3', '1 v 1 FootBall', '1v1 Football', 'Flagship', 'Sports', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f4', 'Crown of the Cosmos', 'Mr & Ms Ubuntu', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f5', 'Fusion of Tarsas', 'Fashion Show', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f6', 'AgniNiriya - The Rhythmic Flow', 'Dance (Group)', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f7', 'IPL Auction', 'IPL Auction', 'Flagship', 'Online Games', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f8', 'Panchatva ki Khoj - The Quest of the', 'Treasure Hunt', 'Flagship', 'Creative Challenges', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f9', 'Human Ludo', 'Human Ludo', 'Flagship', 'Creative Challenges', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}');

-- DAY 2 - Large Events (3)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('l9', 'AgniNiriya - The Rhythmic Flow', 'Dance (Solo)', 'Large', 'Performing Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l10', 'Roots to Bag', 'Tote Bag Painting', 'Large', 'Fine Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l11', 'Tatva vichar', 'Creative Writing', 'Large', 'Fine Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}');

-- DAY 2 - Small Events (3)
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES
('s7', 'Bloom in Henna', 'Mehandi', 'Small', 'Fine Arts', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s8', 'Stumble Guys', 'Stumble Guys', 'Small', 'Online Games', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s9', 'Clash Royal', 'Clash Royale', 'Small', 'Online Games', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}');

-- Verify the count
SELECT 
  event_type,
  day,
  COUNT(*) as count
FROM events
GROUP BY event_type, day
ORDER BY day, event_type;

-- Expected output:
-- Flagship | 1 | 2
-- Large    | 1 | 8
-- Small    | 1 | 6
-- Flagship | 2 | 7
-- Large    | 2 | 3
-- Small    | 2 | 3
-- Total: 29 events

SELECT 'Total Events: ' || COUNT(*) as summary FROM events;
