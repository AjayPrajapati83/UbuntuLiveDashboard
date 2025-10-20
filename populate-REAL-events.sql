-- Populate Events Table with REAL Ubuntu 2025 Events
-- Run this in your Supabase SQL Editor AFTER recreating the events table

-- Insert all REAL events from your events.ts file
INSERT INTO events (id, themed_event_name, event, event_type, category, day, participation_points, winner_points) VALUES

-- Flagship Events
('f1', 'BGMI', 'BGMI', 'Flagship', 'Online Games', 1, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f2', 'Crown of the Cosmos', 'Mr & Mrs Ubuntu', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f3', 'Fusion of Tatvas', 'Fashion Show', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f4', 'Winds of Trade', 'Mock Stock', 'Flagship', 'Online Games', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f5', 'Panchtatva ki Khoj The Quest of the Five Elements', 'Treasure Hunt', 'Flagship', 'Creative Challenges', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f6', 'Panchtatva Prayaan', 'Human Ludo', 'Flagship', 'Creative Challenges', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),
('f7', 'AgniNritya The Rhythmic Flow', 'Dance (Group)', 'Flagship', 'Performing Arts', 2, 250, '{"1st": 1000, "2nd": 850, "3rd": 700}'),

-- Large Events
('l1', 'Whisper of Air', 'Singing', 'Large', 'Performing Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l2', 'Vadyon ka Mahasangram', 'Instrumental', 'Large', 'Performing Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l3', 'Canva Carnival', 'Canva', 'Large', 'Fine Arts', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l4', 'Battle of Minds', 'Chess', 'Large', 'Sports', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l5', 'PrithviSrijan Navrachna', 'Best Out of Waste', 'Large', 'Creative Challenges', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l6', 'Rahasaymayi Band Darwaze', 'Escape Room', 'Large', 'Creative Challenges', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l7', 'Streams of Stories', 'Story Mode Photography', 'Large', 'Digital/Media', 1, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l8', 'AgniNritya The Rhythmic Flow', 'Dance (Solo)', 'Large', 'Performing Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l9', 'Tips of Elements', 'Nail Art', 'Large', 'Fine Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l10', 'Roots to Bag', 'Tote Bag Painting', 'Large', 'Fine Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l11', 'Tatva Vichaar', 'Creative Writing', 'Large', 'Literary Arts', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),
('l12', 'VayuSmash', 'Badminton', 'Large', 'Sports', 2, 150, '{"1st": 800, "2nd": 600, "3rd": 400}'),

-- Small Events
('s1', 'One Frame Drama', 'Mono Act', 'Small', 'Performing Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s2', 'Colours of Heritage', 'Rangoli', 'Small', 'Fine Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s3', 'PrithviChitra Art of the Earth', 'Face Beauty', 'Small', 'Fine Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s4', 'Shadon Ki Mehfil', 'Slam Poetry', 'Small', 'Literary Arts', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s5', 'E-Football', 'E-Football', 'Small', 'Online Games', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s6', 'Realm of Reels', 'Reel Making', 'Small', 'Digital/Media', 1, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s7', 'Bloom in Henna', 'Mehandi', 'Small', 'Fine Arts', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s8', 'Stumble Guys', 'Stumble Guys', 'Small', 'Online Games', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}'),
('s9', 'Clash Royal', 'Clash Royale', 'Small', 'Online Games', 2, 50, '{"1st": 400, "2nd": 300, "3rd": 200}');
