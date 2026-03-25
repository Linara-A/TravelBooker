// ======================== DATA ========================
const EXCHANGE_RATE = 320; // 1 USD = 320 LKR
let currentCurrency = 'USD';
let currentUser = null;
let currentHotel = null;
let captchaVerified = false;
let captchaVerified2 = false;
let reviewStarRating = 0;
let otpTimerInterval = null;

const destinations = [
  { id: 1, name: 'Colombo', region: 'Western Province', emoji: '🏙', type: 'City', desc: 'The vibrant capital city blending colonial heritage with ultramodern skylines. Home to iconic cafés, bustling Pettah markets, and the serene Beira Lake.', hotels: 45, bestFor: 'City Break', temp: '28°C' },
  { id: 2, name: 'Kandy', region: 'Central Province', emoji: '🏯', type: 'Heritage', desc: 'The cultural heart of Sri Lanka, home to the sacred Temple of the Tooth Relic and a world-renowned botanical garden amid mist-covered hills.', hotels: 32, bestFor: 'Culture & History', temp: '24°C' },
  { id: 3, name: 'Nuwara Eliya', region: 'Central Province', emoji: '🌿', type: 'Hill Country', desc: 'Known as "Little England", this charming hill town offers rolling tea estates, waterfalls, cool misty mornings, and colonial-era bungalows.', hotels: 28, bestFor: 'Tea & Scenery', temp: '16°C' },
  { id: 4, name: 'Galle', region: 'Southern Province', emoji: '🏰', type: 'Heritage', desc: 'A UNESCO World Heritage city with a magnificent 17th-century Dutch fort, boutique hotels within old ramparts, and pristine southern beaches.', hotels: 38, bestFor: 'Heritage & Beach', temp: '27°C' },
  { id: 5, name: 'Mirissa', region: 'Southern Province', emoji: '🐋', type: 'Beach', desc: 'Sri Lanka\'s whale-watching capital — a laid-back crescent beach perfect for surfing at dawn, fresh seafood at dusk, and spotting blue whales offshore.', hotels: 24, bestFor: 'Whale Watching', temp: '29°C' },
  { id: 6, name: 'Weligama', region: 'Southern Province', emoji: '🏄', type: 'Beach', desc: 'A surfer\'s paradise with gentle waves ideal for beginners. Famous for stilt fishermen, coconut groves, and some of the freshest catch in Sri Lanka.', hotels: 19, bestFor: 'Surfing', temp: '29°C' },
  { id: 7, name: 'Ella', region: 'Uva Province', emoji: '🌄', type: 'Hill Country', desc: 'A backpacker-turned-luxury destination with the iconic Nine Arch Bridge, Little Adam\'s Peak, and breathtaking valley views from every rooftop café.', hotels: 22, bestFor: 'Hiking & Views', temp: '20°C' },
  { id: 8, name: 'Sigiriya', region: 'North Central', emoji: '🪨', type: 'UNESCO Site', desc: 'The iconic 5th-century Lion Rock fortress rising dramatically from the jungle plain — one of Asia\'s most remarkable archaeological wonders.', hotels: 15, bestFor: 'History & Adventure', temp: '30°C' },
  { id: 9, name: 'Jaffna', region: 'Northern Province', emoji: '🏛', type: 'Heritage', desc: 'Sri Lanka\'s vibrant northern city with a rich Tamil heritage, ancient temples, unique cuisine with distinctive flavours, and extraordinary warmth.', hotels: 12, bestFor: 'Authentic Culture', temp: '31°C' },
  { id: 10, name: 'Trincomalee', region: 'Eastern Province', emoji: '🐬', type: 'Beach', desc: 'One of the world\'s finest natural harbours with crystal-clear waters, hot springs at Kanniyai, and some of Asia\'s most pristine diving spots.', hotels: 18, bestFor: 'Diving & Snorkelling', temp: '28°C' },
  { id: 11, name: 'Arugam Bay', region: 'Eastern Province', emoji: '🌊', type: 'Beach', desc: 'Rated among the top 10 surf spots on the planet — a hippy beach village with powerful swells, yoga retreats, and stunning sunset surf sessions.', hotels: 16, bestFor: 'World-Class Surfing', temp: '29°C' },
  { id: 12, name: 'Yala', region: 'Southern Province', emoji: '🐆', type: 'Wildlife', desc: 'Home to the world\'s highest density of leopards. Yala National Park offers dawn jeep safaris, elephant herds, sloth bears, and crocodiles.', hotels: 14, bestFor: 'Wildlife Safari', temp: '30°C' },
  { id: 13, name: 'Hikkaduwa', region: 'Southern Province', emoji: '🤿', type: 'Beach', desc: 'Sri Lanka\'s premier snorkelling and diving destination — famed for vibrant coral reefs, sea turtles, and a lively beachfront strip with the freshest seafood.', hotels: 26, bestFor: 'Snorkelling & Diving', temp: '29°C' },
  { id: 14, name: 'Polonnaruwa', region: 'North Central', emoji: '🏛', type: 'UNESCO Site', desc: 'Sri Lanka\'s magnificent medieval capital — a UNESCO World Heritage City of royal palaces, colossal Buddha statues, and vast ancient reservoirs.', hotels: 11, bestFor: 'Ancient History', temp: '29°C' },
  { id: 15, name: 'Bentota', region: 'Southern Province', emoji: '🌊', type: 'Beach', desc: 'A sun-drenched resort town where a tranquil river meets the Indian Ocean — perfect for water sports, Ayurvedic retreats, and golden sand beaches.', hotels: 21, bestFor: 'Water Sports & Spa', temp: '28°C' },
  { id: 16, name: 'Unawatuna', region: 'Southern Province', emoji: '🐢', type: 'Beach', desc: 'A sheltered crescent of calm turquoise water protected by coral reef — one of Asia\'s most beautiful beaches, famous for sea turtles and reef snorkelling.', hotels: 18, bestFor: 'Beach & Snorkelling', temp: '29°C' },
];

