import { Event } from '@/types';

export const events: Event[] = [
  // Flagship Events - Day 1
  {
    id: 'f1',
    eventType: 'Flagship',
    day: 1,
    category: 'Online Games',
    event: 'BGMI',
    themedEventName: 'BGMI',
    solo: 'NA',
    group: 200,
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },

  // Flagship Events - Day 2
  {
    id: 'f2',
    eventType: 'Flagship',
    day: 2,
    category: 'Performing Arts',
    event: 'Mr & Mrs Ubuntu',
    themedEventName: 'Crown of the Cosmos',
    solo: 100,
    group: 'NA',
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },
  {
    id: 'f3',
    eventType: 'Flagship',
    day: 2,
    category: 'Performing Arts',
    event: 'Fashion Show',
    themedEventName: 'Fusion of Tatvas',
    solo: 'NA',
    group: 300,
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },
  {
    id: 'f4',
    eventType: 'Flagship',
    day: 2,
    category: 'Online Games',
    event: 'Mock Stock',
    themedEventName: 'Winds of Trade',
    solo: 100,
    group: 'NA',
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },
  {
    id: 'f5',
    eventType: 'Flagship',
    day: 2,
    category: 'Creative Challenges',
    event: 'Treasure Hunt',
    themedEventName: 'Panchtatva ki Khoj The Quest of the Five Elements',
    solo: 'NA',
    group: 200,
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },
  {
    id: 'f6',
    eventType: 'Flagship',
    day: 2,
    category: 'Creative Challenges',
    event: 'Human Ludo',
    themedEventName: 'Panchtatva Prayaan',
    solo: 'NA',
    group: 200,
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },
  {
    id: 'f7',
    eventType: 'Flagship',
    day: 2,
    category: 'Performing Arts',
    event: 'Dance (Group)',
    themedEventName: 'AgniNritya The Rhythmic Flow',
    solo: 'NA',
    group: 300,
    participationPoints: 250,
    winnerPoints: { first: 1000, second: 850, third: 700 }
  },

  // Large Events - Day 1
  {
    id: 'l1',
    eventType: 'Large',
    day: 1,
    category: 'Performing Arts',
    event: 'Singing',
    themedEventName: 'Whisper of Air',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l2',
    eventType: 'Large',
    day: 1,
    category: 'Performing Arts',
    event: 'Instrumental',
    themedEventName: 'Vadyon ka Mahasangram',
    solo: 100,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l3',
    eventType: 'Large',
    day: 1,
    category: 'Fine Arts',
    event: 'Canva',
    themedEventName: 'Canva Carnival',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l4',
    eventType: 'Large',
    day: 1,
    category: 'Sports',
    event: 'Chess',
    themedEventName: 'Battle of Minds',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l5',
    eventType: 'Large',
    day: 1,
    category: 'Creative Challenges',
    event: 'Best Out of Waste',
    themedEventName: 'PrithviSrijan Navrachna',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l6',
    eventType: 'Large',
    day: 1,
    category: 'Creative Challenges',
    event: 'Escape Room',
    themedEventName: 'Rahasaymayi Band Darwaze',
    solo: 'NA',
    group: 100,
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l7',
    eventType: 'Large',
    day: 1,
    category: 'Digital/Media',
    event: 'Story Mode Photography',
    themedEventName: 'Streams of Stories',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },

  // Large Events - Day 2
  {
    id: 'l8',
    eventType: 'Large',
    day: 2,
    category: 'Performing Arts',
    event: 'Dance (Solo)',
    themedEventName: 'AgniNritya The Rhythmic Flow',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l9',
    eventType: 'Large',
    day: 2,
    category: 'Fine Arts',
    event: 'Nail Art',
    themedEventName: 'Tips of Elements',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l10',
    eventType: 'Large',
    day: 2,
    category: 'Fine Arts',
    event: 'Tote Bag Painting',
    themedEventName: 'Roots to Bag',
    solo: 100,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l11',
    eventType: 'Large',
    day: 2,
    category: 'Literary Arts',
    event: 'Creative Writing',
    themedEventName: 'Tatva Vichaar',
    solo: 50,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },
  {
    id: 'l12',
    eventType: 'Large',
    day: 2,
    category: 'Sports',
    event: 'Badminton',
    themedEventName: 'VayuSmash',
    solo: 100,
    group: 'NA',
    participationPoints: 150,
    winnerPoints: { first: 800, second: 600, third: 400 }
  },

  // Small Events - Day 1
  {
    id: 's1',
    eventType: 'Small',
    day: 1,
    category: 'Performing Arts',
    event: 'Mono Act',
    themedEventName: 'One Frame Drama',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's2',
    eventType: 'Small',
    day: 1,
    category: 'Fine Arts',
    event: 'Rangoli',
    themedEventName: 'Colours of Heritage',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's3',
    eventType: 'Small',
    day: 1,
    category: 'Fine Arts',
    event: 'Face Beauty',
    themedEventName: 'PrithviChitra Art of the Earth',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's4',
    eventType: 'Small',
    day: 1,
    category: 'Literary Arts',
    event: 'Slam Poetry',
    themedEventName: 'Shadon Ki Mehfil',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's5',
    eventType: 'Small',
    day: 1,
    category: 'Online Games',
    event: 'E-Football',
    themedEventName: 'E-Football',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's6',
    eventType: 'Small',
    day: 1,
    category: 'Digital/Media',
    event: 'Reel Making',
    themedEventName: 'Realm of Reels',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },

  // Small Events - Day 2
  {
    id: 's7',
    eventType: 'Small',
    day: 2,
    category: 'Fine Arts',
    event: 'Mehandi',
    themedEventName: 'Bloom in Henna',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's8',
    eventType: 'Small',
    day: 2,
    category: 'Online Games',
    event: 'Stumble Guys',
    themedEventName: 'Stumble Guys',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  },
  {
    id: 's9',
    eventType: 'Small',
    day: 2,
    category: 'Online Games',
    event: 'Clash Royale',
    themedEventName: 'Clash Royal',
    solo: 50,
    group: 'NA',
    participationPoints: 50,
    winnerPoints: { first: 400, second: 300, third: 200 }
  }
];

// Utility Functions
export const getEventsByCategory = (category: Event['eventType'], day?: number) => {
  return events.filter(event => 
    event.eventType === category && (day ? event.day === day : true)
  );
};

export const getEventCategories = () => {
  const categories = new Set(events.map(event => event.category));
  return Array.from(categories);
};

export const calculateEventPoints = (
  eventId: string, 
  position: '1st' | '2nd' | '3rd' | 'participant'
) => {
  const event = events.find(e => e.id === eventId);
  if (!event) return 0;
  
  if (position === 'participant') {
    return event.participationPoints;
  }
  
  return event.winnerPoints[position === '1st' ? 'first' : position === '2nd' ? 'second' : 'third'];
};

export const getEventById = (id: string) => {
  return events.find(event => event.id === id);
};
