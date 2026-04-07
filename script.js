/**
 * TRAVELBOOKER V4 — CORE SCRIPT
 * Handles routing, rendering, business logic, and UI interactions.
 */

// ======================== STATE & CONSTANTS ========================
let currentCurrency = 'USD';
let isLocal = false; 
const EXCHANGE_RATE = 320; 
const LOCAL_DISCOUNT = 0.35; 

let currentUser = null;
let currentHotel = null;
let reviewStarRating = 0;

// ======================== DATA ========================

const destinations = [
  { id: 1, name: 'Colombo', region: 'Western Province', emoji: '🏙', type: 'City', desc: 'The vibrant capital city blending colonial heritage with ultramodern skylines.', hotels: 45, bestFor: 'City Break', temp: '28°C', img: 'https://images.unsplash.com/photo-1623595289196-007a22dd8560?w=600&q=80' },
  { id: 2, name: 'Kandy', region: 'Central Province', emoji: '🏯', type: 'Heritage', desc: 'The cultural heart of Sri Lanka, home to the sacred Temple of the Tooth Relic.', hotels: 32, bestFor: 'Culture & History', temp: '24°C', img: 'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?w=600&q=80' },
  { id: 3, name: 'Nuwara Eliya', region: 'Central Province', emoji: '🌿', type: 'Hill Country', desc: 'Known as "Little England", famous for rolling tea estates and waterfalls.', hotels: 28, bestFor: 'Tea & Scenery', temp: '16°C', img: 'https://images.unsplash.com/photo-1619974643633-12acfdcedd16?w=600&q=80' },
  { id: 4, name: 'Galle', region: 'Southern Province', emoji: '🏰', type: 'Heritage', desc: 'A UNESCO World Heritage city with a magnificent 17th-century Dutch fort.', hotels: 38, bestFor: 'Heritage & Beach', temp: '27°C', img: 'https://images.unsplash.com/photo-1509982724584-2ce0d4366d8b?w=600&q=80' },
  { id: 5, name: 'Mirissa', region: 'Southern Province', emoji: '🐋', type: 'Beach', desc: 'Crescent beach perfect for surfing and spotting blue whales offshore.', hotels: 24, bestFor: 'Whale Watching', temp: '29°C', img: 'https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?w=600&q=80' },
  { id: 6, name: 'Weligama', region: 'Southern Province', emoji: '🏄', type: 'Beach', desc: 'A surfer\'s paradise with gentle waves ideal for beginners.', hotels: 19, bestFor: 'Surfing', temp: '29°C', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
  { id: 7, name: 'Ella', region: 'Uva Province', emoji: '🌄', type: 'Hill Country', desc: 'Iconic Nine Arch Bridge and breathtaking valley views.', hotels: 22, bestFor: 'Hiking & Views', temp: '20°C', img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&q=80' },
  { id: 8, name: 'Sigiriya', region: 'North Central', emoji: '🪨', type: 'UNESCO Site', desc: 'The iconic 5th-century Lion Rock fortress rising from the jungle.', hotels: 15, bestFor: 'History & Adventure', temp: '30°C', img: 'https://images.unsplash.com/photo-1612862862126-865765df2ded?w=600&q=80' },
  { id: 9, name: 'Jaffna', region: 'Northern Province', emoji: '🏛', type: 'Heritage', desc: 'Vibrant northern city with a rich Tamil heritage and unique cuisine.', hotels: 12, bestFor: 'Authentic Culture', temp: '31°C', img: 'https://images.unsplash.com/photo-1725680968685-19bd1905ec7f?w=600&q=80' },
  { id: 10, name: 'Trincomalee', region: 'Eastern Province', emoji: '🐬', type: 'Beach', desc: 'Crystal-clear waters and some of Asia\'s most pristine diving spots.', hotels: 18, bestFor: 'Diving & Snorkelling', temp: '28°C', img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=600&q=80' },
  { id: 11, name: 'Arugam Bay', region: 'Eastern Province', emoji: '🌊', type: 'Beach', desc: 'Rated among the top 10 surf spots on the planet.', hotels: 16, bestFor: 'World-Class Surfing', temp: '29°C', img: 'https://images.unsplash.com/photo-1724031948257-8b3c68232ccc?w=600&q=80' },
  { id: 12, name: 'Yala', region: 'Southern Province', emoji: '🐆', type: 'Wildlife', desc: 'Home to the world\'s highest density of leopards.', hotels: 14, bestFor: 'Wildlife Safari', temp: '30°C', img: 'https://images.unsplash.com/photo-1603789764099-52b21a871336?w=600&q=80' },
  { id: 13, name: 'Hikkaduwa', region: 'Southern Province', emoji: '🤿', type: 'Beach', desc: 'Vibrant coral reefs, sea turtles, and a lively beachfront.', hotels: 26, bestFor: 'Snorkelling & Diving', temp: '29°C', img: 'https://images.unsplash.com/photo-1591025207163-942350e47db2?w=600&q=80' },
  { id: 14, name: 'Polonnaruwa', region: 'North Central', emoji: '🏛', type: 'UNESCO Site', desc: 'A UNESCO World Heritage City of royal palaces and colossal statues.', hotels: 11, bestFor: 'Ancient History', temp: '29°C', img: 'https://images.unsplash.com/photo-1643793427422-d28ccb5f1f69?w=600&q=80' },
  { id: 15, name: 'Bentota', region: 'Southern Province', emoji: '🚤', type: 'Beach', desc: 'Golden sand beaches perfect for water sports and Ayurvedic retreats.', hotels: 21, bestFor: 'Water Sports & Spa', temp: '28°C', img: 'https://images.unsplash.com/photo-1709926474736-d11e0b3fbd3e?w=600&q=80' },
  { id: 16, name: 'Unawatuna', region: 'Southern Province', emoji: '🐢', type: 'Beach', desc: 'One of Asia\'s most beautiful beaches, famous for sea turtles.', hotels: 18, bestFor: 'Beach & Snorkelling', temp: '29°C', img: 'https://images.unsplash.com/photo-1700315303907-5b222bb8bb47?w=600&q=80' }
];

const hotels = [
  { id: 1, name: 'Cinnamon Grand Colombo', location: 'Colombo 03', destination: 'Colombo', stars: 5, rating: 9.2, priceUSD: 180, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', desc: 'Colombo\'s most iconic luxury hotel.', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking'], type: 'Hotel' },
  { id: 2, name: 'Heritance Kandalama', location: 'Dambulla', destination: 'Sigiriya', stars: 5, rating: 9.5, priceUSD: 220, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80', desc: 'Architectural masterpiece where nature and luxury coexist.', amenities: ['WiFi','Pool','Spa','Gym','Restaurant'], type: 'Resort' },
  { id: 3, name: 'Amanwella Tangalle', location: 'Tangalle', destination: 'Galle', stars: 5, rating: 9.8, priceUSD: 850, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80', desc: 'Hidden luxury along a crescent of golden sand.', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront'], type: 'Resort' },
  { id: 4, name: 'The Dutch House Galle', location: 'Galle Fort', destination: 'Galle', stars: 4, rating: 9.0, priceUSD: 195, img: 'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80', desc: 'Meticulously restored 17th-century Dutch colonial mansion.', amenities: ['WiFi','Pool','Restaurant'], type: 'Boutique' },
  { id: 5, name: 'Jetwing Lighthouse', location: 'Galle', destination: 'Galle', stars: 5, rating: 8.9, priceUSD: 240, img: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80', desc: 'Bawa masterpiece overlooking the Southern Ocean.', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront'], type: 'Hotel' },
  { id: 6, name: 'Santani Wellness Resort', location: 'Kandy Hills', destination: 'Kandy', stars: 5, rating: 9.4, priceUSD: 420, img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80', desc: 'Sri Lanka\'s premier wellness retreat.', amenities: ['WiFi','Spa','Pool','Restaurant'], type: 'Resort' },
  { id: 7, name: 'Ella Jungle Resort', location: 'Ella', destination: 'Ella', stars: 4, rating: 8.7, priceUSD: 145, img: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80', desc: 'Eco-friendly resort with panoramic valley views.', amenities: ['WiFi','Pool','Restaurant'], type: 'Resort' },
  { id: 8, name: 'Shangri-La Hambantota', location: 'Hambantota', destination: 'Yala', stars: 5, rating: 9.1, priceUSD: 310, img: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80', desc: 'Stunning beach resort ideal for Yala safaris.', amenities: ['WiFi','Pool','Spa','Beachfront'], type: 'Resort' },
  { id: 9, name: 'Uga Bay Passikudah', location: 'Passikudah', destination: 'Trincomalee', stars: 5, rating: 9.3, priceUSD: 390, img: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80', desc: 'Situated on the glassy turquoise lagoon.', amenities: ['WiFi','Pool','Beachfront'], type: 'Resort' },
  { id: 10, name: 'Kahanda Kanda', location: 'Galle', destination: 'Galle', stars: 4, rating: 9.0, priceUSD: 290, img: 'https://images.unsplash.com/photo-1587874522487-fe10e9d29e45?w=800&q=80', desc: 'Exclusive villas set amidst a working tea estate.', amenities: ['WiFi','Pool','Restaurant','Spa'], type: 'Villa' },
  { id: 11, name: 'Jetwing Surf', location: 'Arugam Bay', destination: 'Arugam Bay', stars: 3, rating: 8.4, priceUSD: 95, img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', desc: 'The premium address in Arugam Bay surf Mecca.', amenities: ['WiFi','Pool','Beachfront'], type: 'Boutique' },
  { id: 12, name: 'Cinnamon Wild Yala', location: 'Yala National Park', destination: 'Yala', stars: 4, rating: 8.8, priceUSD: 220, img: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80', desc: 'Eco-conscious wilderness lodge boundary of Yala.', amenities: ['Pool','Restaurant','Wildlife'], type: 'Resort' },
  { id: 13, name: 'Earl\'s Regency Kandy', location: 'Kundasale', destination: 'Kandy', stars: 5, rating: 8.9, priceUSD: 185, img: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80', desc: 'Panoramic river views and infinity pools.', amenities: ['WiFi','Pool','Spa','Gym'], type: 'Hotel' },
  { id: 14, name: 'Helga\'s Folly Kandy', location: 'Kandy City', destination: 'Kandy', stars: 4, rating: 9.1, priceUSD: 145, img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', desc: 'Artistic labyrinth of murals and curiosities.', amenities: ['WiFi','Restaurant','Art'], type: 'Boutique' },
  { id: 15, name: 'The Kandy House', location: 'Amunugama', destination: 'Kandy', stars: 4, rating: 9.3, priceUSD: 230, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80', desc: '200-year-old Kandyan manor restored.', amenities: ['WiFi','Pool','Villa'], type: 'Boutique' },
  { id: 16, name: 'Mirissa Hills Resort', location: 'Mirissa', destination: 'Mirissa', stars: 4, rating: 8.7, priceUSD: 165, img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80', desc: 'Lush hilltop views over Mirissa Bay.', amenities: ['WiFi','Pool','Beachfront'], type: 'Resort' },
  { id: 17, name: 'Anantara Peace Haven Tangalle', location: 'Tangalle', destination: 'Mirissa', stars: 5, rating: 9.4, priceUSD: 420, img: 'https://images.unsplash.com/photo-1540541338537-71a7e3bef6cf?w=800&q=80', desc: 'Luxury clifftop escape with overwater villas.', amenities: ['WiFi','Pool','Spa','Beachfront'], type: 'Resort' },
  { id: 18, name: 'Secret Garden Villa Mirissa', location: 'Mirissa Beach', destination: 'Mirissa', stars: 3, rating: 8.5, priceUSD: 95, img: 'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80', desc: 'Tropical garden villa 100m from the beach.', amenities: ['WiFi','Pool','Garden'], type: 'Villa' },
  { id: 19, name: '98 Acres Resort & Spa', location: 'Ella', destination: 'Ella', stars: 5, rating: 9.2, priceUSD: 280, img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80', desc: 'Working tea estate with mist-covered views.', amenities: ['WiFi','Pool','Spa'], type: 'Resort' },
  { id: 20, name: 'Zion View Ella', location: 'Ella Village', destination: 'Ella', stars: 3, rating: 8.6, priceUSD: 75, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80', desc: 'Celebrated guesthouse with Ella Rock views.', amenities: ['WiFi','Rooftop'], type: 'Boutique' },
  { id: 21, name: 'Grand Hotel Nuwara Eliya', location: 'Nuwara Eliya', destination: 'Nuwara Eliya', stars: 5, rating: 8.8, priceUSD: 155, img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', desc: 'Magnificent colonial institution from 1891.', amenities: ['WiFi','Tea','Gardens'], type: 'Hotel' },
  { id: 22, name: 'Araliya Green Hills Hotel', location: 'Nuwara Eliya', destination: 'Nuwara Eliya', stars: 4, rating: 8.7, priceUSD: 120, img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80', desc: 'Contemporary mountain hotel.', amenities: ['WiFi','Pool','Heated'], type: 'Hotel' },
  { id: 23, name: 'Heritance Tea Factory', location: 'Kandapola', destination: 'Nuwara Eliya', stars: 5, rating: 9.3, priceUSD: 240, img: 'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80', desc: 'Converted Victorian-era working tea factory.', amenities: ['WiFi','Spa','History'], type: 'Hotel' },
  { id: 24, name: 'Cape Weligama Resort', location: 'Cape Weligama', destination: 'Weligama', stars: 5, rating: 9.1, priceUSD: 350, img: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80', desc: 'Celebrated headland address above Weligama Bay.', amenities: ['WiFi','Pool','Plunge'], type: 'Resort' },
  { id: 25, name: 'Mango House Weligama', location: 'Beach Road', destination: 'Weligama', stars: 3, rating: 8.4, priceUSD: 85, img: 'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80', desc: 'Vibrant surf boutique just steps from the break.', amenities: ['WiFi','Pool','Surf'], type: 'Boutique' },
  { id: 26, name: 'Water Garden Sigiriya', location: 'Sigiriya', destination: 'Sigiriya', stars: 5, rating: 9.3, priceUSD: 310, img: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80', desc: 'Breathtaking water-themed resort facing the rock.', amenities: ['WiFi','Pool','Villa'], type: 'Resort' },
  { id: 27, name: 'Aliya Resort & Spa', location: 'Sigiriya', destination: 'Sigiriya', stars: 4, rating: 8.9, priceUSD: 195, img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', desc: 'Iconic elephant-themed pool with rock views.', amenities: ['WiFi','Pool','Gym'], type: 'Resort' },
  { id: 28, name: 'Club Oceanic Nilaveli', location: 'Trincomalee', destination: 'Trincomalee', stars: 4, rating: 8.6, priceUSD: 175, img: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80', desc: 'Direct access to Pigeon Island Sanctuary.', amenities: ['WiFi','Pool','Snorkel'], type: 'Hotel' },
  { id: 29, name: 'Jungle Beach by Uga Escapes', location: 'Kuchchaveli', destination: 'Trincomalee', stars: 5, rating: 9.5, priceUSD: 480, img: 'https://images.unsplash.com/photo-1562961203-3571ed73e6fa?w=800&q=80', desc: 'Hidden where jungle meets whitesand sea.', amenities: ['WiFi','Bungalow','Private'], type: 'Resort' },
  { id: 30, name: 'Stardust Beach Hotel', location: 'Arugam Bay', destination: 'Arugam Bay', stars: 3, rating: 8.5, priceUSD: 80, img: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80', desc: 'Original and most beloved address in A-Bay.', amenities: ['WiFi','Beachfront','Surf'], type: 'Hotel' },
  { id: 31, name: 'Uga Bay Arugam', location: 'Main Point', destination: 'Arugam Bay', stars: 4, rating: 8.9, priceUSD: 195, img: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80', desc: 'Luxury tented suites floating above the lagoon.', amenities: ['WiFi','Pool','Tented'], type: 'Resort' },
  { id: 32, name: 'Jetwing Jaffna', location: 'Jaffna City', destination: 'Jaffna', stars: 4, rating: 8.8, priceUSD: 140, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80', desc: 'Finest contemporary hotel in the Northern capital.', amenities: ['WiFi','Pool','Rooftop'], type: 'Hotel' },
  { id: 33, name: 'Thinnai Heritage Jaffna', location: 'Heritage Area', destination: 'Jaffna', stars: 3, rating: 8.6, priceUSD: 95, img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', desc: 'Restored colonial merchant manor in old Jaffna.', amenities: ['WiFi','Heritage','Tamil Art'], type: 'Boutique' },
  { id: 34, name: 'Hikka Tranz by Cinnamon', location: 'Hikkaduwa Reef', destination: 'Hikkaduwa', stars: 4, rating: 8.6, priceUSD: 185, img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80', desc: 'Stylish hotel right on the vibrant coral reef.', amenities: ['WiFi','Pool','Snorkel'], type: 'Hotel' },
  { id: 35, name: 'The Sun House Hikkaduwa', location: 'Galle Road', destination: 'Hikkaduwa', stars: 4, rating: 8.9, priceUSD: 140, img: 'https://images.unsplash.com/photo-1544550581-1bcabf842b77?w=800&q=80', desc: 'Lush garden boutique 200m from the beach.', amenities: ['WiFi','Pool','Spa'], type: 'Boutique' },
  { id: 36, name: 'Taj Bentota Resort & Spa', location: 'Bentota Peninsula', destination: 'Bentota', stars: 5, rating: 9.2, priceUSD: 295, img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80', desc: 'Bawa masterpiece between ocean and river.', amenities: ['WiFi','Pool','Spa','Luxury'], type: 'Resort' },
  { id: 37, name: 'Avani Bentota Resort', location: 'Bentota Beach', destination: 'Bentota', stars: 4, rating: 8.7, priceUSD: 175, img: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80', desc: 'Active resort famous for lagoon water sports.', amenities: ['WiFi','Pool','WaterSports'], type: 'Resort' },
  { id: 38, name: 'Deer Park Hotel', location: 'Giritale', destination: 'Polonnaruwa', stars: 4, rating: 8.5, priceUSD: 125, img: 'https://images.unsplash.com/photo-1564769625393-1ea4e5898309?w=800&q=80', desc: 'Premier base for ancient city exploration.', amenities: ['WiFi','Pool','Heritage'], type: 'Hotel' },
  { id: 39, name: 'Cantaloupe Levels Unawatuna', location: 'Levels Point', destination: 'Unawatuna', stars: 4, rating: 9.0, priceUSD: 190, img: 'https://images.unsplash.com/photo-1562961203-3571ed73e6fa?w=800&q=80', desc: 'Curated boutique steps from the crescent bay.', amenities: ['WiFi','Pool','Rooftop'], type: 'Boutique' },
  { id: 40, name: 'Nooit Gedagt Hotel Unawatuna', location: 'Beach Front', destination: 'Unawatuna', stars: 3, rating: 8.4, priceUSD: 90, img: 'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80', desc: 'Relaxed colonial style right on the golden sands.', amenities: ['WiFi','Pool','Beachfront'], type: 'Hotel' },
  { id: 41, name: 'Shangri-La Colombo', location: 'Galle Face Green', destination: 'Colombo', stars: 5, rating: 9.4, priceUSD: 320, img: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80', desc: 'Soaring 41 stories above the skyline and ocean.', amenities: ['WiFi','Pool','Skyline'], type: 'Hotel' },
  { id: 42, name: 'Galle Face Hotel Colombo', location: 'Galle Face', destination: 'Colombo', stars: 5, rating: 8.8, priceUSD: 195, img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80', desc: 'Oldest hotel east of Suez.', amenities: ['WiFi','History','Colonial'], type: 'Hotel' },
  { id: 43, name: 'Cinnamon Red Colombo', location: 'Green Path', destination: 'Colombo', stars: 4, rating: 8.5, priceUSD: 145, img: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80', desc: 'Contemporary city hotel with 360° rooftop views.', amenities: ['WiFi','Rooftop','Modern'], type: 'Hotel' }
];

const tourPackages = [
    { 
        id: 'pkg-family', name: 'Ultimate Sri Lankan Family Adventure', type: 'family', category: 'Family Special', 
        duration: '10 Days', guests: '2 Adults + 2 children', priceUSD: 2400, img: 'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80',
        brief: 'Wild safaris, elephant orphanage visits, and beach fun.',
        detailedInfo: 'This 10-day journey is designed specifically for families. It includes a private safari in Yala, a visit to Pinnawala Elephant Orphanage, a train ride through tea estates, and 3 nights of relaxation on the beaches of Bentota.',
        inclusions: ['4★ Star Accommodation', 'Daily Breakfast', 'Private Transport', 'All Safari Entry Fees']
    },
    { 
        id: 'pkg-partner', name: 'Corporate Leadership Retreat', type: 'corporate', category: 'Business Partner', 
        duration: '4 Days', guests: 'Min 10 Pax', priceUSD: 1500, img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
        brief: 'Team building and strategy sessions in luxury.',
        detailedInfo: 'The perfect mix of business and pleasure. This retreat offers state-of-the-art conference facilities at Cinnamon Grand followed by team-building activities on the Negombo coastline.',
        inclusions: ['Full Board Meals', 'Conference Hall Access', 'Team Building Events', 'Cocktail Night']
    },
    { 
        id: 'pkg-honeymoon', name: 'Misty Highlands Honeymoon', type: 'honeymoon', category: 'Romantic', 
        duration: '7 Days', guests: '2 Adults', priceUSD: 1950, img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80',
        brief: 'Intimate stays in the tea estates of Ella.',
        detailedInfo: 'Celebrate your love amidst the emerald hills. Includes private pool villa stays and candlelit dinners under the stars.',
        inclusions: ['Private Pool Villa', 'Candlelit Dinners', 'Couples Spa Ritual', 'Train Tickets']
    },
    { 
        id: 'pkg-family-2', name: 'Southern Coast Family Fun', type: 'family', category: 'Family Special', 
        duration: '5 Days', guests: '2 Adults + 2 Kids', priceUSD: 1200, img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
        brief: 'Beach games, whale watching, and turtle hatcheries.',
        detailedInfo: 'A shorter but action-packed coastal break for families. Stay at the Hikka Tranz and enjoy 2 days of marine life exploration.',
        inclusions: ['Beachfront Resort', 'Kid-friendly Buffet', 'Whale Watching Boat', 'Turtle Hatchery Visit']
    },
    { 
        id: 'pkg-corp-2', name: 'Strategic Vision Summit', type: 'corporate', category: 'Business Partner', 
        duration: '3 Days', guests: 'Min 20 Pax', priceUSD: 2800, img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&q=80',
        brief: 'High-level strategy sessions at Shangri-La Colombo.',
        detailedInfo: 'Designed for executive teams. 5-star boardrooms, rooftop gala dinners, and private city tours.',
        inclusions: ['Executive Suites', 'VIP Transfer', 'Gala Dinner', 'Secretary Support']
    },
    { 
        id: 'pkg-student', name: 'Heritage & Hike Student Tour', type: 'student', category: 'Study Tour', 
        duration: '6 Days', guests: 'Min 15 Pax', priceUSD: 650, img: 'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?w=600&q=80',
        brief: 'Affordable cultural immersion for students.',
        detailedInfo: 'Visit Sigiriya, Polonnaruwa ruins, and hike Ella Rock on a budget. Perfect for university and school groups.',
        inclusions: ['Hostel / Budget Hotel', 'Local Guide', 'Entrance Tickets', 'Railway Passes']
    }
];

// ======================== COMPARE & UTIL ========================

let compareList = [];

function toggleComparePkg(id) {
    const idx = compareList.indexOf(id);
    if(idx > -1) compareList.splice(idx, 1);
    else if(compareList.length < 3) compareList.push(id);
    else { showToast('You can compare max 3 packages'); return; }
    
    updateCompareStrip();
    renderPkgCards(tourPackages); // Refresh to show ticks
}

function updateCompareStrip() {
    const strip = document.getElementById('pkgCompareStrip');
    if(!strip) return;
    strip.style.display = compareList.length > 0 ? 'flex' : 'none';
    document.getElementById('compareCount').textContent = compareList.length;
}

function clearCompare() {
    compareList = [];
    updateCompareStrip();
}

function openCompareModal() {
    const pkgs = compareList.map(id => tourPackages.find(p => p.id === id));
    let html = `
        <h2 style="font-family:var(--font-display); font-size:28px; margin-bottom:24px">Package Comparison</h2>
        <div style="display:grid; grid-template-columns:repeat(${pkgs.length}, 1fr); gap:20px">
            ${pkgs.map(p => `
                <div style="border:1px solid var(--border); border-radius:12px; padding:15px">
                    <img src="${p.img}" style="width:100%; border-radius:8px; height:120px; object-fit:cover">
                    <div style="font-weight:700; margin:10px 0; font-size:16px">${p.name}</div>
                    <div style="font-size:13px; color:var(--text-mid); margin-bottom:10px">${p.duration} • ${formatPrice(p.priceUSD)}</div>
                    <ul style="font-size:12px; padding-left:15px">
                        ${p.inclusions.slice(0,3).map(inc => `<li>${inc}</li>`).join('')}
                    </ul>
                    <button class="btn-submit" style="margin-top:15px; padding:8px" onclick="closeModal('pkgDetailModal'); openPkgDetail('${p.id}')">Select</button>
                </div>
            `).join('')}
        </div>
    `;
    document.getElementById('pkgDetailContent').innerHTML = html;
    document.getElementById('pkgDetailModal').classList.add('open');
}

function moveOTP(input) {
  if(input.value.length === 1 && input.nextElementSibling) input.nextElementSibling.focus();
}

const faqData = [
  { q: 'How do I make a booking?', a: 'Search for your destination, browse hotels, and click Book Now to proceed to safe checkout.' },
  { q: 'Can I pay in LKR?', a: 'Yes! Use the currency toggle in the navbar to switch between USD and LKR.' },
  { q: 'What is the Resident Discount?', a: 'Sri Lankan residents get an exclusive 35% discount on all hotels and packages.' },
  { q: 'Is my payment secure?', a: 'Absolutely. We use 256-bit encryption and never store your card details.' }
];

const reviewsData = [
  { name: 'Charlotte W.', origin: 'London, UK', rating: 5, text: 'Seamless booking. Website made comparing properties so easy!', initials: 'CW' },
  { name: 'Rajiv Mehta', origin: 'Mumbai, India', rating: 5, text: 'Corporate features are excellent. Responsive team.', initials: 'RM' },
  { name: 'Rajesh F.', origin: 'Colombo, LK', rating: 5, text: 'The local rates are amazing. Best site for staycations.', initials: 'RF' }
];

// ======================== INITIALIZATION ========================

window.onload = () => {
    createParticles();
    setTodayDate();
    renderDestTiles();
    renderHotelCards(hotels);
    renderPkgCards(tourPackages);
    renderReviews();
    renderFAQ();
    
    // Check login
    const saved = localStorage.getItem('tb_user');
    if(saved) {
        currentUser = JSON.parse(saved);
        updateUserUI();
    }
    
    // Scroll effect
    window.onscroll = () => {
        document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
    };

    // Filter listeners
    document.querySelectorAll('.filter-star, .filter-amenity, .filter-type, .filter-region').forEach(el => {
        el.addEventListener('change', filterHotels);
    });
};

function createParticles() {
  const container = document.getElementById('heroParticles');
  if(!container) return;
  for(let i=0; i<30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*8+'s';
    container.appendChild(p);
  }
}

function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  const next = new Date(Date.now()+86400000).toISOString().split('T')[0];
  ['heroCheckin','bookCheckin'].forEach(id => { const el=document.getElementById(id); if(el) el.value=today; });
}

// ======================== CORE UI ========================

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('page-' + pageId).classList.add('active');
    
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    if(document.getElementById('nav-' + pageId)) document.getElementById('nav-' + pageId).classList.add('active');
    
    window.scrollTo(0,0);
}

// ======================== CURRENCY & RESIDENCE ========================

function setCurrency(curr) {
    currentCurrency = curr;
    document.getElementById('btn-usd').classList.toggle('active', curr === 'USD');
    document.getElementById('btn-lkr').classList.toggle('active', curr === 'LKR');
    refreshDisplays();
    showToast(curr === 'USD' ? 'Price shown in USD' : 'Price shown in LKR');
}

function setResidence(res) {
    isLocal = (res === 'local');
    document.getElementById('btn-resident-foreign').classList.toggle('active', !isLocal);
    document.getElementById('btn-resident-local').classList.toggle('active', isLocal);
    
    if(isLocal) setCurrency('LKR');
    refreshDisplays();
    showToast(isLocal ? '🇱🇰 Sri Lankan Resident rate applied (35% OFF)!' : 'Global rates applied');
}

function formatPrice(usd) {
    let final = usd;
    if(isLocal) final = usd * (1 - LOCAL_DISCOUNT);
    
    if(currentCurrency === 'USD') return '$' + Math.round(final).toLocaleString();
    return '₨' + Math.round(final * EXCHANGE_RATE).toLocaleString();
}

function refreshDisplays() {
    renderHotelCards(hotels);
    renderPkgCards(tourPackages);
    updateBookingSummary();
}

// ======================== RENDERING ========================

function renderDestTiles() {
    const grid = document.getElementById('destTilesGrid');
    grid.innerHTML = destinations.map(d => `
        <div class="dest-tile" onclick="openDestination('${d.name}')">
            <img class="dest-tile-img" src="${d.img}" alt="${d.name}">
            <div class="dest-tile-grad"></div>
            <div class="dest-tile-info">
                <div class="dest-tile-name">${d.emoji} ${d.name}</div>
                <div class="dest-tile-meta">${d.hotels} Hotels • ${d.temp}</div>
            </div>
            <div class="dest-tile-hover">
                <div class="dest-tile-hover-title">${d.name}</div>
                <p class="dest-tile-hover-desc">${d.desc}</p>
                <div style="font-size:11px; margin-bottom:10px; opacity:0.8">Best for: ${d.bestFor}</div>
                <button class="btn-explore">Explore <i class="fas fa-arrow-right"></i></button>
            </div>
        </div>
    `).join('');
}

function renderHotelCards(list) {
    const container = document.getElementById('hotelCards');
    if(!container) return;
    
    document.getElementById('hotelCount').textContent = list.length;
    container.innerHTML = list.map(h => `
        <div class="hotel-card" onclick="openHotelDetail(${h.id})">
            <div class="hotel-card-img">
                <img src="${h.img}" alt="${h.name}">
                <div class="hotel-card-badge">${h.stars}★ Rating</div>
            </div>
            <div class="hotel-card-body">
                <div class="hotel-card-name">${h.name}</div>
                <div class="hotel-card-location"><i class="fas fa-map-marker-alt"></i> ${h.location}, ${h.destination}</div>
                <div class="hotel-card-footer">
                    <div class="hotel-card-price">
                        <div class="amount">${formatPrice(h.priceUSD)}</div>
                        <div class="per">per night</div>
                    </div>
                    <button class="btn-view-details">View Details</button>
                </div>
            </div>
        </div>
    `).join('');
}

function renderPkgCards(list) {
    const grid = document.getElementById('pkgCards');
    if(!grid) return;
    
    grid.innerHTML = list.map(p => {
        const isCompared = compareList.includes(p.id);
        return `
            <div class="dest-tile ${isCompared ? 'selected' : ''}" onclick="openPkgDetail('${p.id}')">
                <img class="dest-tile-img" src="${p.img}" alt="${p.name}">
                <div class="dest-tile-grad" style="background:linear-gradient(to top, rgba(11,110,79,0.9) 0%, transparent 100%)"></div>
                <!-- Compare Checkbox -->
                <div class="compare-checkbox-wrap" onclick="event.stopPropagation(); toggleComparePkg('${p.id}')">
                    <div class="compare-checkbox ${isCompared ? 'active' : ''}"><i class="fas fa-check"></i></div>
                    <span>Compare</span>
                </div>
                <div class="dest-tile-info">
                    <div style="font-size:11px; text-transform:uppercase; color:var(--gold); font-weight:700">${p.category}</div>
                    <div class="dest-tile-name" style="font-size:22px">${p.name}</div>
                    <div class="dest-tile-meta">${p.duration} • ${formatPrice(p.priceUSD)}</div>
                </div>
                <div class="dest-tile-hover">
                    <div class="dest-tile-hover-title">${p.name}</div>
                    <p class="dest-tile-hover-desc">${p.brief}</p>
                    <div style="font-weight:700; color:white; margin-bottom:15px">${formatPrice(p.priceUSD)}</div>
                    <button class="btn-explore">Book Now <i class="fas fa-calendar-check"></i></button>
                </div>
            </div>
        `;
    }).join('');
}

function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if(!grid) return;
  grid.innerHTML = reviewsData.map(r => `
    <div class="review-card">
      <div class="review-stars"><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i></div>
      <p class="review-text">"${r.text}"</p>
      <div class="review-author">
        <div class="review-avatar" style="background:var(--deep-teal)">${r.initials}</div>
        <div>
          <div class="review-name">${r.name}</div>
          <div class="review-origin">${r.origin}</div>
        </div>
      </div>
    </div>
  `).join('');
}

function renderFAQ() {
  const container = document.getElementById('faqList');
  if(!container) return;
  container.innerHTML = faqData.map(f => `
    <div class="faq-item" onclick="this.classList.toggle('active')">
      <div class="faq-q">${f.q} <i class="fas fa-chevron-down"></i></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

// ======================== COMMERCE FLOW ========================

function openDestination(name) {
    const filtered = hotels.filter(h => h.destination === name);
    renderHotelCards(filtered);
    document.getElementById('destPageSubtitle').textContent = `Showing properties in ${name}`;
    showPage('destinations');
}

function openHotelDetail(id) {
    currentHotel = hotels.find(h => h.id === id);
    document.getElementById('detailHeroImg').src = currentHotel.img;
    document.getElementById('detailHotelName').textContent = currentHotel.name;
    document.getElementById('detailHotelLocation').textContent = currentHotel.location;
    document.getElementById('detailDesc').textContent = currentHotel.desc;
    document.getElementById('detailPriceHero').textContent = formatPrice(currentHotel.priceUSD);
    
    const rooms = ['https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400', 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400', 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400'];
    document.getElementById('detailRoomGallery').innerHTML = rooms.map(i => `<div class="room-img-wrap"><img src="${i}"></div>`).join('');
    
    updateBookingSummary();
    showPage('hotel-detail');
}

function openPkgDetail(id) {
    const pkg = tourPackages.find(p => p.id === id);
    const content = `
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:30px">
            <img src="${pkg.img}" style="width:100%; border-radius:15px; height:350px; object-fit:cover">
            <div>
                <div style="font-size:12px; font-weight:700; color:var(--gold); text-transform:uppercase">${pkg.category}</div>
                <h2 style="font-family:var(--font-display); font-size:32px; margin:10px 0">${pkg.name}</h2>
                <p style="color:var(--text-mid); line-height:1.7; margin-bottom:20px">${pkg.detailedInfo}</p>
                <div style="font-weight:700; margin-bottom:10px">What's Included:</div>
                <ul style="list-style:none; padding:0; margin-bottom:25px">
                    ${pkg.inclusions.map(i => `<li style="font-size:14px; margin-bottom:6px"><i class="fas fa-check-circle" style="color:var(--deep-teal); margin-right:8px"></i> ${i}</li>`).join('')}
                </ul>
                <div style="display:flex; justify-content:space-between; align-items:center">
                    <div>
                        <div style="font-size:12px; color:var(--text-light)">Package Price</div>
                        <div style="font-size:24px; font-weight:700; color:var(--deep-teal)">${formatPrice(pkg.priceUSD)}</div>
                    </div>
                    <button class="btn-book-now" style="width:auto; padding:12px 30px" onclick="closeModal('pkgDetailModal'); proceedToPayment();">Check Out</button>
                </div>
            </div>
        </div>
    `;
    document.getElementById('pkgDetailContent').innerHTML = content;
    document.getElementById('pkgDetailModal').classList.add('open');
}

function updateBookingSummary() {
    if(!currentHotel) return;
    const rooms = parseInt(document.getElementById('bookRooms').value) || 1;
    const guests = parseInt(document.getElementById('bookGuests').value) || 2;
    
    let subtotalUSD = currentHotel.priceUSD * rooms * 2; 
    let discountUSD = 0;
    if(isLocal) discountUSD = subtotalUSD * LOCAL_DISCOUNT;
    if(guests >= 10) discountUSD += subtotalUSD * 0.15;
    
    let totalUSD = subtotalUSD - discountUSD;
    
    document.getElementById('summarySubtotal').textContent = formatPrice(subtotalUSD);
    document.getElementById('summaryTotal').textContent = formatPrice(totalUSD);
}

function proceedToPayment() {
    if(!currentHotel) return;
    document.getElementById('paymentHotelName').textContent = currentHotel.name;
    document.getElementById('paySummaryHotel').textContent = currentHotel.name;
    document.getElementById('payHotelImg').src = currentHotel.img;
    document.getElementById('payGrandTotal').textContent = document.getElementById('summaryTotal').textContent;
    document.getElementById('payTotalDisplay').textContent = document.getElementById('summaryTotal').textContent;
    showPage('payment');
}

function confirmPayment() {
    const btn = document.querySelector('.btn-book-now');
    btn.textContent = 'Processing Payment...';
    btn.disabled = true;
    
    setTimeout(() => {
        document.getElementById('successRef').textContent = 'TB-2026-' + Math.floor(1000 + Math.random()*9000);
        showPage('booking-success');
    }, 2000);
}

// ======================== AUTH ========================

let captchaVerified = false;
let signupStep = 1;

function verifyCaptcha() {
    const box = document.querySelector('.captcha-box');
    box.classList.add('loading');
    setTimeout(() => {
        box.classList.remove('loading');
        box.classList.add('verified');
        captchaVerified = true;
        showToast('Captcha Verified ✓');
    }, 1500);
}

function signupNextStep() {
    const fn = document.getElementById('suFirstName').value;
    const em = document.getElementById('suEmail').value;
    
    if(signupStep === 1) {
        if(!fn || !em) { showToast('Please fill in your details'); return; }
        document.getElementById('signupStep1').style.display = 'none';
        document.getElementById('signupStep2').style.display = 'block';
        signupStep = 2;
    } else if(signupStep === 2) {
        if(!captchaVerified) { showToast('Please verify the CAPTCHA'); return; }
        document.getElementById('signupStep2').style.display = 'none';
        document.getElementById('signupStep3').style.display = 'block';
        signupStep = 3;
    }
    showToast('Next Step...');
}

function completeSignup() {
    const type = document.getElementById('suUserType').value;
    currentUser = { 
        firstName: document.getElementById('suFirstName').value, 
        lastName: document.getElementById('suLastName').value || '',
        email: document.getElementById('suEmail').value,
        userType: type,
        loyaltyPoints: 500,
        ref: 'TB-' + Math.floor(10000 + Math.random()*90000),
        bookings: []
    };
    saveUserAndFinish();
}

function completeLogin() {
    const email = document.getElementById('loginEmail').value;
    if(!email) { showToast('Please enter your email'); return; }
    
    document.getElementById('loginStep1').style.display = 'none';
    document.getElementById('loginStepOTP').style.display = 'block';
    showToast('OTP sent to your email');
}

function verifyOTP() {
    currentUser = { 
        firstName: 'John', 
        lastName: 'Fernando',
        email: document.getElementById('loginEmail').value,
        userType: 'tourist',
        loyaltyPoints: 2450,
        ref: 'TB-99234',
        bookings: [
            { hotel: 'Cinnamon Grand Colombo', date: 'Dec 12, 2023', status: 'Confirmed', price: '$360', img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=200' }
        ]
    };
    saveUserAndFinish();
}

function saveUserAndFinish() {
    localStorage.setItem('tb_user', JSON.stringify(currentUser));
    updateUserUI();
    showToast('Welcome back, ' + currentUser.firstName + '!');
    showPage('home');
}

function logoutUser() {
    localStorage.removeItem('tb_user');
    currentUser = null;
    document.getElementById('authButtons').style.display = 'flex';
    document.getElementById('userMenu').style.display = 'none';
    showPage('home');
    showToast('Logged out successfully');
}

function updateUserUI() {
    if(!currentUser) return;
    document.getElementById('authButtons').style.display = 'none';
    document.getElementById('userMenu').style.display = 'flex';
    document.getElementById('navAvatarInitial').textContent = currentUser.firstName[0];
    document.getElementById('navUserName').textContent = currentUser.firstName;
    
    // Update Profile page if it's rendered
    if(document.getElementById('profileDisplayName')) {
        document.getElementById('profileDisplayName').textContent = currentUser.firstName + ' ' + (currentUser.lastName || '');
        document.getElementById('profileEmail').textContent = currentUser.email;
        document.getElementById('profileAvatarBig').textContent = currentUser.firstName[0];
        document.getElementById('profileLoyaltyNum').textContent = currentUser.loyaltyPoints.toLocaleString();
        switchProfileTab('overview');
    }
}

// ======================== PROFILE TABBING ========================

function switchProfileTab(tab, btn) {
    if(btn) {
        document.querySelectorAll('.profile-nav-item').forEach(i => i.classList.remove('active'));
        btn.classList.add('active');
    }
    
    const content = document.getElementById('profileContent');
    if(!content) return;
    
    if(tab === 'overview') {
        content.innerHTML = `
            <div class="profile-card">
                <div class="profile-card-title">Account Overview</div>
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:15px; margin-bottom:20px">
                    <div style="background:var(--cream); padding:20px; border-radius:12px; text-align:center">
                        <div style="font-size:24px; font-weight:700; color:var(--deep-teal)">${currentUser.bookings.length}</div>
                        <div style="font-size:12px; color:var(--text-light)">Bookings</div>
                    </div>
                    <div style="background:rgba(201,168,76,0.1); padding:20px; border-radius:12px; text-align:center">
                        <div style="font-size:24px; font-weight:700; color:var(--gold)">${currentUser.loyaltyPoints}</div>
                        <div style="font-size:12px; color:var(--text-light)">Loyalty Points</div>
                    </div>
                    <div style="background:var(--light-teal); padding:20px; border-radius:12px; text-align:center">
                        <div style="font-size:24px; font-weight:700; color:var(--deep-teal)">Gold</div>
                        <div style="font-size:12px; color:var(--text-light)">Membership</div>
                    </div>
                </div>
                <div style="font-weight:700; margin-bottom:10px">Quick Links</div>
                <div style="display:flex; gap:10px">
                    <button class="btn-submit" style="width:auto; padding:10px 20px; font-size:13px" onclick="showPage('destinations')">Book New Trip</button>
                    <button class="btn-submit" style="width:auto; padding:10px 20px; font-size:13px; background:white; color:var(--navy); border:1px solid var(--navy)" onclick="switchProfileTab('bookings')">View History</button>
                </div>
            </div>
        `;
    } else if(tab === 'bookings') {
        const historyHtml = currentUser.bookings.length ? currentUser.bookings.map(b => `
            <div class="booking-history-item">
                <img src="${b.img}" class="booking-hist-img">
                <div>
                    <div class="booking-hist-hotel">${b.hotel}</div>
                    <div class="booking-hist-dates">${b.date}</div>
                    <div class="booking-hist-ref">REF: TB-99234</div>
                </div>
                <div style="text-align:right">
                    <div class="status-confirmed booking-hist-status">Confirmed</div>
                    <div style="font-weight:700; margin-top:8px">${b.price}</div>
                </div>
            </div>
        `).join('') : '<div style="text-align:center; padding:40px; color:var(--text-light)">No bookings found yet.</div>';
        
        content.innerHTML = `
            <div class="profile-card">
                <div class="profile-card-title">My Booking History</div>
                ${historyHtml}
            </div>
        `;
    } else {
        content.innerHTML = `<div class="profile-card"><div class="profile-card-title">${tab.charAt(0).toUpperCase() + tab.slice(1)}</div><p style="color:var(--text-light)">This section is under maintenance.</p></div>`;
    }
}

// ======================== OTHER ========================

function showToast(msg) {
    const t = document.getElementById('toast');
    document.getElementById('toastMsg').textContent = msg;
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 3000);
}

function closeModal(id) { document.getElementById(id).classList.remove('open'); }

function filterPkgs(type, btn) {
    if(btn) {
        document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }
    const filtered = (type === 'all' ? tourPackages : tourPackages.filter(p => p.type === type));
    renderPkgCards(filtered);
}

function toggleChatbot() { document.getElementById('chatbotWindow').classList.toggle('open'); }

function chatSend(msg) {
    const input = document.getElementById('chatInput');
    const text = msg || input.value.trim();
    if(!text) return;
    
    const msgs = document.getElementById('chatMessages');
    msgs.innerHTML += `<div class="chat-msg chat-msg-user"><div class="chat-bubble">${text}</div></div>`;
    input.value = '';
    
    setTimeout(() => {
        let resp = "I'm Ayu! I can help you find hotels in " + destinations[Math.floor(Math.random()*destinations.length)].name + " or anywhere in Sri Lanka.";
        if(text.toLowerCase().includes('beach')) resp = "Sri Lanka has incredible beaches! Mirissa, Weligama, and Bentota are among our favorites.";
        msgs.innerHTML += `<div class="chat-msg chat-msg-bot"><div class="chat-bubble">${resp}</div></div>`;
        msgs.scrollTop = msgs.scrollHeight;
    }, 1000);
}

function filterHotels() {
    const range = document.getElementById('priceRange').value;
    updatePrice(range);
    
    const selectedStars = Array.from(document.querySelectorAll('.filter-star:checked')).map(cb => parseInt(cb.value));
    const selectedAmenities = Array.from(document.querySelectorAll('.filter-amenity:checked')).map(cb => cb.value);
    const selectedTypes = Array.from(document.querySelectorAll('.filter-type:checked')).map(cb => cb.value);
    const selectedRegions = Array.from(document.querySelectorAll('.filter-region:checked')).map(cb => cb.value);

    const filtered = hotels.filter(h => {
        const matchesPrice = (h.priceUSD <= range);
        const matchesStars = selectedStars.length === 0 || selectedStars.includes(h.stars);
        const matchesAmenities = selectedAmenities.length === 0 || selectedAmenities.every(a => h.amenities.includes(a));
        const matchesType = selectedTypes.length === 0 || selectedTypes.includes(h.type || 'Hotel');
        
        // Find destination region
        const dest = destinations.find(d => d.name === h.destination);
        const matchesRegion = selectedRegions.length === 0 || (dest && selectedRegions.some(r => dest.region.includes(r)));

        return matchesPrice && matchesStars && matchesAmenities && matchesType && matchesRegion;
    });

    renderHotelCards(filtered);
}

function updatePrice(val) {
    document.getElementById('priceDisplay').textContent = formatPrice(parseInt(val));
}