const hotels = [
  { id: 1, name: 'Cinnamon Grand Colombo', location: 'Colombo 03', destination: 'Colombo', stars: 5, rating: 9.2, ratingLabel: 'Exceptional', priceUSD: 280, originalUSD: 350, discount: 20, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking','Concierge','Airport TX'], badge: '20% OFF', desc: 'Colombo\'s most iconic luxury hotel, rising above the Galle Face promenade. Featuring eight world-class restaurants, a rooftop infinity pool, and stunning views over the Indian Ocean. Impeccably designed rooms blend contemporary elegance with traditional Kandyan motifs.', events:[{month:'Apr',day:4,name:'Avurudu Gala Evening',time:'7:00 PM – 11:00 PM',hot:true},{month:'Apr',day:12,name:'Wine Tasting Night',time:'6:30 PM – 9:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { id: 2, name: 'Heritance Kandalama', location: 'Dambulla', destination: 'Sigiriya', stars: 5, rating: 9.5, ratingLabel: 'Outstanding', priceUSD: 320, originalUSD: 320, discount: 0, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking','Beachfront','Concierge'], badge: null, desc: 'Designed by visionary architect Geoffrey Bawa, Heritance Kandalama rises organically from the jungle rock face overlooking Kandalama Lake and the ancient Sigiriya Rock Fortress. An architectural masterpiece where nature and luxury coexist.', events:[{month:'Apr',day:6,name:'Jungle Wellness Retreat',time:'6:00 AM – 12:00 PM',hot:true},{month:'Apr',day:15,name:'Sri Lankan Cooking Class',time:'4:00 PM – 7:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80' },
  { id: 3, name: 'Amanwella Tangalle', location: 'Tangalle', destination: 'Galle', stars: 5, rating: 9.8, ratingLabel: 'Exceptional', priceUSD: 850, originalUSD: 1000, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Beachfront','Concierge','Airport TX'], badge: 'Luxury Pick', desc: 'One of Asia\'s finest boutique resorts, Amanwella is hidden along a crescent of golden sand in Tangalle. Just 30 private suites with private plunge pools, an oceanfront restaurant, and a holistic spa offering ancient Ayurvedic treatments.', events:[{month:'Apr',day:8,name:'Moonlight Beach Dinner',time:'8:00 PM – 11:00 PM',hot:true},{month:'Apr',day:20,name:'Ayurveda Sunrise Session',time:'5:30 AM – 8:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80' },
  { id: 4, name: 'The Dutch House Galle', location: 'Galle Fort', destination: 'Galle', stars: 4, rating: 9.0, ratingLabel: 'Wonderful', priceUSD: 195, originalUSD: 195, discount: 0, type: 'Boutique', amenities: ['WiFi','Pool','Restaurant','Concierge','Parking'], badge: null, desc: 'A meticulously restored 17th-century Dutch colonial mansion within the UNESCO-listed Galle Fort walls. Only four exclusive suites, each furnished with antiques, offering an extraordinarily intimate and historically immersive experience.', events:[{month:'Apr',day:10,name:'Fort Heritage Walk',time:'7:00 AM – 9:00 AM',hot:false},{month:'Apr',day:18,name:'Colonial Cocktail Evening',time:'6:00 PM – 9:00 PM',hot:true}], img:'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80' },
  { id: 5, name: 'Jetwing Lighthouse', location: 'Galle', destination: 'Galle', stars: 5, rating: 8.9, ratingLabel: 'Wonderful', priceUSD: 240, originalUSD: 280, discount: 14, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Restaurant','Gym','Parking','Beachfront'], badge: null, desc: 'Perched dramatically on a rocky headland overlooking the Southern Ocean, Jetwing Lighthouse is another Geoffrey Bawa masterpiece. Featuring sweeping ocean views, a gorgeous outdoor pool, and exceptional Sri Lankan cuisine.', events:[{month:'Apr',day:5,name:'Sunset Cocktail Hour',time:'5:30 PM – 7:30 PM',hot:true},{month:'Apr',day:22,name:'Seafood BBQ Night',time:'7:00 PM – 10:00 PM',hot:true}], img:'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800&q=80' },
  { id: 6, name: 'Santani Wellness Resort', location: 'Kandy Hills', destination: 'Kandy', stars: 5, rating: 9.4, ratingLabel: 'Exceptional', priceUSD: 420, originalUSD: 480, discount: 12, type: 'Resort', amenities: ['WiFi','Spa','Gym','Restaurant','Pool','Concierge'], badge: 'Wellness Pick', desc: 'Perched high on a ridge overlooking Kandy\'s lush hills, Santani is Sri Lanka\'s premier wellness retreat. Featuring extraordinary yoga and meditation programmes, Ayurvedic spa treatments, and farm-to-table cuisine prepared from an organic garden.', events:[{month:'Apr',day:7,name:'Full Moon Meditation',time:'5:00 AM – 7:00 AM',hot:true},{month:'Apr',day:14,name:'Yoga & Wellness Workshop',time:'8:00 AM – 12:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80' },
  { id: 7, name: 'Ella Jungle Resort', location: 'Ella', destination: 'Ella', stars: 4, rating: 8.7, ratingLabel: 'Very Good', priceUSD: 145, originalUSD: 175, discount: 17, type: 'Resort', amenities: ['WiFi','Pool','Restaurant','Parking','Gym'], badge: '17% OFF', desc: 'Nestled deep in the jungle hills of Ella, this eco-friendly resort offers treehouse-style villas with panoramic valley views. Wake up to birdsong, explore hiking trails to Little Adam\'s Peak, and unwind in a jungle infinity pool.', events:[{month:'Apr',day:9,name:'Nine Arch Bridge Trek',time:'6:00 AM – 10:00 AM',hot:true},{month:'Apr',day:16,name:'Stargazing Evening',time:'8:00 PM – 10:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80' },
  { id: 8, name: 'Shangri-La Hambantota', location: 'Hambantota', destination: 'Yala', stars: 5, rating: 9.1, ratingLabel: 'Exceptional', priceUSD: 310, originalUSD: 380, discount: 18, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking','Beachfront','Concierge','Airport TX','Pet Friendly'], badge: null, desc: 'A stunning 5-star beach resort spread across 37 acres of lush tropical gardens, facing a private 500m beach. The ideal base for Yala National Park safaris, with a stunning lagoon pool, multiple dining venues, and spacious rooms.', events:[{month:'Apr',day:11,name:'Yala Safari at Dawn',time:'5:00 AM – 10:00 AM',hot:true},{month:'Apr',day:19,name:'Lagoon Kayaking',time:'4:00 PM – 6:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80' },
  { id: 9, name: 'Uga Bay Passikudah', location: 'Passikudah', destination: 'Trincomalee', stars: 5, rating: 9.3, ratingLabel: 'Exceptional', priceUSD: 390, originalUSD: 450, discount: 13, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront','Concierge','Parking'], badge: null, desc: 'Situated on the glassy turquoise lagoon of Passikudah — home to some of Sri Lanka\'s finest coral reefs — Uga Bay offers overwater bungalows, crystal-clear snorkelling, and diving experiences that rival the Maldives at a fraction of the cost.', events:[{month:'Apr',day:13,name:'Coral Reef Snorkel Tour',time:'8:00 AM – 11:00 AM',hot:true},{month:'Apr',day:21,name:'Beach Bonfire & BBQ',time:'7:00 PM – 10:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1596436889106-be35e843f974?w=800&q=80' },
  { id: 10, name: 'Kahanda Kanda', location: 'Galle', destination: 'Galle', stars: 4, rating: 9.0, ratingLabel: 'Wonderful', priceUSD: 290, originalUSD: 290, discount: 0, type: 'Villa', amenities: ['WiFi','Pool','Restaurant','Concierge','Parking','Spa'], badge: null, desc: 'A breathtaking collection of eight exclusive villas set amidst a working tea estate and jungle, with infinity pools gazing over the green hillsides toward the distant Indian Ocean. Only a 25-minute drive from Galle Fort.', events:[{month:'Apr',day:3,name:'Tea Estate Morning Walk',time:'7:00 AM – 9:00 AM',hot:false},{month:'Apr',day:17,name:'Farm-to-Table Dinner',time:'7:30 PM – 10:00 PM',hot:true}], img:'https://images.unsplash.com/photo-1587874522487-fe10e9d29e45?w=800&q=80' },
  { id: 11, name: 'Jetwing Surf', location: 'Arugam Bay', destination: 'Arugam Bay', stars: 3, rating: 8.4, ratingLabel: 'Very Good', priceUSD: 95, originalUSD: 120, discount: 21, type: 'Boutique', amenities: ['WiFi','Pool','Restaurant','Parking','Gym'], badge: '21% OFF', desc: 'The premium address in Arugam Bay, Sri Lanka\'s surf Mecca. Perched directly over the famous main point break, Jetwing Surf offers comfortable rooms, a stylish pool, surfboard rentals, and front-row seats to world-class waves.', events:[{month:'Apr',day:2,name:'Surf Competition: Open Water',time:'7:00 AM – 4:00 PM',hot:true},{month:'Apr',day:10,name:'Sunset Yoga on the Beach',time:'5:00 PM – 6:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80' },
  { id: 12, name: 'Cinnamon Wild Yala', location: 'Yala National Park', destination: 'Yala', stars: 4, rating: 8.8, ratingLabel: 'Very Good', priceUSD: 220, originalUSD: 260, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Restaurant','Concierge','Parking','Pet Friendly'], badge: null, desc: 'An eco-conscious wilderness lodge right on the boundary of Yala National Park. Elevated chalets blend effortlessly with the surrounding dry-zone forest, allowing guests to spot leopards, elephants, and exotic birds right from their private decks.', events:[{month:'Apr',day:4,name:'Leopard Tracking Safari',time:'5:30 AM – 9:00 AM',hot:true},{month:'Apr',day:11,name:'Evening Nature Walk',time:'4:00 PM – 6:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1549294413-26f195200c16?w=800&q=80' },

  // ── KANDY ──────────────────────────────────────────
  { id: 13, name: 'Earl\'s Regency Kandy', location: 'Kundasale, Kandy', destination: 'Kandy', stars: 5, rating: 8.9, ratingLabel: 'Wonderful', priceUSD: 185, originalUSD: 220, discount: 16, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking','Concierge'], badge: '16% OFF', desc: 'Perched dramatically on a cliff above the Mahaweli River valley, Earl\'s Regency offers panoramic views of Kandy\'s forested hills, an infinity pool that seems to merge with the sky, and an exceptional dinner buffet showcasing authentic Kandyan cuisine.', events:[{month:'Apr',day:5,name:'Kandyan Cultural Night',time:'7:00 PM – 9:30 PM',hot:true},{month:'Apr',day:13,name:'Esala Perahera Preview',time:'6:30 PM – 8:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80' },
  { id: 14, name: 'Helga\'s Folly Kandy', location: 'Kandy City', destination: 'Kandy', stars: 4, rating: 9.1, ratingLabel: 'Exceptional', priceUSD: 145, originalUSD: 145, discount: 0, type: 'Boutique', amenities: ['WiFi','Restaurant','Concierge','Parking'], badge: 'Unique Stay', desc: 'One of the most eccentric and enchanting hotels in Asia — Helga\'s Folly is an artistic labyrinth of murals, antiques, chandeliers, and curiosities. Each room is a unique work of art. The house once hosted royalty, film stars, and legendary writers.', events:[{month:'Apr',day:8,name:'Art & Wine Evening',time:'6:00 PM – 9:00 PM',hot:true},{month:'Apr',day:16,name:'Guided Heritage Walk',time:'8:00 AM – 10:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80' },
  { id: 15, name: 'The Kandy House', location: 'Amunugama, Kandy', destination: 'Kandy', stars: 4, rating: 9.3, ratingLabel: 'Exceptional', priceUSD: 230, originalUSD: 270, discount: 15, type: 'Villa', amenities: ['WiFi','Pool','Restaurant','Spa','Concierge'], badge: null, desc: 'A stunning 200-year-old Kandyan chieftain\'s manor restored into an intimate nine-suite boutique property. Set in rice paddies and coconut groves, the Kandy House offers an unhurried, deeply atmospheric escape just minutes from the city.', events:[{month:'Apr',day:7,name:'Ayurveda Sunrise Ritual',time:'6:00 AM – 8:00 AM',hot:false},{month:'Apr',day:20,name:'Village Rice Paddy Walk',time:'7:00 AM – 9:00 AM',hot:true}], img:'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80' },

  // ── MIRISSA ────────────────────────────────────────
  { id: 16, name: 'Mirissa Hills Resort', location: 'Mirissa', destination: 'Mirissa', stars: 4, rating: 8.7, ratingLabel: 'Very Good', priceUSD: 165, originalUSD: 195, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Restaurant','Spa','Beachfront'], badge: null, desc: 'Perched on a lush hilltop overlooking Mirissa Bay, this boutique resort offers sweeping views of the turquoise Indian Ocean from private infinity pools. A five-minute walk leads to Mirissa\'s famous crescent beach and whale-watching harbour.', events:[{month:'Apr',day:3,name:'Whale Watching Dawn Cruise',time:'5:30 AM – 10:00 AM',hot:true},{month:'Apr',day:18,name:'Sunset Cocktail Hour',time:'5:30 PM – 7:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80' },
  { id: 17, name: 'Anantara Peace Haven Tangalle', location: 'Tangalle, Mirissa Coast', destination: 'Mirissa', stars: 5, rating: 9.4, ratingLabel: 'Exceptional', priceUSD: 420, originalUSD: 500, discount: 16, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Beachfront','Concierge','Airport TX'], badge: 'Luxury Pick', desc: 'Sprawling across 30 acres of clifftop gardens above a private beach, Anantara Peace Haven is one of Sri Lanka\'s finest luxury escapes. Guests enjoy overwater bungalows, three pools, a globally acclaimed spa, and unforgettable sunsets over the Indian Ocean.', events:[{month:'Apr',day:11,name:'Full Moon Beach Dinner',time:'8:00 PM – 11:00 PM',hot:true},{month:'Apr',day:22,name:'Holistic Sunrise Yoga',time:'6:00 AM – 7:30 AM',hot:false}], img:'https://images.unsplash.com/photo-1540541338537-71a7e3bef6cf?w=800&q=80' },
  { id: 18, name: 'Secret Garden Villa Mirissa', location: 'Mirissa Beach', destination: 'Mirissa', stars: 3, rating: 8.5, ratingLabel: 'Very Good', priceUSD: 95, originalUSD: 115, discount: 17, type: 'Villa', amenities: ['WiFi','Pool','Restaurant','Parking'], badge: '17% OFF', desc: 'A charming tropical villa just 100m from Mirissa beach. Surrounded by a lush garden with resident peacocks and coconut trees, this boutique property offers a relaxed, intimate atmosphere perfect for couples and solo travellers seeking the authentic Sri Lanka experience.', events:[{month:'Apr',day:6,name:'Coconut Cooking Class',time:'4:00 PM – 7:00 PM',hot:false},{month:'Apr',day:15,name:'Full Moon Party Night',time:'8:00 PM – 12:00 AM',hot:true}], img:'https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=800&q=80' },

  // ── ELLA ──────────────────────────────────────────
  { id: 19, name: '98 Acres Resort & Spa', location: 'Ella', destination: 'Ella', stars: 5, rating: 9.2, ratingLabel: 'Exceptional', priceUSD: 280, originalUSD: 330, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking','Concierge'], badge: null, desc: 'Set on 98 acres of working tea estate with breathtaking valley views, this award-winning resort is widely considered the finest hotel in Ella. Guests wake to misty mountains, sip estate tea on private decks, and unwind at the cliff-edge infinity pool.', events:[{month:'Apr',day:9,name:'Tea Plucking Experience',time:'7:00 AM – 9:00 AM',hot:true},{month:'Apr',day:17,name:'Nine Arch Bridge Trek',time:'6:00 AM – 9:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80' },
  { id: 20, name: 'Zion View Ella', location: 'Ella Village', destination: 'Ella', stars: 3, rating: 8.6, ratingLabel: 'Very Good', priceUSD: 75, originalUSD: 90, discount: 17, type: 'Boutique', amenities: ['WiFi','Restaurant','Parking'], badge: '17% OFF', desc: 'A charming rooftop guesthouse with some of Ella\'s most celebrated valley views. Perfect for budget-conscious travellers who want incredible scenery without compromise — the breakfast eggs are cooked fresh on the viewpoint terrace, with Ella Rock as the backdrop.', events:[{month:'Apr',day:10,name:'Sunrise Yoga & Breakfast',time:'5:30 AM – 8:00 AM',hot:true},{month:'Apr',day:19,name:'Stargazing Evening',time:'8:00 PM – 10:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80' },

  // ── NUWARA ELIYA ──────────────────────────────────
  { id: 21, name: 'Grand Hotel Nuwara Eliya', location: 'Nuwara Eliya', destination: 'Nuwara Eliya', stars: 5, rating: 8.8, ratingLabel: 'Wonderful', priceUSD: 155, originalUSD: 185, discount: 16, type: 'Hotel', amenities: ['WiFi','Spa','Gym','Restaurant','Parking','Concierge'], badge: null, desc: 'The Grand Hotel is a magnificent colonial institution dating to 1891. Set in immaculate English gardens with a backdrop of misty tea hills, it offers wood-panelled suites, a snooker room, croquet lawn, and the finest high tea in Sri Lanka.', events:[{month:'Apr',day:4,name:'Colonial High Tea',time:'3:30 PM – 5:30 PM',hot:false},{month:'Apr',day:12,name:'Candlelit Colonial Dinner',time:'7:30 PM – 10:00 PM',hot:true}], img:'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80' },
  { id: 22, name: 'Araliya Green Hills Hotel', location: 'Nuwara Eliya', destination: 'Nuwara Eliya', stars: 4, rating: 8.7, ratingLabel: 'Very Good', priceUSD: 120, originalUSD: 145, discount: 17, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Parking'], badge: '17% OFF', desc: 'A contemporary mountain hotel with spectacular views over Nuwara Eliya\'s rolling hills and immaculate golf course. Featuring a heated indoor pool, a full-service Ayurveda spa, and generously proportioned rooms decorated with local crafts and handloom textiles.', events:[{month:'Apr',day:6,name:'Tea Factory Day Tour',time:'9:00 AM – 12:00 PM',hot:true},{month:'Apr',day:14,name:'Strawberry Farm Visit',time:'10:00 AM – 12:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80' },
  { id: 23, name: 'Heritance Tea Factory', location: 'Kandapola, Nuwara Eliya', destination: 'Nuwara Eliya', stars: 5, rating: 9.3, ratingLabel: 'Exceptional', priceUSD: 240, originalUSD: 280, discount: 14, type: 'Hotel', amenities: ['WiFi','Spa','Restaurant','Gym','Parking','Concierge'], badge: null, desc: 'Spectacularly converted from a working Victorian-era tea factory, Heritance Tea Factory sits at 2,200m above sea level amid pristine tea estates. The original industrial machinery is preserved as art, the suites offer misty valley panoramas, and the food is extraordinary.', events:[{month:'Apr',day:8,name:'Tea Blending Masterclass',time:'10:00 AM – 12:00 PM',hot:true},{month:'Apr',day:16,name:'Waterfall Trek & Picnic',time:'9:00 AM – 2:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80' },

  // ── WELIGAMA ──────────────────────────────────────
  { id: 24, name: 'Cape Weligama Resort', location: 'Weligama', destination: 'Weligama', stars: 5, rating: 9.1, ratingLabel: 'Exceptional', priceUSD: 350, originalUSD: 420, discount: 17, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Beachfront','Concierge','Airport TX'], badge: null, desc: 'Dramatically positioned on a private headland above Weligama Bay, Cape Weligama is one of the Indian Ocean\'s most celebrated addresses. Guests enjoy their own plunge pool, a spectacular cliff-side infinity pool, and world-class surf just steps away.', events:[{month:'Apr',day:5,name:'Surf Lesson at Main Break',time:'7:00 AM – 9:00 AM',hot:true},{month:'Apr',day:13,name:'Stilt Fishermen Sunrise Tour',time:'5:30 AM – 7:30 AM',hot:false}], img:'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80' },
  { id: 25, name: 'Mango House Weligama', location: 'Weligama Beach', destination: 'Weligama', stars: 3, rating: 8.4, ratingLabel: 'Very Good', priceUSD: 85, originalUSD: 105, discount: 19, type: 'Boutique', amenities: ['WiFi','Pool','Restaurant','Parking'], badge: '19% OFF', desc: 'A laid-back surf hostel-turned-boutique just steps from the famous Weligama beginner\'s break. Vibrant tropical interiors, a rooftop bar serving fresh king coconuts, surfboard rentals, and expert instructors make this the happiest address in Sri Lanka.', events:[{month:'Apr',day:2,name:'Dawn Surf Session',time:'6:00 AM – 8:00 AM',hot:true},{month:'Apr',day:14,name:'Barbecue on the Roof',time:'7:00 PM – 10:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1509233725247-49e657c54213?w=800&q=80' },

  // ── SIGIRIYA ──────────────────────────────────────
  { id: 26, name: 'Water Garden Sigiriya', location: 'Sigiriya', destination: 'Sigiriya', stars: 5, rating: 9.3, ratingLabel: 'Exceptional', priceUSD: 310, originalUSD: 380, discount: 18, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Parking','Concierge'], badge: null, desc: 'A breathtaking water-themed resort directly facing the iconic Sigiriya Rock. Thirty private villas with plunge pools are linked by a network of canals, lily ponds, and ancient water gardens that echo the 5th-century hydraulic engineering of the rock fortress itself.', events:[{month:'Apr',day:7,name:'Sigiriya Rock Sunrise Climb',time:'5:00 AM – 8:00 AM',hot:true},{month:'Apr',day:15,name:'Village Cycling Tour',time:'8:00 AM – 11:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&q=80' },
  { id: 27, name: 'Aliya Resort & Spa', location: 'Sigiriya', destination: 'Sigiriya', stars: 4, rating: 8.9, ratingLabel: 'Wonderful', priceUSD: 195, originalUSD: 230, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Gym','Parking','Concierge'], badge: null, desc: 'Named after the Sinhala word for elephant, Aliya Resort commands stunning views of Sigiriya and the surrounding jungle. The elephant-themed infinity pool is legendary. Guests can observe wild elephants at the nearby elephant corridor during the evening hours.', events:[{month:'Apr',day:9,name:'Elephant Corridor Walk',time:'4:30 PM – 6:30 PM',hot:true},{month:'Apr',day:17,name:'Ancient Rock Art Tour',time:'9:00 AM – 12:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80' },

  // ── TRINCOMALEE ──────────────────────────────────
  { id: 28, name: 'Club Oceanic Nilaveli', location: 'Nilaveli, Trincomalee', destination: 'Trincomalee', stars: 4, rating: 8.6, ratingLabel: 'Very Good', priceUSD: 175, originalUSD: 210, discount: 17, type: 'Resort', amenities: ['WiFi','Pool','Restaurant','Beachfront','Parking','Concierge'], badge: null, desc: 'Situated on the pristine shores of Nilaveli, one of Sri Lanka\'s most unspoilt beaches, Club Oceanic offers direct access to Pigeon Island Marine Sanctuary — just a 10-minute boat ride away. Exceptional snorkelling, diving, and whale-watching year-round.', events:[{month:'Apr',day:3,name:'Pigeon Island Snorkel Trip',time:'8:00 AM – 12:00 PM',hot:true},{month:'Apr',day:11,name:'Whale Watching Excursion',time:'6:00 AM – 10:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80' },
  { id: 29, name: 'Jungle Beach by Uga Escapes', location: 'Kuchchaveli, Trincomalee', destination: 'Trincomalee', stars: 5, rating: 9.5, ratingLabel: 'Outstanding', priceUSD: 480, originalUSD: 560, discount: 14, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront','Concierge','Airport TX'], badge: 'Top Rated', desc: 'Hidden where jungle meets sea on Sri Lanka\'s wild east coast, Jungle Beach offers just 26 private bungalows on a white sand beach. Pristine coral reefs, bioluminescent bays, and absolute silence make this one of the Indian Ocean\'s most extraordinary escapes.', events:[{month:'Apr',day:5,name:'Bioluminescence Night Swim',time:'9:00 PM – 11:00 PM',hot:true},{month:'Apr',day:14,name:'Kayak to Hidden Coves',time:'7:00 AM – 10:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1562961203-3571ed73e6fa?w=800&q=80' },

  // ── ARUGAM BAY ────────────────────────────────────
  { id: 30, name: 'Stardust Beach Hotel', location: 'Arugam Bay', destination: 'Arugam Bay', stars: 3, rating: 8.5, ratingLabel: 'Very Good', priceUSD: 80, originalUSD: 95, discount: 16, type: 'Boutique', amenities: ['WiFi','Restaurant','Parking','Beachfront'], badge: null, desc: 'The original and most beloved address in Arugam Bay — a relaxed beach hotel directly fronting the world-famous point break. A loyal community of surfers returns season after season for the warm staff, incredible fresh seafood, and front-row seats to epic barrels.', events:[{month:'Apr',day:4,name:'Surf Film Screening Night',time:'7:30 PM – 10:00 PM',hot:false},{month:'Apr',day:12,name:'Lagoon Kayaking & Birdwatch',time:'6:00 AM – 9:00 AM',hot:true}], img:'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800&q=80' },
  { id: 31, name: 'Uga Bay Arugam', location: 'Arugam Bay', destination: 'Arugam Bay', stars: 4, rating: 8.9, ratingLabel: 'Wonderful', priceUSD: 195, originalUSD: 230, discount: 15, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront','Concierge'], badge: null, desc: 'A boutique luxury resort bringing Uga\'s signature understated elegance to the wild surf village of Arugam Bay. Tented suites float above the lagoon, the surf is literally at your feet, and the restaurant sources the freshest tuna from local fishermen at dawn.', events:[{month:'Apr',day:6,name:'Dawn Surf & Smoothie',time:'6:00 AM – 9:00 AM',hot:true},{month:'Apr',day:16,name:'Crocodile Lagoon Tour',time:'5:00 PM – 7:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800&q=80' },

  // ── JAFFNA ────────────────────────────────────────
  { id: 32, name: 'Jetwing Jaffna', location: 'Jaffna City', destination: 'Jaffna', stars: 4, rating: 8.8, ratingLabel: 'Wonderful', priceUSD: 140, originalUSD: 160, discount: 12, type: 'Hotel', amenities: ['WiFi','Pool','Restaurant','Gym','Parking','Concierge'], badge: null, desc: 'The finest contemporary hotel in the Northern capital, Jetwing Jaffna brings modern luxury to this ancient cultural city. Rooftop pool with views over the lagoon, a superb restaurant showcasing the unique spice-forward cuisine of the north, and attentive service.', events:[{month:'Apr',day:8,name:'Northern Cuisine Cooking Class',time:'3:00 PM – 6:00 PM',hot:true},{month:'Apr',day:15,name:'Nainativu Island Pilgrimage',time:'6:00 AM – 2:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80' },
  { id: 33, name: 'Thinnai Heritage Jaffna', location: 'Jaffna Fort Area', destination: 'Jaffna', stars: 3, rating: 8.6, ratingLabel: 'Very Good', priceUSD: 95, originalUSD: 115, discount: 17, type: 'Boutique', amenities: ['WiFi','Restaurant','Parking','Concierge'], badge: null, desc: 'A lovingly restored colonial merchant\'s house in the heart of old Jaffna, Thinnai Heritage is the city\'s most atmospheric boutique hotel. Just eight rooms, each individually decorated with Tamil heritage arts. The family-style breakfasts with string hoppers and coconut sambol are legendary.', events:[{month:'Apr',day:10,name:'Tamil Heritage Walking Tour',time:'8:00 AM – 11:00 AM',hot:true},{month:'Apr',day:18,name:'Palmyra Toddy Tasting',time:'4:00 PM – 6:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80' },

  // ── HIKKADUWA ─────────────────────────────────────
  { id: 34, name: 'Hikka Tranz by Cinnamon', location: 'Hikkaduwa Beach', destination: 'Hikkaduwa', stars: 4, rating: 8.6, ratingLabel: 'Very Good', priceUSD: 185, originalUSD: 210, discount: 12, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront','Gym','Parking'], badge: null, desc: 'A stylish beachfront hotel right on Hikkaduwa\'s famous coral reef beach. The resort-style pool faces the Indian Ocean, the dive centre arranges reef excursions daily, and the beach bar is the social heart of Hikkaduwa\'s lively strip every evening.', events:[{month:'Apr',day:4,name:'Coral Reef Snorkel Tour',time:'8:00 AM – 11:00 AM',hot:true},{month:'Apr',day:12,name:'Sea Turtle Conservation Talk',time:'5:00 PM – 6:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80' },
  { id: 35, name: 'The Sun House Hikkaduwa', location: 'Hikkaduwa', destination: 'Hikkaduwa', stars: 4, rating: 8.9, ratingLabel: 'Wonderful', priceUSD: 140, originalUSD: 165, discount: 15, type: 'Boutique', amenities: ['WiFi','Pool','Restaurant','Spa','Concierge'], badge: null, desc: 'A gem of a boutique hotel hidden in a lush garden 200m from Hikkaduwa beach. The colonial bungalow has been lovingly restored with contemporary Sri Lankan art, an award-winning restaurant celebrating local produce, and a gorgeous garden pool.', events:[{month:'Apr',day:7,name:'Full Moon Beach Walk',time:'7:00 PM – 9:00 PM',hot:false},{month:'Apr',day:19,name:'Seafood BBQ & Baila Night',time:'7:30 PM – 11:00 PM',hot:true}], img:'https://images.unsplash.com/photo-1544550581-1bcabf842b77?w=800&q=80' },

  // ── BENTOTA ───────────────────────────────────────
  { id: 36, name: 'Taj Bentota Resort & Spa', location: 'Bentota', destination: 'Bentota', stars: 5, rating: 9.2, ratingLabel: 'Exceptional', priceUSD: 295, originalUSD: 350, discount: 16, type: 'Resort', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Beachfront','Concierge','Airport TX','Parking'], badge: null, desc: 'Designed by the legendary Geoffrey Bawa, Taj Bentota is a masterpiece of tropical modernism. Set between the Indian Ocean and the serene Bentota River, it offers water sports on the lagoon, a world-class Jiva Spa, and private beach access on a 300m golden sand strip.', events:[{month:'Apr',day:6,name:'Bentota River Boat Safari',time:'8:00 AM – 10:00 AM',hot:true},{month:'Apr',day:14,name:'Geoffrey Bawa Architecture Tour',time:'3:00 PM – 5:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80' },
  { id: 37, name: 'Avani Bentota Resort', location: 'Bentota Beach', destination: 'Bentota', stars: 4, rating: 8.7, ratingLabel: 'Very Good', priceUSD: 175, originalUSD: 210, discount: 17, type: 'Resort', amenities: ['WiFi','Pool','Spa','Restaurant','Beachfront','Gym','Parking'], badge: '17% OFF', desc: 'A contemporary beachfront resort on Bentota\'s wide sandy beach. Offering superb water sports — jet skiing, banana boating, windsurfing, and river speedboat tours — the Avani is Bentota\'s most active and energetic address, beloved by families and adventure couples.', events:[{month:'Apr',day:3,name:'Water Sports Day Package',time:'9:00 AM – 4:00 PM',hot:true},{month:'Apr',day:17,name:'Traditional Mask Making Class',time:'2:00 PM – 4:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800&q=80' },

  // ── POLONNARUWA ──────────────────────────────────
  { id: 38, name: 'Deer Park Hotel', location: 'Polonnaruwa', destination: 'Polonnaruwa', stars: 4, rating: 8.5, ratingLabel: 'Very Good', priceUSD: 125, originalUSD: 150, discount: 17, type: 'Hotel', amenities: ['WiFi','Pool','Restaurant','Gym','Parking','Concierge'], badge: null, desc: 'The premier hotel in the ancient capital of Polonnaruwa, positioned perfectly for dawn visits to the UNESCO World Heritage site before the crowds arrive. The enormous pool, excellent Sri Lankan buffet, and knowledgeable guides make it the ideal base for cultural exploration.', events:[{month:'Apr',day:5,name:'Dawn Heritage Cycle Tour',time:'5:30 AM – 8:30 AM',hot:true},{month:'Apr',day:13,name:'Ancient City Moonlight Walk',time:'7:30 PM – 9:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1564769625393-1ea4e5898309?w=800&q=80' },

  // ── UNAWATUNA ─────────────────────────────────────
  { id: 39, name: 'Cantaloupe Levels Unawatuna', location: 'Unawatuna', destination: 'Unawatuna', stars: 4, rating: 9.0, ratingLabel: 'Wonderful', priceUSD: 190, originalUSD: 225, discount: 16, type: 'Boutique', amenities: ['WiFi','Pool','Restaurant','Beachfront','Concierge','Spa'], badge: null, desc: 'A beautifully curated boutique hotel steps from Unawatuna\'s famous crescent beach. Coral-coloured walls, an infinity pool framed by coconut palms, a rooftop restaurant with panoramic sea views, and direct access to some of Sri Lanka\'s best snorkelling reefs.', events:[{month:'Apr',day:8,name:'Sunset Catamaran Cruise',time:'4:30 PM – 7:00 PM',hot:true},{month:'Apr',day:17,name:'Reef Snorkel & Turtle Watch',time:'7:00 AM – 10:00 AM',hot:false}], img:'https://images.unsplash.com/photo-1562961203-3571ed73e6fa?w=800&q=80' },
  { id: 40, name: 'Nooit Gedagt Hotel Unawatuna', location: 'Unawatuna Beach', destination: 'Unawatuna', stars: 3, rating: 8.4, ratingLabel: 'Very Good', priceUSD: 90, originalUSD: 110, discount: 18, type: 'Hotel', amenities: ['WiFi','Pool','Restaurant','Beachfront','Parking'], badge: '18% OFF', desc: 'Set right on the golden sands of Unawatuna bay, this relaxed colonial-style hotel offers direct beach access, a beachside pool, and rooms with views of the famous half-moon bay. The name, meaning \'never thought of it\' in Dutch, reflects its unexpected charm.', events:[{month:'Apr',day:4,name:'Turtle Nesting Beach Walk',time:'6:30 PM – 8:30 PM',hot:true},{month:'Apr',day:12,name:'Coconut Toddy Morning',time:'8:00 AM – 9:30 AM',hot:false}], img:'https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&q=80' },

  // ── COLOMBO additional ────────────────────────────
  { id: 41, name: 'Shangri-La Colombo', location: 'Colombo 01', destination: 'Colombo', stars: 5, rating: 9.4, ratingLabel: 'Exceptional', priceUSD: 320, originalUSD: 390, discount: 18, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Gym','Restaurant','Concierge','Airport TX','Parking'], badge: null, desc: 'Soaring 41 stories above the Colombo skyline and Indian Ocean, Shangri-La Colombo is the city\'s most prestigious address. Five world-class restaurants, a rooftop bar with panoramic views, and the spectacular Chi Spa make it the ultimate urban luxury base in Sri Lanka.', events:[{month:'Apr',day:5,name:'New Year Gala Dinner',time:'7:00 PM – 12:00 AM',hot:true},{month:'Apr',day:16,name:'Colombo Food Tour',time:'9:00 AM – 1:00 PM',hot:false}], img:'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80' },
  { id: 42, name: 'Galle Face Hotel Colombo', location: 'Galle Face, Colombo', destination: 'Colombo', stars: 5, rating: 8.8, ratingLabel: 'Wonderful', priceUSD: 195, originalUSD: 235, discount: 17, type: 'Hotel', amenities: ['WiFi','Pool','Spa','Restaurant','Gym','Concierge','Parking'], badge: null, desc: 'The oldest hotel east of Suez, the Galle Face Hotel has hosted royalty, US presidents, and literary giants since 1864. A magnificent colonial institution facing the ocean, recently restored to its former grandeur with modern comforts seamlessly woven through historic elegance.', events:[{month:'Apr',day:7,name:'Colonial High Tea at Verandah',time:'3:00 PM – 5:30 PM',hot:true},{month:'Apr',day:18,name:'Sunset Cocktail Hour',time:'5:30 PM – 7:30 PM',hot:false}], img:'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80' },
  { id: 43, name: 'Cinnamon Red Colombo', location: 'Colombo 02', destination: 'Colombo', stars: 4, rating: 8.5, ratingLabel: 'Very Good', priceUSD: 145, originalUSD: 170, discount: 15, type: 'Hotel', amenities: ['WiFi','Pool','Gym','Restaurant','Parking'], badge: '15% OFF', desc: 'A contemporary city hotel in the heart of Colombo\'s business district, perfect for corporate travellers and those exploring the city\'s dynamic food scene. The rooftop Zest restaurant offers 360° city views, craft cocktails, and an eclectic Asian-fusion menu.', events:[{month:'Apr',day:9,name:'Colombo Street Food Walk',time:'6:00 PM – 9:00 PM',hot:false},{month:'Apr',day:20,name:'Rooftop Mixology Class',time:'6:30 PM – 8:30 PM',hot:true}], img:'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&q=80' },
];

const reviewsData = [
  { name: 'Charlotte W.', origin: 'London, UK', rating: 5, text: 'Absolutely seamless booking experience. Found Amanwella through this platform and it was the most incredible stay of my life. The website made comparing properties so easy!', hotel: 'Amanwella Tangalle', avatar: '#0B6E4F', type: 'Loyal Member', initials: 'CW' },
  { name: 'Rajiv Mehta', origin: 'Mumbai, India', rating: 5, text: 'Used TravelBooker for a business trip to Colombo. The corporate booking features are excellent — got special rates and the team was responsive on WhatsApp. Will use every Sri Lanka trip!', hotel: 'Cinnamon Grand Colombo', avatar: '#C9A84C', type: 'Corporate', initials: 'RM' },
  { name: 'Emma & James T.', origin: 'Sydney, Australia', rating: 5, text: 'Honeymoon of our dreams, thanks to TravelBooker\'s honeymoon package recommendation! The surprise upgrade at Kahanda Kanda was extraordinary. Already planning our next trip!', hotel: 'Kahanda Kanda', avatar: '#E05A40', type: 'Honeymooners', initials: 'EJ' },
  { name: 'Stefan Müller', origin: 'Berlin, Germany', rating: 4, text: 'Very comprehensive website with great filtering options. Found exactly the eco-resort I was looking for in Ella. The AI chatbot was surprisingly helpful for planning!', hotel: 'Ella Jungle Resort', avatar: '#4F46E5', type: 'Solo Traveller', initials: 'SM' },
  { name: 'Fathima Ismail', origin: 'Colombo, Sri Lanka', rating: 5, text: 'Even as a local I use TravelBooker for staycations. Great local deals, the LKR currency option is so convenient, and the loyalty points add up quickly!', hotel: 'Santani Wellness Resort', avatar: '#0891B2', type: 'Local Guest', initials: 'FI' },
  { name: 'David & Family', origin: 'Singapore', rating: 5, text: 'Planned a 2-week family trip entirely through this platform. Kids loved Yala, adults loved Galle. The family package discounts were amazing and support was excellent!', hotel: 'Shangri-La Hambantota', avatar: '#16A34A', type: 'Family', initials: 'DF' },
];

const faqData = [
  { q: 'How do I make a booking on TravelBooker?', a: 'Simply search for your destination and dates on the homepage, browse available properties, select your hotel, choose your dates and room type, and proceed to our secure checkout. You\'ll need to create an account or log in to complete your booking.' },
  { q: 'Can I pay in both USD and Sri Lankan Rupees (LKR)?', a: 'Absolutely! TravelBooker supports both USD and LKR. Use the currency toggle in the top navigation bar to switch between currencies at any time. Payments are accepted in both currencies.' },
  { q: 'What is the Loyalty Programme and how do I earn points?', a: 'Our Loyalty Programme rewards repeat guests. You earn points for every booking, and can redeem them for discounts on future stays. Simply enter your Loyalty Member Number during booking to apply your discount automatically.' },
  { q: 'How can travel agents log in and make bookings?', a: 'Travel agents have a dedicated login tab on the login page. Use your registered Travel Agent Number and password to access the agent portal, where you\'ll find B2B pricing and commission structures.' },
  { q: 'What is the cancellation policy?', a: 'Most of our properties offer free cancellation up to 48 hours before your check-in date. Some peak-season bookings may have different policies — always check the specific property\'s terms before confirming.' },
  { q: 'Is my payment information secure?', a: 'Yes, absolutely. All transactions are protected with 256-bit SSL encryption. We use industry-leading payment processors and never store your full card details on our servers.' },
  { q: 'How does the two-factor authentication work?', a: 'When you log in, we send a 6-digit verification code to your registered email address. Enter this code to complete the login. This extra layer of security protects your account from unauthorised access.' },
];

const chatResponses = {
  'beach': 'Great choice! Sri Lanka has stunning beaches 🏖. For surf, Weligama and Arugam Bay are legendary. For calm turquoise waters, Passikudah and Mirissa are perfect. Shall I show you hotels in any of these?',
  'luxury': 'For the ultimate luxury, I\'d recommend Amanwella in Tangalle (from $850/night), Heritance Kandalama by Geoffrey Bawa (from $320/night), or Cinnamon Grand Colombo (from $280/night). Shall I take you to any of these?',
  'book': 'I\'d love to help you book! You can browse all our properties on the Destinations page. Need help filtering by location, budget, or amenities? Just tell me more about what you\'re looking for!',
  'places': 'Sri Lanka is incredible! Top spots include: 🏰 Sigiriya Rock (UNESCO), 🏛 Kandy Temple of the Tooth, 🌿 Nuwara Eliya tea estates, 🐆 Yala leopard safaris, 🌊 Galle Fort (UNESCO), and 🏄 Arugam Bay surfing. Which interests you most?',
  'default': ['Great question! Let me help you with that. You can browse our full range of properties in the Destinations section, or I can suggest specific hotels based on your preferences. What\'s your travel style?', 'I\'d be happy to assist! For personalised recommendations, try telling me your budget, travel dates, and what experience you\'re after — beach relaxation, cultural immersion, wildlife safari, or wellness retreat?', 'Wonderful! Sri Lanka has something for every traveller. From the ancient ruins of Polonnaruwa to the surf breaks of Arugam Bay — we have hotels near all of them. Where are you thinking of going?']
};

// ======================== INIT ========================
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  renderDestTiles();
  renderHotelCards(hotels);
  renderPkgCards();
  renderReviews();
  renderFAQ();
  setupStarRating();
  setupPasswordStrength();
  setTodayDate();
  navbar.addEventListener('scroll', updateNavbar);
  window.addEventListener('scroll', updateNavbar);
});

function setTodayDate() {
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  ['heroCheckin','bookCheckin'].forEach(id => { const el = document.getElementById(id); if(el){el.min=today; el.value=today;} });
  ['heroCheckout','bookCheckout'].forEach(id => { const el = document.getElementById(id); if(el){el.min=tomorrow; el.value=tomorrow;} });
}

// ======================== PARTICLES ========================
function createParticles() {
  const container = document.getElementById('heroParticles');
  if(!container) return;
  for(let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100+'%';
    p.style.animationDelay = Math.random()*8+'s';
    p.style.animationDuration = (6+Math.random()*6)+'s';
    p.style.width = p.style.height = (1+Math.random()*3)+'px';
    container.appendChild(p);
  }
}

// ======================== NAVBAR ========================
function updateNavbar() {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
}

// ======================== PAGE ROUTING ========================
function showPage(pageId) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.getElementById('page-'+pageId);
  if(page) { page.classList.add('active'); window.scrollTo(0,0); }
  // Update nav active
  document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
  const navEl = document.getElementById('nav-'+pageId);
  if(navEl) navEl.classList.add('active');
}

// ======================== CURRENCY ========================
function setCurrency(curr) {
  currentCurrency = curr;
  document.getElementById('btn-usd').classList.toggle('active', curr==='USD');
  document.getElementById('btn-lkr').classList.toggle('active', curr==='LKR');
  renderHotelCards(hotels);
  renderPkgCards();
  updatePriceDisplay();
  // sync filter price labels
  const _pmn = document.getElementById('priceMin');
  const _pmx = document.getElementById('priceMax');
  const _psl = document.getElementById('priceRange');
  if(_pmn) _pmn.textContent = curr==='USD' ? '$0' : '₨0';
  if(_pmx) _pmx.textContent = curr==='USD' ? '$1,000+' : '₨320,000+';
  if(_psl) updatePrice(_psl.value);
  showToast(curr === 'USD' ? '💵 Prices shown in USD' : '₨ Prices shown in LKR');
}

function formatPrice(usd) {
  if(currentCurrency === 'USD') return '$'+usd.toLocaleString();
  return '₨'+(usd*EXCHANGE_RATE).toLocaleString();
}

function updatePriceDisplay() {
  if(currentHotel) {
    document.getElementById('detailPriceHero').textContent = formatPrice(currentHotel.priceUSD);
    updateBookingSummary();
  }
}

// ======================== DESTINATION TILES ========================
function renderDestTiles() {
  const grid = document.getElementById('destTilesGrid');
  if(!grid) return;
  // Destination photos — Unsplash Source API with precise Sri Lanka keywords
  // Each keyword set is tuned to return the iconic landmark/scene for that place
  const _destPhotos = {
    'Colombo':      'https://images.unsplash.com/photo-1623595289196-007a22dd8560?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Kandy':        'https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Nuwara Eliya': 'https://images.unsplash.com/photo-1619974643633-12acfdcedd16?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Galle':        'https://images.unsplash.com/photo-1509982724584-2ce0d4366d8b?q=80&w=1230&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Mirissa':      'https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Weligama':     'https://www.chamilatours.com/wp-content/uploads/2022/11/stilt-fishermen-koggala.jpg',
    'Ella':         'https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?q=80&w=1228&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Sigiriya':     'https://images.unsplash.com/photo-1612862862126-865765df2ded?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Jaffna':       'https://images.unsplash.com/photo-1725680968685-19bd1905ec7f?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Trincomalee':  'https://plus.unsplash.com/premium_photo-1661894232140-73d96a67731b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Arugam Bay':   'https://images.unsplash.com/photo-1724031948257-8b3c68232ccc?q=80&w=670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Yala':         'https://images.unsplash.com/photo-1603789764099-52b21a871336?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Hikkaduwa':    'https://images.unsplash.com/photo-1591025207163-942350e47db2?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Polonnaruwa':  'https://images.unsplash.com/photo-1643793427422-d28ccb5f1f69?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Bentota':      'https://images.unsplash.com/photo-1709926474736-d11e0b3fbd3e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'Unawatuna':    'https://images.unsplash.com/photo-1700315303907-5b222bb8bb47?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  };
  const imgs = destinations.map(d => _destPhotos[d.name] || 'https://source.unsplash.com/800x500/?sri+lanka+beach');
  grid.innerHTML = destinations.map((d,i) => `
    <div class="dest-tile" onclick="openDestination('${d.name}')" style="cursor:pointer">
      <img class="dest-tile-img" src="${imgs[i]}" alt="${d.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600'">
      <div class="dest-tile-grad"></div>
      <div class="dest-tile-info">
        <div class="dest-tile-name">${d.name}</div>
        <div class="dest-tile-meta">
          <span>${d.emoji} ${d.region}</span>
          <span class="dest-tile-tag">${d.type}</span>
        </div>
      </div>
      <div class="dest-tile-hover">
        <div class="dest-tile-hover-title">${d.name}</div>
        <div class="dest-tile-hover-desc">${d.desc}</div>
        <div class="dest-tile-hover-facts">
          <div class="dest-fact"><span class="dest-fact-val">${d.hotels}+</span><span class="dest-fact-label">Hotels</span></div>
          <div class="dest-fact"><span class="dest-fact-val">${d.temp}</span><span class="dest-fact-label">Avg Temp</span></div>
          <div class="dest-fact"><span class="dest-fact-val">✈</span><span class="dest-fact-label">${d.bestFor}</span></div>
        </div>
        <button class="btn-explore" onclick="event.stopPropagation()"><i class="fas fa-hotel"></i> View Hotels</button>
      </div>
    </div>
  `).join('');
}

function openDestination(name) {
  const subtitle = document.getElementById('destPageSubtitle');
  if(subtitle) subtitle.textContent = name === '' ? 'Showing all available properties across Sri Lanka' : `Showing properties in ${name}`;
  // Filter hotels by destination
  const filtered = name ? hotels.filter(h => h.destination === name) : hotels;
  renderHotelCards(filtered.length > 0 ? filtered : hotels);
  // Highlight the hotelCount label
  const countEl = document.getElementById('hotelCount');
  if(countEl) countEl.textContent = filtered.length;
  showPage('destinations');
  // Store active destination for re-sorting
  window._activeDestination = name;
}

// ======================== HOTEL CARDS ========================
function renderHotelCards(list) {
  const container = document.getElementById('hotelCards');
  if(!container) return;
  document.getElementById('hotelCount').textContent = list.length;
  container.innerHTML = list.map(h => `
    <div class="hotel-card" onclick="openHotelDetail(${h.id})">
      <div class="hotel-card-img" style="position:relative">
        <img src="${h.img}" alt="${h.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'">
        ${h.badge ? `<div class="hotel-card-badge">${h.badge}</div>` : ''}
        <button onclick="event.stopPropagation();toggleWishlist(${h.id},this)" title="Save to Wishlist" data-hid="${h.id}" style="position:absolute;top:10px;right:10px;background:rgba(255,255,255,0.92);border:none;border-radius:50%;width:34px;height:34px;cursor:pointer;font-size:16px;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 8px rgba(0,0,0,0.18);transition:transform 0.15s" onmouseover="this.style.transform='scale(1.15)'" onmouseout="this.style.transform='scale(1)'">${wishlistIds.includes(h.id)?'❤️':'🤍'}</button>
        <label onclick="event.stopPropagation()" style="position:absolute;bottom:10px;left:10px;background:rgba(255,255,255,0.92);border-radius:20px;padding:4px 11px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:5px;color:var(--text-dark);box-shadow:0 2px 6px rgba(0,0,0,0.12)">
          <input type="checkbox" style="accent-color:var(--deep-teal)" onchange="toggleCompareHotel(${h.id},this)"> Compare
        </label>
      </div>
      <div class="hotel-card-body">
        <div class="hotel-card-top">
          <div>
            <div class="hotel-card-stars">${'★'.repeat(h.stars)}${'☆'.repeat(5-h.stars)}</div>
            <div class="hotel-card-name">${h.name}</div>
          </div>
          <div class="hotel-card-rating">
            <div class="rating-score">${h.rating}</div>
            <div class="rating-label">${h.ratingLabel}</div>
          </div>
        </div>
        <div class="hotel-card-location"><i class="fas fa-map-marker-alt"></i>${h.location}, Sri Lanka · ${h.type}</div>
        <div class="hotel-card-amenities">
          ${h.amenities.slice(0,5).map(a=>`<span class="amenity-tag"><i class="fas fa-check"></i>${a}</span>`).join('')}
          ${h.amenities.length>5?`<span class="amenity-tag">+${h.amenities.length-5} more</span>`:''}
        </div>
        ${h.events.length > 0 ? `<div class="hotel-card-events"><div class="hotel-card-events-label">🎉 Upcoming Events</div><div class="hotel-card-events-text">${h.events[0].name} · ${h.events[0].month} ${h.events[0].day}</div></div>` : ''}
        <div class="hotel-card-footer">
          <div class="hotel-card-price">
            <div class="label">from</div>
            <div>
              ${h.discount>0?`<span class="original">${formatPrice(h.originalUSD)}</span>`:''}
              <span class="amount">${formatPrice(h.priceUSD)}</span>
              <span class="per"> / night</span>
            </div>
          </div>
          <div style="display:flex;gap:8px;align-items:center">
            <a href="https://www.google.com/maps/search/${encodeURIComponent(h.name+' '+h.location+' Sri Lanka')}" target="_blank" onclick="event.stopPropagation()" title="Open in Google Maps" style="padding:8px 12px;border:1.5px solid var(--border);border-radius:var(--radius);font-size:12px;color:var(--text-mid);text-decoration:none;white-space:nowrap;transition:border-color 0.2s;display:flex;align-items:center;gap:5px" onmouseover="this.style.borderColor='#E05A40'" onmouseout="this.style.borderColor='var(--border)'"><i class="fas fa-map-marker-alt" style="color:#E05A40"></i> Map</a>
            <button class="btn-view-details" onclick="event.stopPropagation();openHotelDetail(${h.id})">View Details <i class="fas fa-arrow-right"></i></button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function sortHotels() {
  const val = document.getElementById('sortSelect').value;
  const base = window._activeDestination ? hotels.filter(h => h.destination === window._activeDestination) : hotels;
  let sorted = [...base];
  if(val.includes('Low')) sorted.sort((a,b)=>a.priceUSD-b.priceUSD);
  else if(val.includes('High')) sorted.sort((a,b)=>b.priceUSD-a.priceUSD);
  else if(val.includes('Star')) sorted.sort((a,b)=>b.stars-a.stars);
  else if(val.includes('Guest')) sorted.sort((a,b)=>b.rating-a.rating);
  renderHotelCards(sorted);
}

function clearFilters() { showToast('✓ Filters cleared'); }
function updatePrice(val) {
  const display = document.getElementById('priceDisplay');
  if(display) display.textContent = currentCurrency==='USD'?`$${val}`:`₨${(val*EXCHANGE_RATE).toLocaleString()}`;
}

// ======================== HOTEL DETAIL ========================
function openHotelDetail(id) {
  currentHotel = hotels.find(h=>h.id===id);
  if(!currentHotel) return;
  const h = currentHotel;
  // Fill hero
  document.getElementById('detailHeroImg').src = h.img;
  document.getElementById('detailHotelName').textContent = h.name;
  document.getElementById('detailHotelLocation').textContent = h.location + ', Sri Lanka';
  document.getElementById('detailStars').textContent = '★'.repeat(h.stars)+'☆'.repeat(5-h.stars);
  document.getElementById('detailPriceHero').textContent = formatPrice(h.priceUSD);
  document.getElementById('detailRatingScore').textContent = h.rating;
  document.getElementById('detailDesc').textContent = h.desc;
  // Amenities
  const amenIcons = {'WiFi':'wifi','Pool':'swimming-pool','Spa':'spa','Gym':'dumbbell','Restaurant':'utensils','Parking':'parking','Beachfront':'umbrella-beach','Concierge':'concierge-bell','Airport TX':'shuttle-van','Pet Friendly':'paw'};
  document.getElementById('detailAmenities').innerHTML = h.amenities.map(a=>`
    <div class="detail-amenity"><i class="fas fa-${amenIcons[a]||'check'}"></i><span>${a}</span></div>
  `).join('');
  // Room gallery
  const roomImgs = [
    'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&q=70',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=70',
    'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&q=70',
    'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=70',
    'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=400&q=70',
    'https://images.unsplash.com/photo-1566665797739-1674de7a421a?w=400&q=70',
  ];
  document.getElementById('detailRoomGallery').innerHTML = roomImgs.slice(0,6).map(img=>`<div class="room-img-wrap"><img src="${img}" alt="Room" loading="lazy"></div>`).join('');
  // Events
  document.getElementById('detailEvents').innerHTML = h.events.map(e=>`
    <div class="event-item">
      <div class="event-date"><div class="event-date-day">${e.day}</div><div class="event-date-month">${e.month}</div></div>
      <div class="event-info"><div class="event-name">${e.name}</div><div class="event-time"><i class="fas fa-clock" style="margin-right:5px"></i>${e.time}</div></div>
      ${e.hot?'<span class="event-hot">🔥 Popular</span>':''}
    </div>
  `).join('');
  // Reviews
  document.getElementById('detailReviews').innerHTML = reviewsData.slice(0,3).map(r=>`
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <div class="review-text">"${r.text}"</div>
      <div class="review-author">
        <div class="review-avatar" style="background:${r.avatar}">${r.initials}</div>
        <div><div class="review-name">${r.name}</div><div class="review-origin">${r.origin}</div></div>
      </div>
    </div>
  `).join('');
  // Booking summary
  updateBookingSummary();
  // Discounts
  renderDiscounts();
  // Show login message if not logged in
  document.getElementById('bookingNotLoggedMsg').style.display = currentUser ? 'none' : 'block';
  showPage('hotel-detail');
  updateDetailMapsLink();
  checkCorporateFields();
}

function renderDiscounts() {
  if(!currentHotel) return;
  const list = [];
  if(currentHotel.discount>0) list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(224,90,64,0.06);border-radius:8px;color:var(--text-dark)"><span>🏷 Current Sale</span><strong style="color:var(--coral)">-${currentHotel.discount}%</strong></div>`);
  if(currentUser) {
    const utype = currentUser.userType;
    if(utype==='honeymoon') list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(99,102,241,0.06);border-radius:8px;color:var(--text-dark)"><span>💑 Honeymoon Package</span><strong style="color:#4F46E5">-10%</strong></div>`);
    if(utype==='family') list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(34,197,94,0.06);border-radius:8px;color:var(--text-dark)"><span>👨‍👩‍👧 Family Rate</span><strong style="color:#16A34A">-8%</strong></div>`);
    if(utype==='business'||utype==='corporate') list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(11,110,79,0.06);border-radius:8px;color:var(--text-dark)"><span>💼 Corporate Rate</span><strong style="color:var(--deep-teal)">-12%</strong></div>`);
    if(utype==='student') list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(201,168,76,0.06);border-radius:8px;color:var(--text-dark)"><span>🎓 Student Discount</span><strong style="color:var(--gold)">-5%</strong></div>`);
  }
  list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(201,168,76,0.06);border-radius:8px;color:var(--text-dark)"><span>💳 Card Payment</span><strong style="color:var(--gold)">-5%</strong></div>`);
  list.push(`<div style="display:flex;justify-content:space-between;font-size:13px;padding:8px 12px;background:rgba(201,168,76,0.06);border-radius:8px;color:var(--text-dark)"><span>👑 Loyalty Member</span><strong style="color:var(--gold)">up to -15%</strong></div>`);
  document.getElementById('discountList').innerHTML = list.join('');
}

function updateBookingSummary() {
  if(!currentHotel) return;
  const ci = new Date(document.getElementById('bookCheckin')?.value || Date.now());
  const co = new Date(document.getElementById('bookCheckout')?.value || Date.now()+86400000*3);
  const nights = Math.max(1, Math.round((co-ci)/86400000));
  const rooms = parseInt(document.getElementById('bookRooms')?.value||1);
  const subtotalUSD = currentHotel.priceUSD * nights * rooms;
  const taxUSD = subtotalUSD * 0.1;
  const loyalty = document.getElementById('loyaltyNumber')?.value.trim();
  const discountPct = loyalty.length > 5 ? 0.15 : 0;
  const discountUSD = subtotalUSD * discountPct;
  const totalUSD = subtotalUSD + taxUSD - discountUSD;
  document.getElementById('summarySubtotal').textContent = formatPrice(subtotalUSD);
  document.getElementById('summaryTax').textContent = formatPrice(taxUSD);
  document.getElementById('summaryTotal').textContent = formatPrice(totalUSD);
  if(discountPct>0) {
    document.getElementById('loyaltyDiscountRow').style.display = 'flex';
    document.getElementById('summaryDiscount').textContent = '-'+formatPrice(discountUSD);
  } else {
    document.getElementById('loyaltyDiscountRow').style.display = 'none';
  }
  // Store for payment page
  window._bookingData = {nights, rooms, subtotalUSD, taxUSD, discountUSD, totalUSD};
}

function applyLoyaltyDiscount() { updateBookingSummary(); }

function proceedToBook() {
  if(!currentUser) { showPage('login'); showToast('Please log in to complete your booking'); return; }
  updateBookingSummary();
  const bd = window._bookingData || {};
  // Fill payment page
  document.getElementById('paymentHotelName').textContent = currentHotel.name;
  document.getElementById('payHotelImg').src = currentHotel.img;
  document.getElementById('payHotelName').textContent = currentHotel.name;
  document.getElementById('payHotelLocation').textContent = currentHotel.location + ', Sri Lanka';
  document.getElementById('payCheckinDisplay').textContent = document.getElementById('bookCheckin').value;
  document.getElementById('payCheckoutDisplay').textContent = document.getElementById('bookCheckout').value;
  document.getElementById('payNightsDisplay').textContent = (bd.nights||3)+' nights';
  document.getElementById('payRoomsDisplay').textContent = (bd.rooms||1)+' Room(s)';
  document.getElementById('payBreakdown1Label').textContent = `${bd.rooms||1} Room × ${bd.nights||3} nights`;
  document.getElementById('payBreakdown1Val').textContent = formatPrice(bd.subtotalUSD||currentHotel.priceUSD*3);
  document.getElementById('payTaxDisplay').textContent = formatPrice(bd.taxUSD||currentHotel.priceUSD*0.3);
  document.getElementById('payGrandTotal').textContent = formatPrice(bd.totalUSD||currentHotel.priceUSD*3.3);
  document.getElementById('payTotalDisplay').textContent = formatPrice(bd.totalUSD||currentHotel.priceUSD*3.3);
  if(bd.discountUSD>0){ document.getElementById('payLoyaltyRow').style.display='flex'; document.getElementById('payLoyaltyDisc').textContent='-'+formatPrice(bd.discountUSD); }
  if(currentUser){ document.getElementById('payFirstName').value=currentUser.firstName||''; document.getElementById('payEmail').value=currentUser.email||''; }
  showPage('payment');
}

// ======================== PAYMENT ========================
function selectPayMethod(btn, method) {
  document.querySelectorAll('.payment-method-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  ['cardPayFields','paypalFields','bankFields','cryptoFields'].forEach(id=>{const el=document.getElementById(id);if(el)el.style.display='none';});
  const show = {card:'cardPayFields',paypal:'paypalFields',bank:'bankFields',crypto:'cryptoFields'};
  const el = document.getElementById(show[method]);
  if(el) el.style.display = 'block';
}

function formatCard(input) {
  let v = input.value.replace(/\s/g,'').replace(/[^0-9]/g,'');
  let f = v.match(/.{1,4}/g);
  input.value = f ? f.join('  ') : v;
}

function formatExpiry(input) {
  let v = input.value.replace(/[^0-9]/g,'');
  if(v.length>=2) v = v.slice(0,2)+' / '+v.slice(2,4);
  input.value = v;
}

function confirmPayment() {
  const ref = 'TB-2026-'+Math.floor(10000+Math.random()*90000);
  document.getElementById('successRef').textContent = ref;
  document.getElementById('successEmail').textContent = (currentUser?.email)||'your@email.com';
  document.getElementById('successHotelSum').textContent = currentHotel ? `${currentHotel.name} · ${currentHotel.location}` : '';
  // Add to bookings
  if(currentUser) {
    if(!currentUser.bookings) currentUser.bookings = [];
    currentUser.bookings.unshift({ref, hotel:currentHotel?.name, location:currentHotel?.location, img:currentHotel?.img, dates:`${document.getElementById('bookCheckin')?.value||'–'} → ${document.getElementById('bookCheckout')?.value||'–'}`, total:formatPrice(window._bookingData?.totalUSD||0), status:'Confirmed'});
  }
  showPage('booking-success');
}

// ======================== AUTH ========================
function switchLoginType(type) {
  ['personal','corporate','agent'].forEach(t => {
    document.getElementById(`tab-${t}`).classList.toggle('active', t===type);
    document.getElementById(`${t}LoginFields`).style.display = t===type?'block':'none';
  });
}

let captchaState = false, captchaState2 = false;

function verifyCaptcha() {
  const box = document.getElementById('captchaBox');
  const check = document.getElementById('captchaCheck');
  const label = document.getElementById('captchaLabel');
  box.classList.add('loading');
  setTimeout(()=>{
    box.classList.remove('loading'); box.classList.add('verified');
    label.textContent = 'Verified ✓'; captchaState = true;
  }, 1500);
}

function verifyCaptcha2() {
  const box = document.getElementById('captchaBox2');
  const check = document.getElementById('captchaCheck2');
  const label = document.getElementById('captchaLabel2');
  box.classList.add('loading');
  setTimeout(()=>{
    box.classList.remove('loading'); box.classList.add('verified');
    label.textContent = 'Verified ✓'; captchaState2 = true;
  }, 1500);
}

function proceedLoginStep2() {
  if(!captchaState) { showToast('⚠️ Please complete the CAPTCHA first'); return; }
  const email = document.getElementById('loginEmail')?.value || document.getElementById('agentNumber')?.value || 'user@email.com';
  document.getElementById('loginEmailDisplay').textContent = email;
  document.getElementById('loginStep1').style.display = 'none';
  document.getElementById('loginStep2').style.display = 'block';
  startOtpTimer();
}

function startOtpTimer() {
  let t = 120;
  clearInterval(otpTimerInterval);
  otpTimerInterval = setInterval(()=>{
    t--;
    const el = document.getElementById('otpTimer');
    if(el) el.textContent = `0${Math.floor(t/60)}:${(t%60).toString().padStart(2,'0')}`;
    if(t<=0) clearInterval(otpTimerInterval);
  }, 1000);
}

function moveOtp(input, idx, prefix) {
  if(input.value.length === 1 && idx < 5) {
    const inputs = input.parentElement.querySelectorAll('.otp-input');
    inputs[idx+1]?.focus();
  }
}

function completeLogin() {
  clearInterval(otpTimerInterval);
  const loginType = document.querySelector('.auth-tab.active')?.textContent || '';
  currentUser = {
    firstName: loginType.includes('Agent') ? 'Agent' : 'Alex',
    lastName: loginType.includes('Agent') ? 'Login' : 'Fernando',
    email: document.getElementById('loginEmail')?.value || 'user@travelbooker.lk',
    userType: loginType.includes('Agent') ? 'agent' : loginType.includes('Corporate') ? 'business' : 'tourist',
    ref: 'TB-2026-'+Math.floor(10000+Math.random()*90000),
    loyaltyPoints: 2450,
    bookings: [],
  };
  updateUserUI();
  showToast('🎉 Welcome back, '+currentUser.firstName+'!');
  showPage('home');
}

function signupNextStep() {
  const fn = document.getElementById('suFirstName')?.value;
  const email = document.getElementById('suEmail')?.value;
  if(!fn||!email) { showToast('⚠️ Please fill in your name and email'); return; }
  document.getElementById('signupStep1').style.display = 'none';
  document.getElementById('signupStep2').style.display = 'block';
  updateStepDot('ss', 2);
}

function signupFinalStep() {
  if(!captchaState2) { showToast('⚠️ Please complete the CAPTCHA verification'); return; }
  if(!document.getElementById('suTerms')?.checked) { showToast('⚠️ Please accept the Terms of Service'); return; }
  const email = document.getElementById('suEmail')?.value || 'user@email.com';
  document.getElementById('signupEmailDisplay').textContent = email;
  document.getElementById('signupStep2').style.display = 'none';
  document.getElementById('signupStep3').style.display = 'block';
  updateStepDot('ss', 3);
}

function completeSignup() {
  currentUser = {
    firstName: document.getElementById('suFirstName')?.value || 'New',
    lastName: document.getElementById('suLastName')?.value || 'User',
    email: document.getElementById('suEmail')?.value || 'user@travelbooker.lk',
    userType: document.getElementById('suUserType')?.value || 'tourist',
    ref: 'TB-2026-'+Math.floor(10000+Math.random()*90000),
    loyaltyPoints: 0,
    bookings: [],
  };
  updateUserUI();
  showToast('🎉 Account created! Welcome to TravelBooker, '+currentUser.firstName+'!');
  showPage('home');
}

function updateUserUI() {
  if(!currentUser) return;
  const initial = (currentUser.firstName[0]||'U').toUpperCase();
  document.getElementById('authButtons').style.display = 'none';
  document.getElementById('userMenu').style.display = 'flex';
  document.getElementById('navAvatarInitial').textContent = initial;
  document.getElementById('navUserName').textContent = currentUser.firstName;
  // Profile
  document.getElementById('profileDisplayName').textContent = currentUser.firstName+' '+currentUser.lastName;
  document.getElementById('profileEmail').textContent = currentUser.email;
  document.getElementById('profileRef').textContent = 'Ref: '+currentUser.ref;
  document.getElementById('profileAvatarBig').textContent = initial;
  document.getElementById('profileLoyaltyNum').textContent = currentUser.loyaltyPoints.toLocaleString();
  const typeLabels = {tourist:'🌴 Tourist',family:'👨‍👩‍👧 Family',solo:'🎒 Solo Traveller',business:'💼 Business',honeymoon:'💑 Honeymooner',student:'🎓 Student',teacher:'📚 Teacher',freelancer:'💻 Freelancer',blogger:'📸 Blogger',group:'👥 Group Organiser',agent:'🤝 Travel Agent',other:'✨ Guest'};
  document.getElementById('profileTypeBadge').innerHTML = `<i class="fas fa-star"></i> ${typeLabels[currentUser.userType]||'Guest'}`;
  switchProfileTab('overview', document.querySelector('.profile-nav-item'));
}

function logoutUser() {
  currentUser = null;
  document.getElementById('authButtons').style.display = 'flex';
  document.getElementById('userMenu').style.display = 'none';
  captchaState = false; captchaState2 = false;
  document.querySelectorAll('.captcha-box').forEach(b=>{b.classList.remove('verified','loading');});
  document.querySelectorAll('.captcha-label').forEach(l=>{l.textContent='I am not a robot';});
  document.querySelectorAll('.otp-input').forEach(i=>i.value='');
  showToast('👋 You\'ve been logged out successfully');
  showPage('home');
}

function showUserTypeFields() {
  const type = document.getElementById('suUserType')?.value;
  const extraDiv = document.getElementById('userTypeExtra');
  const studentWrap = document.getElementById('studentFieldWrap');
  const bizWrap = document.getElementById('businessFieldWrap');
  const groupWrap = document.getElementById('groupFieldWrap');
  if(!extraDiv) return;
  [studentWrap, bizWrap, groupWrap].forEach(el => { if(el) el.style.display='none'; });
  if(!type) { extraDiv.style.display='none'; return; }
  extraDiv.style.display = 'block';
  if(type==='student'&&studentWrap) studentWrap.style.display='block';
  if((type==='business')&&bizWrap) bizWrap.style.display='block';
  if(type==='group'&&groupWrap) groupWrap.style.display='block';
}

function updateStepDot(prefix, step) {
  [1,2,3].forEach(i => {
    const el = document.getElementById(prefix+i);
    if(!el) return;
    el.classList.toggle('done', i < step);
    el.classList.toggle('active', i === step);
  });
}

// ======================== PROFILE ========================
function switchProfileTab(tab, el) {
  document.querySelectorAll('.profile-nav-item').forEach(n=>n.classList.remove('active'));
  if(el) el.classList.add('active');
  const content = document.getElementById('profileContent');
  if(!content) return;
  if(tab==='overview') {
    content.innerHTML = `
      <div class="profile-card">
        <div class="profile-card-title">Welcome Back, ${currentUser?.firstName||'Guest'}! 👋 <button class="btn-edit-small" onclick="switchProfileTab('details',null)">Edit Profile</button></div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-bottom:24px">
          <div style="background:var(--light-teal);border-radius:12px;padding:20px;text-align:center"><div style="font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--deep-teal)">${currentUser?.bookings?.length||0}</div><div style="font-size:13px;color:var(--text-light)">Total Bookings</div></div>
          <div style="background:rgba(201,168,76,0.1);border-radius:12px;padding:20px;text-align:center"><div style="font-family:var(--font-display);font-size:28px;font-weight:700;color:var(--gold)">${(currentUser?.loyaltyPoints||0).toLocaleString()}</div><div style="font-size:13px;color:var(--text-light)">Loyalty Points</div></div>
          <div style="background:rgba(99,102,241,0.08);border-radius:12px;padding:20px;text-align:center"><div style="font-family:var(--font-display);font-size:28px;font-weight:700;color:#4F46E5">Gold</div><div style="font-size:13px;color:var(--text-light)">Member Tier</div></div>
        </div>
        <div style="font-weight:600;font-size:14px;color:var(--text-dark);margin-bottom:12px">Quick Actions</div>
        <div style="display:flex;gap:10px;flex-wrap:wrap">
          <button class="btn-submit" style="width:auto;padding:10px 20px;font-size:13px" onclick="showPage('destinations')">Browse Hotels</button>
          <button class="btn-submit" style="width:auto;padding:10px 20px;font-size:13px;background:white;border:1.5px solid var(--deep-teal);color:var(--deep-teal)" onclick="switchProfileTab('bookings',null)">My Bookings</button>
          <button class="btn-submit" style="width:auto;padding:10px 20px;font-size:13px;background:white;border:1.5px solid var(--gold);color:var(--gold)" onclick="switchProfileTab('loyalty',null)">Loyalty Rewards</button>
        </div>
      </div>
      <div class="profile-card">
        <div class="profile-card-title">Recent Bookings</div>
        ${renderBookingHistory()}
      </div>
    `;
  } else if(tab==='bookings') {
    content.innerHTML = `<div class="profile-card"><div class="profile-card-title">My Bookings</div>${renderBookingHistory()}</div>`;
  } else if(tab==='details') {
    content.innerHTML = `
      <div class="profile-card">
        <div class="profile-card-title">Personal Details <button class="btn-edit-small" onclick="showToast('✓ Details saved!')">Save Changes</button></div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
          <div class="form-group"><label class="form-label">First Name</label><input class="form-input" value="${currentUser?.firstName||''}"></div>
          <div class="form-group"><label class="form-label">Last Name</label><input class="form-input" value="${currentUser?.lastName||''}"></div>
        </div>
        <div class="form-group"><label class="form-label">Email</label><input class="form-input" type="email" value="${currentUser?.email||''}"></div>
        <div class="form-group"><label class="form-label">Phone</label><input class="form-input" placeholder="+94 XX XXX XXXX"></div>
        <div class="form-group">
          <label class="form-label">Traveller Type (change anytime)</label>
          <select class="form-select">
            <option ${currentUser?.userType==='tourist'?'selected':''}>🌴 Tourist / Leisure Traveller</option>
            <option ${currentUser?.userType==='family'?'selected':''}>👨‍👩‍👧 Family Traveller</option>
            <option ${currentUser?.userType==='solo'?'selected':''}>🎒 Solo Traveller</option>
            <option ${currentUser?.userType==='business'?'selected':''}>💼 Business Traveller</option>
            <option ${currentUser?.userType==='honeymoon'?'selected':''}>💑 Honeymooner / Couple</option>
            <option ${currentUser?.userType==='student'?'selected':''}>🎓 Student</option>
          </select>
        </div>
        <div class="form-group"><label class="form-label">Nationality</label><select class="form-select"><option>Sri Lanka</option><option>United Kingdom</option><option>United States</option><option>India</option><option>Other</option></select></div>
        <div class="form-group"><label class="form-label">Date of Birth</label><input class="form-input" type="date"></div>
      </div>
    `;
  } else if(tab==='loyalty') {
    content.innerHTML = `
      <div class="profile-card">
        <div class="profile-card-title">Loyalty Rewards</div>
        <div style="background:linear-gradient(135deg,var(--navy),#0B3D2B);border-radius:var(--radius-lg);padding:30px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between">
          <div>
            <div style="font-size:12px;color:rgba(255,255,255,0.5);text-transform:uppercase;letter-spacing:1px">Membership Number</div>
            <div style="font-family:monospace;font-size:22px;font-weight:700;color:var(--gold);margin:6px 0">LYL-2024-${currentUser?.ref?.slice(-5)||'00000'}</div>
            <div style="font-size:13px;color:rgba(255,255,255,0.7)">Gold Member · ${(currentUser?.loyaltyPoints||0).toLocaleString()} pts</div>
          </div>
          <div style="font-size:60px">👑</div>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-bottom:20px">
          <div style="text-align:center;padding:16px;background:var(--cream);border-radius:10px"><div style="font-size:22px;font-weight:700;color:var(--deep-teal)">${(currentUser?.loyaltyPoints||0).toLocaleString()}</div><div style="font-size:12px;color:var(--text-light)">Available Points</div></div>
          <div style="text-align:center;padding:16px;background:var(--cream);border-radius:10px"><div style="font-size:22px;font-weight:700;color:var(--gold)">2,550</div><div style="font-size:12px;color:var(--text-light)">To Platinum</div></div>
          <div style="text-align:center;padding:16px;background:var(--cream);border-radius:10px"><div style="font-size:22px;font-weight:700;color:var(--coral)">5K+</div><div style="font-size:12px;color:var(--text-light)">Lifetime Pts</div></div>
        </div>
        <p style="font-size:14px;color:var(--text-mid)">Paste your Loyalty Member Number during booking to automatically apply up to <strong>15% discount</strong> on your stay. Points are awarded at a rate of 10 pts per $1 spent.</p>
      </div>
    `;
  } else if(tab==='security') {
    content.innerHTML = `
      <div class="profile-card">
        <div class="profile-card-title">Security Settings</div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;background:var(--cream);border-radius:var(--radius)"><div><div style="font-weight:600;font-size:14px">Two-Factor Authentication</div><div style="font-size:13px;color:var(--text-light)">Email-based OTP verification</div></div><span style="background:rgba(34,197,94,0.1);color:#16A34A;font-size:12px;font-weight:700;padding:4px 14px;border-radius:50px">● Enabled</span></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;background:var(--cream);border-radius:var(--radius)"><div><div style="font-weight:600;font-size:14px">Change Password</div><div style="font-size:13px;color:var(--text-light)">Last changed: 30 days ago</div></div><button class="btn-edit-small" onclick="showToast('Password reset email sent!')">Change</button></div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding:16px;background:var(--cream);border-radius:var(--radius)"><div><div style="font-weight:600;font-size:14px">Active Sessions</div><div style="font-size:13px;color:var(--text-light)">1 device currently active</div></div><button class="btn-edit-small" style="color:var(--coral);background:rgba(224,90,64,0.08)" onclick="showToast('All other sessions terminated')">Sign Out All</button></div>
        </div>
        <div style="margin-top:24px;padding:20px;border:1px solid rgba(224,90,64,0.25);border-radius:var(--radius);background:rgba(224,90,64,0.03)">
          <div style="font-weight:700;font-size:14px;color:var(--coral);margin-bottom:8px"><i class="fas fa-exclamation-triangle" style="margin-right:8px"></i>Danger Zone</div>
          <p style="font-size:13px;color:var(--text-light);margin-bottom:14px">Permanently deletes your account, all bookings, preferences, and loyalty points. This cannot be undone.</p>
          <button onclick="if(confirm('Are you sure? All your data will be permanently removed.'))logoutUser();" style="padding:9px 22px;background:none;border:1.5px solid var(--coral);color:var(--coral);border-radius:var(--radius);cursor:pointer;font-weight:600;font-family:var(--font-body);font-size:14px">Delete My Account</button>
        </div>
      </div>
    `;
  } else if(tab==='preferences') {
    content.innerHTML = `
      <div class="profile-card">
        <div class="profile-card-title">Preferences <button class="btn-edit-small" onclick="showToast('✓ Preferences saved!')">Save</button></div>
        <div style="display:flex;flex-direction:column;gap:16px">
          <div><label class="form-label">Preferred Currency</label><select class="form-select" onchange="setCurrency(this.value==='Sri Lankan Rupee (LKR)'?'LKR':'USD')"><option>US Dollar (USD)</option><option>Sri Lankan Rupee (LKR)</option></select></div>
          <div><label class="form-label">Language</label><select class="form-select"><option>English</option><option>Sinhala</option><option>Tamil</option></select></div>
          <div><label class="form-label">Room Type Preference</label><select class="form-select"><option>Any Available</option><option>Single Room</option><option>Double/Twin</option><option>Suite</option><option>Villa / Private Pool</option></select></div>
          <div><label class="form-label">Dietary Preferences</label><select class="form-select"><option>No Preference</option><option>Vegetarian</option><option>Vegan</option><option>Halal</option><option>Gluten-Free</option></select></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px"><input type="checkbox" checked style="accent-color:var(--deep-teal)"> Email booking confirmations</label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px"><input type="checkbox" checked style="accent-color:var(--deep-teal)"> Special offers & promotions</label>
            <label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:14px"><input type="checkbox" style="accent-color:var(--deep-teal)"> SMS notifications</label>
          </div>
        </div>
        <div class="profile-card" style="margin-top:20px">
          <div class="profile-card-title">Notification Preferences <button class="btn-edit-small" onclick="showToast('✅ Saved!')">Save</button></div>
          <div style="display:flex;flex-direction:column;gap:10px">
            <label style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--cream);border-radius:var(--radius);cursor:pointer"><span style="font-size:14px">Booking confirmations & receipts</span><input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--deep-teal);cursor:pointer"></label>
            <label style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--cream);border-radius:var(--radius);cursor:pointer"><span style="font-size:14px">Promotional offers & deals</span><input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--deep-teal);cursor:pointer"></label>
            <label style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--cream);border-radius:var(--radius);cursor:pointer"><span style="font-size:14px">Travel reminders & check-in alerts</span><input type="checkbox" checked style="width:16px;height:16px;accent-color:var(--deep-teal);cursor:pointer"></label>
            <label style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--cream);border-radius:var(--radius);cursor:pointer"><span style="font-size:14px">New destination announcements</span><input type="checkbox" style="width:16px;height:16px;accent-color:var(--deep-teal);cursor:pointer"></label>
            <label style="display:flex;align-items:center;justify-content:space-between;padding:12px 16px;background:var(--cream);border-radius:var(--radius);cursor:pointer"><span style="font-size:14px">Loyalty reward updates</span><input type="checkbox" style="width:16px;height:16px;accent-color:var(--deep-teal);cursor:pointer"></label>
          </div>
        </div>
      </div>
    `;
  }
}

function renderBookingHistory() {
  const bookings = currentUser?.bookings || [];
  if(bookings.length === 0) {
    return `<div style="text-align:center;padding:40px;color:var(--text-light)"><div style="font-size:48px;margin-bottom:12px">🧳</div><div>No bookings yet. <span style="color:var(--deep-teal);cursor:pointer;font-weight:600" onclick="showPage('destinations')">Start exploring →</span></div></div>`;
  }
  return bookings.map(b=>`
    <div class="booking-history-item">
      <img class="booking-hist-img" src="${b.img||''}" alt="" onerror="this.style.display='none'">
      <div class="booking-hist-info">
        <div class="booking-hist-hotel">${b.hotel||'Hotel'}</div>
        <div class="booking-hist-dates"><i class="fas fa-calendar-alt"></i>${b.dates||'—'}</div>
        <span class="booking-hist-ref">${b.ref}</span>
      </div>
      <div style="text-align:right">
        <span class="booking-hist-status status-confirmed">${b.status||'Confirmed'}</span>
        <div class="booking-hist-amount" style="margin-top:8px">${b.total||'—'}</div>
        ${(b.status||'confirmed')==='confirmed'?`<div style="display:flex;gap:6px;margin-top:10px;justify-content:flex-end;flex-wrap:wrap">
          <button onclick="showToast('✏️ Modification request sent for ${b.ref}')" style="font-size:11px;padding:4px 10px;border:1.5px solid var(--deep-teal);background:white;color:var(--deep-teal);border-radius:20px;cursor:pointer;font-family:var(--font-body)">Modify</button>
          <button onclick="showToast('❌ Cancellation initiated for ${b.ref}')" style="font-size:11px;padding:4px 10px;border:1.5px solid var(--coral);background:white;color:var(--coral);border-radius:20px;cursor:pointer;font-family:var(--font-body)">Cancel</button>
          <button onclick="showToast('💰 Refund request submitted for ${b.ref}')" style="font-size:11px;padding:4px 10px;border:1.5px solid #7C3AED;background:white;color:#7C3AED;border-radius:20px;cursor:pointer;font-family:var(--font-body)">Refund</button>
        </div>`:''}
      </div>
    </div>
  `).join('');
}

// ======================== REVIEWS ========================
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if(!grid) return;
  grid.innerHTML = reviewsData.map(r=>`
    <div class="review-card">
      <div class="review-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      <div class="review-text">"${r.text}"</div>
      <div class="review-author">
        <div class="review-avatar" style="background:${r.avatar}">${r.initials}</div>
        <div><div class="review-name">${r.name}</div><div class="review-origin">${r.origin}</div></div>
        <span class="review-badge">${r.type}</span>
      </div>
    </div>
  `).join('');
}

function toggleReviewForm() {
  const form = document.getElementById('reviewFormCard');
  form.classList.toggle('show');
}

function setupStarRating() {
  const stars = document.querySelectorAll('#starRating i');
  stars.forEach((s,i) => {
    s.addEventListener('mouseover', ()=>stars.forEach((s2,j)=>s2.classList.toggle('active',j<=i)));
    s.addEventListener('mouseout', ()=>stars.forEach((s2,j)=>s2.classList.toggle('active',j<reviewStarRating)));
    s.addEventListener('click', ()=>{ reviewStarRating=i+1; stars.forEach((s2,j)=>s2.classList.toggle('active',j<reviewStarRating)); });
  });
}

function submitReview() {
  const name = document.getElementById('reviewName')?.value;
  const text = document.getElementById('reviewText')?.value;
  if(!name||!text) { showToast('⚠️ Please fill in your name and review'); return; }
  const newReview = { name, origin: document.getElementById('reviewOrigin')?.value||'Sri Lanka', rating: reviewStarRating||5, text, initials: name.slice(0,2).toUpperCase(), avatar: '#0B6E4F', type: 'New Review' };
  reviewsData.unshift(newReview);
  renderReviews();
  document.getElementById('reviewFormCard').classList.remove('show');
  showToast('🙏 Thank you! Your review has been published.');
}

// ======================== FAQ ========================
function renderFAQ() {
  const list = document.getElementById('faqList');
  if(!list) return;
  list.innerHTML = faqData.map((f,i)=>`
    <div class="faq-item" id="faq${i}">
      <div class="faq-q" onclick="toggleFaq(${i})">${f.q}<i class="fas fa-chevron-down"></i></div>
      <div class="faq-a">${f.a}</div>
    </div>
  `).join('');
}

function toggleFaq(i) {
  const item = document.getElementById('faq'+i);
  item.classList.toggle('open');
}

// ======================== PASSWORD STRENGTH ========================
function setupPasswordStrength() {
  const pw = document.getElementById('suPassword');
  if(!pw) return;
  pw.addEventListener('input', ()=>{
    const v = pw.value;
    let s = 0;
    if(v.length>=8) s++;
    if(/[A-Z]/.test(v)) s++;
    if(/[0-9]/.test(v)) s++;
    if(/[^a-zA-Z0-9]/.test(v)) s++;
    const cols = ['#EF4444','#F97316','#EAB308','#22C55E'];
    const labels = ['Too weak','Could be stronger','Getting there!','Strong ✓'];
    [1,2,3,4].forEach(i=>{
      const el = document.getElementById('pwStr'+i);
      if(el) el.style.background = i<=s ? cols[s-1] : 'var(--border)';
    });
    const lbl = document.getElementById('pwStrLabel');
    if(lbl) lbl.textContent = v ? labels[s-1]||'Too weak' : 'Enter a password';
  });
}

// ======================== CHATBOT ========================
function toggleChatbot() {
  const win = document.getElementById('chatbotWindow');
  win.classList.toggle('open');
  document.querySelector('.chatbot-btn .badge').style.display = 'none';
}

function openChatbot() {
  document.getElementById('chatbotWindow').classList.add('open');
}

function chatSend(msg) {
  const input = document.getElementById('chatInput');
  const text = msg || input?.value?.trim();
  if(!text) return;
  if(input) input.value = '';
  addChatMsg(text, 'user');
  setTimeout(()=>{ addChatMsg(getChatResponse(text), 'bot'); }, 800);
}

function getChatResponse(text) {
  const t = text.toLowerCase();
  if(t.includes('beach')||t.includes('surf')) return chatResponses.beach;
  if(t.includes('luxury')||t.includes('expensive')||t.includes('best')) return chatResponses.luxury;
  if(t.includes('book')||t.includes('reserv')) return chatResponses.book;
  if(t.includes('place')||t.includes('visit')||t.includes('see')||t.includes('top')) return chatResponses.places;
  if(t.includes('price')||t.includes('cost')||t.includes('cheap')||t.includes('budget')) return 'We have properties to suit every budget! Budget options start from around $50/night, mid-range $100–$250, and luxury from $300+. What\'s your approximate budget per night?';
  if(t.includes('cancel')||t.includes('refund')) return 'Most of our properties offer free cancellation up to 48 hours before check-in. You can manage cancellations from your Profile → My Bookings. Need me to check a specific booking?';
  if(t.includes('wifi')||t.includes('internet')) return 'Great news — over 95% of our listed properties offer complimentary high-speed WiFi. You can filter specifically for WiFi in the Destinations page filter panel!';
  if(t.includes('pay')||t.includes('card')||t.includes('payment')) return 'We accept Visa, MasterCard, American Express, PayPal, and bank transfers. All transactions are 256-bit SSL encrypted. You can also pay in USD or LKR!';
  if(t.includes('hello')||t.includes('hi')||t.includes('ayubowan')) return 'Ayubowan! 🙏 Lovely to hear from you! I\'m Ayu, your dedicated Sri Lanka travel assistant. Ask me anything about destinations, hotels, prices, or planning your trip!';
  const defaults = chatResponses.default;
  return defaults[Math.floor(Math.random()*defaults.length)];
}

function addChatMsg(text, type) {
  const messages = document.getElementById('chatMessages');
  const div = document.createElement('div');
  div.className = `chat-msg chat-msg-${type}`;
  const now = new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'});
  div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
  messages.appendChild(div);
  messages.scrollTop = messages.scrollHeight;
}

// ======================== MODAL ========================
function showModal(id) { document.getElementById(id).classList.add('open'); }
function closeModal(id) { document.getElementById(id).classList.remove('open'); }
document.addEventListener('click', e=>{
  if(e.target.classList.contains('modal-overlay')) e.target.classList.remove('open');
});

// ======================== TOAST ========================
function showToast(msg) {
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  setTimeout(()=>toast.classList.remove('show'), 3200);
}

// ======================== MISC ========================
function togglePasswordVisibility(id) {
  const input = document.getElementById(id);
  if(!input) return;
  input.type = input.type==='password' ? 'text' : 'password';
}

// ═══════════════════════════════════════════════════════
// WISHLIST
// ═══════════════════════════════════════════════════════
let wishlistIds = [];
try { wishlistIds = JSON.parse(localStorage.getItem('tb_wl') || '[]'); } catch(e) {}

function toggleWishlist(id, btn) {
  const idx = wishlistIds.indexOf(id);
  if(idx >= 0) {
    wishlistIds.splice(idx, 1);
    if(btn) btn.textContent = '🤍';
    showToast('Removed from wishlist');
  } else {
    if(wishlistIds.length >= 10) { showToast('Wishlist full (10 max)'); return; }
    wishlistIds.push(id);
    if(btn) btn.textContent = '❤️';
    showToast('❤️ Saved to wishlist!');
  }
  try { localStorage.setItem('tb_wl', JSON.stringify(wishlistIds)); } catch(e) {}
}

// ═══════════════════════════════════════════════════════
// HOTEL COMPARE
// ═══════════════════════════════════════════════════════
let compareHotelIds = [];
function toggleCompareHotel(id, chk) {
  if(chk.checked) {
    if(compareHotelIds.length >= 4) { chk.checked=false; showToast('Max 4 properties'); return; }
    compareHotelIds.push(id);
  } else {
    compareHotelIds = compareHotelIds.filter(x=>x!==id);
  }
}

// ═══════════════════════════════════════════════════════
// BOOKING AGENT TOGGLE
// ═══════════════════════════════════════════════════════
function toggleBookingAgent() {
  const chk = document.getElementById('bookRequestAgent');
  const wrap = document.getElementById('bookAgentSelectWrap');
  if(wrap) wrap.style.display = chk.checked ? 'block' : 'none';
}

function checkCorporateFields() {
  const g = document.getElementById('bookGuests');
  const wrap = document.getElementById('corporateGuestWrap');
  if(!g || !wrap) return;
  const isCorp = currentUser && (currentUser.userType === 'corporate' || currentUser.userType === 'business');
  wrap.style.display = (isCorp || parseInt(g.value) >= 5) ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════
// GOOGLE MAPS LINK (hotel detail)
// ═══════════════════════════════════════════════════════
function updateDetailMapsLink() {
  const link = document.getElementById('detailMapsLink');
  if(link && currentHotel) {
    link.href = 'https://www.google.com/maps/search/' + encodeURIComponent(currentHotel.name + ' ' + currentHotel.location + ' Sri Lanka');
  }
}

// ═══════════════════════════════════════════════════════
// PROMO CODES
// ═══════════════════════════════════════════════════════
const _promos = { 'COASTAL10':10, 'SUMMER20':20, 'AGENT15':15, 'WELCOME5':5, 'TB2026':12 };
let activePromoDiscount = 0;
function applyPromo() {
  const code = (document.getElementById('promoInput')?.value||'').toUpperCase().trim();
  const msg = document.getElementById('promoMsg');
  if(_promos[code]) {
    activePromoDiscount = _promos[code];
    if(msg){ msg.style.display='block'; msg.style.color='var(--deep-teal)'; msg.innerHTML='<i class="fas fa-check-circle"></i> Code "'+code+'" applied — '+activePromoDiscount+'% off!'; }
    showToast('🎉 Promo applied: '+activePromoDiscount+'% off');
  } else {
    activePromoDiscount = 0;
    if(msg){ msg.style.display='block'; msg.style.color='var(--coral)'; msg.textContent='Invalid code. Try: COASTAL10, SUMMER20, AGENT15'; setTimeout(()=>{msg.style.display='none';},3000); }
  }
}

// ═══════════════════════════════════════════════════════
// VAT INVOICE
// ═══════════════════════════════════════════════════════
function downloadVATInvoice() {
  const ref = document.getElementById('successRef')?.textContent || 'TB-2026-XXXXX';
  const hotel = currentHotel?.name || 'Hotel';
  const guest = currentUser ? currentUser.firstName+' '+currentUser.lastName : 'Guest';
  const content = [
    'TRAVELBOOKER — VAT INVOICE',
    '═══════════════════════════════════',
    'Invoice No : INV-' + ref,
    'Date       : ' + new Date().toLocaleDateString('en-GB'),
    '',
    'Customer   : ' + guest,
    'Hotel      : ' + hotel,
    'Reference  : ' + ref,
    '',
    'VAT (15%): Included in total price.',
    '',
    'Thank you for booking with TravelBooker.',
    'support@travelbooker.lk | +94 11 234 5678',
    'www.travelbooker.lk',
  ].join('\n');
  const a = Object.assign(document.createElement('a'), {
    href: URL.createObjectURL(new Blob([content],{type:'text/plain'})),
    download: 'VAT_Invoice_'+ref+'.txt'
  });
  a.click();
  showToast('📄 VAT invoice downloaded!');
}

// ═══════════════════════════════════════════════════════
// SHOW USER TYPE FIELDS (extended to handle new types)
// ═══════════════════════════════════════════════════════
function showUserTypeFields() {
  const v = document.getElementById('suUserType')?.value;
  const extraDiv = document.getElementById('userTypeExtra');
  const studentWrap = document.getElementById('studentFieldWrap');
  const bizWrap = document.getElementById('businessFieldWrap');
  const groupWrap = document.getElementById('groupFieldWrap');
  const corpWrap = document.getElementById('corporateFieldWrap');
  const corpRegWrap = document.getElementById('corporateRegWrap');
  const agentWrap = document.getElementById('agentFieldWrap');
  const agentNumWrap = document.getElementById('agentNumWrap');
  if(!extraDiv) return;
  const showExtra = ['student','business','group','corporate','travel_agent'].includes(v);
  extraDiv.style.display = showExtra ? 'block' : 'none';
  if(studentWrap) studentWrap.style.display = v==='student' ? 'block' : 'none';
  if(bizWrap) bizWrap.style.display = v==='business' ? 'block' : 'none';
  if(groupWrap) groupWrap.style.display = v==='group' ? 'block' : 'none';
  if(corpWrap) corpWrap.style.display = v==='corporate' ? 'block' : 'none';
  if(corpRegWrap) corpRegWrap.style.display = v==='corporate' ? 'block' : 'none';
  if(agentWrap) agentWrap.style.display = v==='travel_agent' ? 'block' : 'none';
  if(agentNumWrap) agentNumWrap.style.display = v==='travel_agent' ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════
// PACKAGES DATA & RENDERING
// ═══════════════════════════════════════════════════════
const tourPackages = [
  { id:'pkg1', name:'Pearl of the Indian Ocean', type:'b2c', category:'Cultural & Heritage', duration:'7 Days / 6 Nights', guests:'2 Adults', physical:'Round-island coach transfer + hotel check-ins', priceUSD:1290, originalUSD:1590, badge:'Most Popular', img:'https://images.unsplash.com/photo-1618826411640-d6df44dd3f7a?w=600&q=80', includes:['5★ Hotel Accommodation','All Breakfasts','Kandy Temple of Tooth Visit','Sigiriya Rock Climb','Nuwara Eliya Tea Estate Tour','Return Airport Transfers','24/7 Licensed Guide'], dests:['Colombo','Kandy','Nuwara Eliya','Sigiriya'] },
  { id:'pkg2', name:'Southern Coast Escape', type:'b2c', category:'Beach & Relaxation', duration:'5 Days / 4 Nights', guests:'2 Adults', physical:'Coastal road transfer, boat excursion', priceUSD:890, originalUSD:890, badge:null, img:'https://images.unsplash.com/photo-1590003597282-e27e79d3c56f?w=600&q=80', includes:['4★ Beachfront Hotel','All Breakfasts','Whale Watching Cruise','Galle Fort Walking Tour','Beginner Surf Lesson','Airport Transfers'], dests:['Mirissa','Galle','Weligama'] },
  { id:'pkg3', name:'Honeymoon in Paradise', type:'honeymoon', category:'Romantic Escape', duration:'10 Days / 9 Nights', guests:'2 Adults', physical:'Private chauffeur, sunset catamaran', priceUSD:3200, originalUSD:3800, badge:'❤️ Honeymoon Special', img:'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&q=80', includes:['5★ Private Pool Villa','All Meals Included','Couples Spa Treatment','Private Sunset Dinner','Whale Watching Cruise','Hot Air Balloon Ride','Honeymoon Concierge','Welcome Champagne & Flowers'], dests:['Galle','Mirissa','Ella','Kandy'] },
  { id:'pkg4', name:'Corporate Team Retreat', type:'corporate', category:'Corporate', duration:'3 Days / 2 Nights', guests:'10–50 Employees', physical:'Coach transfer, AV-equipped conference hall', priceUSD:2800, originalUSD:3200, badge:'🏢 Corporate', img:'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80', includes:['5★ Conference Facilities','All Meals & Beverages','Team Building Activities','Airport Group Transfer','Dedicated Event Manager','Customisable Agenda','Branded Materials','Post-Event Report'], dests:['Colombo','Kandy','Bentota'] },
  { id:'pkg5', name:'Family Adventure Package', type:'family', category:'Family', duration:'8 Days / 7 Nights', guests:'2 Adults + 2 Children', physical:'Family minibus, kid-safe safari jeep', priceUSD:2100, originalUSD:2500, badge:'👨‍👩‍👧 Family Pack', img:'https://images.unsplash.com/photo-1549294413-26f195200c16?w=600&q=80', includes:['4★ Family Rooms','All Breakfasts','Yala Safari (Kids Welcome)','Elephant Orphanage Visit','Colombo City Tour','Water Park Half-Day','Child-Friendly Guide','Airport Transfers'], dests:['Colombo','Kandy','Yala','Hikkaduwa'] },
  { id:'pkg6', name:'Agent Group Tour Package', type:'agent', category:'Group Travel', duration:'12 Days / 11 Nights', guests:'20–100 Pax', physical:'Luxury coach fleet, group entry passes', priceUSD:4800, originalUSD:6000, badge:'📋 Trade Price', img:'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=600&q=80', includes:['3★–5★ Group Hotels','All Breakfasts','Full Itinerary Coverage','Dedicated Tour Leader','Coach Transport','All Entry Fees','B2B Invoice & VAT Receipt','Commission Structure'], dests:['Colombo','Kandy','Sigiriya','Ella','Galle','Mirissa'] },
  { id:'pkg7', name:'Wildlife & Jungle Explorer', type:'b2c', category:'Adventure & Wildlife', duration:'6 Days / 5 Nights', guests:'2–4 Adults', physical:'Open-top jeep safaris, jungle trekking', priceUSD:1450, originalUSD:1750, badge:'🐆 Adventure', img:'https://images.unsplash.com/photo-1561731216-c3a4d99437d5?w=600&q=80', includes:['Eco-Lodge Accommodation','All Breakfasts','Yala Jeep Safari ×2','Udawalawe Elephant Safari','Birdwatching Walk','Night Safari','Naturalist Guide','Airport Transfers'], dests:['Yala','Ella','Sigiriya'] },
  { id:'pkg8', name:'Wellness & Ayurveda Retreat', type:'b2c', category:'Wellness', duration:'7 Days / 6 Nights', guests:'1–2 Adults', physical:'Mountain wellness centre, farm walks', priceUSD:1890, originalUSD:1890, badge:'🧘 Wellness', img:'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=600&q=80', includes:['5★ Wellness Resort','Full Board','Daily Yoga Sessions','Ayurvedic Consultations','2 Signature Spa Treatments','Meditation Classes','Farm-to-Table Dining','Forest & Mountain Hikes'], dests:['Kandy','Nuwara Eliya','Ella'] },
];

let pkgCompareList = [];

function renderPkgCards(list) {
  const el = document.getElementById('pkgCards');
  if(!el) return;
  el.innerHTML = (list||tourPackages).map(p => `
    <div class="hotel-card">
      <div class="hotel-card-img" style="position:relative">
        <img src="${p.img}" alt="${p.name}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'">
        ${p.badge ? `<div class="hotel-card-badge">${p.badge}</div>` : ''}
        <label onclick="event.stopPropagation()" style="position:absolute;bottom:10px;left:10px;background:rgba(255,255,255,0.92);border-radius:20px;padding:4px 11px;font-size:12px;font-weight:600;cursor:pointer;display:flex;align-items:center;gap:5px;color:var(--text-dark)">
          <input type="checkbox" style="accent-color:var(--deep-teal)" onchange="togglePkgCompare('${p.id}',this)"> Compare
        </label>
      </div>
      <div class="hotel-card-body">
        <div style="font-size:11px;color:var(--deep-teal);font-weight:600;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px">${p.category}</div>
        <div class="hotel-card-name" style="margin-bottom:6px">${p.name}</div>
        <div class="hotel-card-location" style="margin-bottom:10px"><i class="fas fa-map-marker-alt"></i>${p.dests.join(' → ')}</div>
        <div style="display:flex;gap:16px;margin-bottom:10px">
          <span style="font-size:13px;color:var(--text-mid)"><i class="fas fa-clock" style="color:var(--deep-teal);margin-right:5px"></i>${p.duration}</span>
          <span style="font-size:13px;color:var(--text-mid)"><i class="fas fa-users" style="color:var(--deep-teal);margin-right:5px"></i>${p.guests}</span>
        </div>
        <div style="margin-bottom:6px;font-size:12px;color:var(--text-light)"><i class="fas fa-bus" style="color:var(--deep-teal);margin-right:5px"></i>${p.physical}</div>
        <div style="margin-bottom:14px">
          ${p.includes.slice(0,4).map(i=>`<div style="font-size:12px;color:var(--text-mid);display:flex;gap:6px;align-items:center;padding:2px 0"><i class="fas fa-check-circle" style="color:var(--deep-teal);font-size:11px"></i>${i}</div>`).join('')}
          ${p.includes.length>4?`<div style="font-size:12px;color:var(--text-light);margin-top:2px">+${p.includes.length-4} more inclusions</div>`:''}
        </div>
        <div class="hotel-card-footer">
          <div class="hotel-card-price">
            <div class="label">from</div>
            <div>${p.originalUSD>p.priceUSD?`<span class="original">${formatPrice(p.originalUSD)}</span>`:''}<span class="amount">${formatPrice(p.priceUSD)}</span><span class="per"> / pkg</span></div>
          </div>
          <button class="btn-view-details" onclick="showToast('📦 Enquiry submitted! Our team will contact you within 2 hours.')">Enquire <i class="fas fa-arrow-right"></i></button>
        </div>
      </div>
    </div>
  `).join('');
}

function filterPkgs(type, btn) {
  document.querySelectorAll('.pkg-tab-btn').forEach(b => {
    b.style.background='white'; b.style.color='var(--text-mid)'; b.style.borderColor='var(--border)';
  });
  btn.style.background='var(--deep-teal)'; btn.style.color='white'; btn.style.border='none';
  renderPkgCards(type==='all' ? tourPackages : tourPackages.filter(p=>p.type===type));
}

function togglePkgCompare(id, chk) {
  if(chk.checked) {
    if(pkgCompareList.length>=4){chk.checked=false;showToast('Max 4 packages');return;}
    pkgCompareList.push(id);
  } else {
    pkgCompareList=pkgCompareList.filter(x=>x!==id);
  }
  const strip=document.getElementById('pkgCompareStrip');
  const cnt=document.getElementById('pkgCompareCount');
  if(strip) strip.style.display=pkgCompareList.length>0?'flex':'none';
  if(cnt) cnt.textContent=pkgCompareList.length;
}

function clearPkgCompare() {
  pkgCompareList=[];
  document.querySelectorAll('input[onchange*=togglePkgCompare]').forEach(c=>c.checked=false);
  const strip=document.getElementById('pkgCompareStrip');
  if(strip) strip.style.display='none';
}

function openPkgCompare() {
  if(pkgCompareList.length<2){showToast('Select at least 2 packages');return;}
  const items=pkgCompareList.map(id=>tourPackages.find(p=>p.id===id)).filter(Boolean);
  const rows=['Category','Duration','Guests','Price','Physical Inclusions'];
  const table=`<table style="width:100%;border-collapse:collapse;font-size:14px">
    <thead><tr><th style="text-align:left;padding:10px 14px;background:var(--cream);min-width:130px">Feature</th>
    ${items.map(p=>`<th style="padding:10px 14px;background:var(--cream);text-align:center"><img src="${p.img}" style="width:100%;max-width:160px;height:90px;object-fit:cover;border-radius:8px;display:block;margin-bottom:8px"><strong>${p.name}</strong></th>`).join('')}
    </tr></thead><tbody>
    <tr><td style="padding:10px 14px;border-top:1px solid var(--border);color:var(--text-light)">Category</td>${items.map(p=>`<td style="padding:10px 14px;border-top:1px solid var(--border);text-align:center">${p.category}</td>`).join('')}</tr>
    <tr style="background:var(--cream)"><td style="padding:10px 14px;color:var(--text-light)">Duration</td>${items.map(p=>`<td style="padding:10px 14px;text-align:center">${p.duration}</td>`).join('')}</tr>
    <tr><td style="padding:10px 14px;border-top:1px solid var(--border);color:var(--text-light)">For</td>${items.map(p=>`<td style="padding:10px 14px;border-top:1px solid var(--border);text-align:center">${p.guests}</td>`).join('')}</tr>
    <tr style="background:var(--cream)"><td style="padding:10px 14px;color:var(--text-light)">Price</td>${items.map(p=>`<td style="padding:10px 14px;text-align:center;color:var(--deep-teal);font-weight:700">${formatPrice(p.priceUSD)}</td>`).join('')}</tr>
    <tr><td style="padding:10px 14px;border-top:1px solid var(--border);color:var(--text-light)">Destinations</td>${items.map(p=>`<td style="padding:10px 14px;border-top:1px solid var(--border);text-align:center;font-size:12px">${p.dests.join(' → ')}</td>`).join('')}</tr>
    <tr style="background:var(--cream)"><td style="padding:10px 14px;color:var(--text-light)">Includes</td>${items.map(p=>`<td style="padding:10px 14px;font-size:12px">${p.includes.slice(0,5).map(i=>`<div style="display:flex;gap:5px;align-items:center;padding:2px 0"><i class="fas fa-check-circle" style="color:var(--deep-teal);font-size:10px"></i>${i}</div>`).join('')}</td>`).join('')}</tr>
    <tr><td> </td>${items.map(p=>`<td style="padding:10px 14px;border-top:1px solid var(--border);text-align:center"><button class="btn-view-details" onclick="closeModal('pkgCompareModal');showToast('📦 Enquiry submitted for ${p.name}!')">Enquire Now</button></td>`).join('')}</tr>
    </tbody></table>`;
  document.getElementById('pkgCompareContent').innerHTML=table;
  showModal('pkgCompareModal');
}

// ═══════════════════════════════════════════════════════
// PROFILE WISHLIST TAB
// ═══════════════════════════════════════════════════════
// Inject wishlist case into switchProfileTab by wrapping it
const _origSwitchTab = switchProfileTab;
function switchProfileTab(tab, el) {
  if(tab==='wishlist') {
    document.querySelectorAll('.profile-nav-item').forEach(n=>n.classList.remove('active'));
    if(el) el.classList.add('active');
    const content = document.getElementById('profileContent');
    if(!content) return;
    const saved = hotels.filter(h=>wishlistIds.includes(h.id));
    content.innerHTML = `<div class="profile-card">
      <div class="profile-card-title">My Wishlist <span style="font-weight:400;font-size:14px;color:var(--text-light)">${saved.length} saved</span></div>
      ${saved.length===0
        ? '<div style=\"text-align:center;padding:60px 20px\"><div style=\"font-size:48px;margin-bottom:16px\">🤍</div><p style=\"color:var(--text-light)\">No saved properties yet. Click ❤️ on any hotel card to save it here.</p></div>'
        : '<div class=\"hotel-cards\" id=\"wlCards\" style=\"grid-template-columns:repeat(auto-fill,minmax(280px,1fr))\"></div>'}
    </div>`;
    if(saved.length>0){
      const wc=document.getElementById('wlCards');
      if(wc) wc.innerHTML=saved.map(h=>`<div class="hotel-card" onclick="openHotelDetail(${h.id})" style="cursor:pointer"><div class="hotel-card-img"><img src="${h.img}" loading="lazy" style="width:100%;height:180px;object-fit:cover"></div><div class="hotel-card-body"><div class="hotel-card-name" style="margin-bottom:6px">${h.name}</div><div class="hotel-card-location"><i class="fas fa-map-marker-alt"></i>${h.location}, Sri Lanka</div><div class="hotel-card-footer" style="margin-top:12px"><div class="hotel-card-price"><span class="amount">${formatPrice(h.priceUSD)}</span><span class="per">/night</span></div><button class="btn-view-details" onclick="event.stopPropagation();openHotelDetail(${h.id})">Book <i class="fas fa-arrow-right"></i></button></div></div></div>`).join('');
    }
    return;
  }
  _origSwitchTab(tab, el);
}