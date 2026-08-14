const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Escape to this charming beachfront cottage for a relaxing getaway. Enjoy stunning ocean views and easy access to the beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1500,
    location: "Malibu",
    country: "United States",
    category: "Trending",
    geometry: { type: "Point", coordinates: [-118.6793, 34.0259] }
  },
  {
    title: "Modern Loft in Downtown",
    description: "Stay in the heart of the city in this stylish loft apartment. Perfect for urban explorers!",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1200,
    location: "New York City",
    country: "United States",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [-74.0060, 40.7128] }
  },
  {
    title: "Mountain Retreat",
    description: "Unplug and unwind in this peaceful mountain cabin. Surrounded by nature, it's a perfect place to recharge.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1000,
    location: "Aspen",
    country: "United States",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [-106.8175, 39.1911] }
  },
  {
    title: "Historic Villa in Tuscany",
    description: "Experience the charm of Tuscany in this beautifully restored villa. Explore the rolling hills and vineyards.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2500,
    location: "Florence",
    country: "Italy",
    category: "Castles",
    geometry: { type: "Point", coordinates: [11.2558, 43.7696] }
  },
  {
    title: "Secluded Treehouse Getaway",
    description: "Live among the treetops in this unique treehouse retreat. A true nature lover's paradise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 800,
    location: "Portland",
    country: "United States",
    category: "Camping",
    geometry: { type: "Point", coordinates: [-122.6765, 45.5231] }
  },
  {
    title: "Beachfront Paradise",
    description: "Step out of your door onto the sandy beach. This beachfront condo offers the ultimate relaxation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2000,
    location: "Cancun",
    country: "Mexico",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [-86.8515, 21.1619] }
  },
  {
    title: "Rustic Cabin by the Lake",
    description: "Spend your days fishing and kayaking on the serene lake. This cozy cabin is perfect for outdoor enthusiasts.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 900,
    location: "Lake Tahoe",
    country: "United States",
    category: "Farms",
    geometry: { type: "Point", coordinates: [-120.0324, 39.0968] }
  },
  {
    title: "Luxury Penthouse with City Views",
    description: "Indulge in luxury living with panoramic city views from this stunning penthouse apartment.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Los Angeles",
    country: "United States",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [-118.2437, 34.0522] }
  },
  {
    title: "Ski-In/Ski-Out Chalet",
    description: "Hit the slopes right from your doorstep in this ski-in/ski-out chalet in the Swiss Alps.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3000,
    location: "Verbier",
    country: "Switzerland",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [7.2286, 46.0961] }
  },
  {
    title: "Safari Lodge in the Serengeti",
    description: "Experience the thrill of the wild in a comfortable safari lodge. Witness the Great Migration up close.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4000,
    location: "Serengeti National Park",
    country: "Tanzania",
    category: "Domes",
    geometry: { type: "Point", coordinates: [34.8333, -2.3333] }
  },
  {
    title: "Historic Canal House",
    description: "Stay in a piece of history in this beautifully preserved canal house in Amsterdam's iconic district.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1800,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [4.8952, 52.3702] }
  },
  {
    title: "Private Island Retreat",
    description: "Have an entire island to yourself for a truly exclusive and unforgettable vacation experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1618140052121-39fc6db33972?ixlib=rb-4.0.3&q=80&w=800" },
    price: 10000,
    location: "Fiji",
    country: "Fiji",
    category: "Boats",
    geometry: { type: "Point", coordinates: [178.0650, -17.7134] }
  },
  // ====== ADDITIONAL LISTINGS ======
  {
    title: "Royal Heritage Haveli",
    description: "Experience royal Rajasthani hospitality in this restored 200-year-old haveli with intricate frescoes and a courtyard pool.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4500,
    location: "Jaipur",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [75.7873, 26.9124] }
  },
  {
    title: "Houseboat on Kerala Backwaters",
    description: "Float through the serene backwaters of Alleppey on a traditional kettuvallam houseboat with private chef.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6000,
    location: "Alleppey",
    country: "India",
    category: "Boats",
    geometry: { type: "Point", coordinates: [76.3388, 9.4981] }
  },
  {
    title: "Goan Beach Villa with Pool",
    description: "A stunning private villa steps from Baga Beach. Features an infinity pool, rooftop bar, and tropical garden.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 8000,
    location: "Goa",
    country: "India",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [73.7548, 15.4989] }
  },
  {
    title: "Manali Mountain Cottage",
    description: "Cozy wooden cottage with panoramic views of the Dhauladhar range. Perfect for trekking and winter snow.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Manali",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.1875, 32.2432] }
  },
  {
    title: "Tokyo Capsule Hotel Experience",
    description: "Stay in a futuristic capsule pod in the heart of Shinjuku. Compact, clean, and uniquely Japanese.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2200,
    location: "Tokyo",
    country: "Japan",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [139.6917, 35.6895] }
  },
  {
    title: "Santorini Cliffside Suite",
    description: "Wake up to caldera views in this whitewashed cave suite with a private plunge pool and sunset terrace.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&q=80&w=800" },
    price: 9500,
    location: "Santorini",
    country: "Greece",
    category: "Trending",
    geometry: { type: "Point", coordinates: [25.4316, 36.3932] }
  },
  {
    title: "Thatched Roof Farm Stay",
    description: "Live the rural life on this working farm. Fresh organic meals, bullock cart rides, and starry night skies.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1800,
    location: "Coorg",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [75.7437, 12.3375] }
  },
  {
    title: "Dubai Luxury Dome Tent",
    description: "Glamping in the desert with air-conditioned dome tents, camel rides, and traditional Bedouin campfire dinners.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 7500,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Domes",
    geometry: { type: "Point", coordinates: [55.2708, 25.2048] }
  },
  {
    title: "Iceland Northern Lights Cabin",
    description: "Glass-roofed cabin perfect for aurora watching. Geothermal hot tub, fireplace, and lava field hikes.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&q=80&w=800" },
    price: 12000,
    location: "Reykjavik",
    country: "Iceland",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [-21.8174, 64.1466] }
  },
  {
    title: "Rishikesh Riverside Camp",
    description: "Tent stays on the banks of the Ganges with rafting, cliff jumping, and evening Ganga Aarti views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2500,
    location: "Rishikesh",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [78.2676, 30.0869] }
  },
  {
    title: "Singapore Marina Bay Studio",
    description: "High-rise studio overlooking Marina Bay Sands. Walking distance to Gardens by the Bay and Clarke Quay.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5500,
    location: "Singapore",
    country: "Singapore",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [103.8198, 1.3521] }
  },
  {
    title: "Ladakh Homestay",
    description: "Traditional Ladakhi home with mountain views. Experience local culture, momos, and Buddhist monasteries.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2000,
    location: "Leh",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.5771, 34.1526] }
  },
  // ====== BATCH 2: 80+ MORE LISTINGS ======
  {
    title: "Pahadi Homestay with Valley View",
    description: "Wake up to misty valleys and chirping birds. A cozy wooden homestay in the heart of Uttarakhand.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2200,
    location: "Nainital",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [79.446, 29.3802] }
  },
  {
    title: "Beach Shack in Vagator",
    description: "Rustic beach shack steps from the shore. Bohemian vibes, hammocks, and sunset views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3000,
    location: "Vagator",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [73.7369, 15.5954] }
  },
  {
    title: "Heritage Haveli in Jodhpur",
    description: "Blue city views from a restored haveli rooftop. Traditional Marwari architecture with modern comfort.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5000,
    location: "Jodhpur",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [73.0243, 26.2389] }
  },
  {
    title: "Shimla Cottage Retreat",
    description: "Victorian-era cottage with fireplace and mountain trails at your doorstep.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2800,
    location: "Shimla",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [77.1734, 31.1048] }
  },
  {
    title: "Parisian Apartment near Eiffel Tower",
    description: "Charming studio with Eiffel Tower views. Walking distance to Champ de Mars.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800" },
    price: 8500,
    location: "Paris",
    country: "France",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [2.2945, 48.8584] }
  },
  {
    title: "Bali Rice Terrace Villa",
    description: "Private villa overlooking terraced rice paddies. Infinity pool and daily breakfast included.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6500,
    location: "Ubud",
    country: "Indonesia",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [115.2625, -8.5069] }
  },
  {
    title: "Swiss Mountain Lodge",
    description: "Alpine chalet with hot tub, ski storage, and views of the Matterhorn.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&q=80&w=800" },
    price: 15000,
    location: "Zermatt",
    country: "Switzerland",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [7.7491, 46.0207] }
  },
  {
    title: "Maldives Overwater Bungalow",
    description: "Wake up above turquoise waters. Glass floor panels and private deck with ocean access.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?ixlib=rb-4.0.3&q=80&w=800" },
    price: 25000,
    location: "Malé",
    country: "Maldives",
    category: "Boats",
    geometry: { type: "Point", coordinates: [73.5093, 4.1755] }
  },
  {
    title: "Kyoto Traditional Machiya",
    description: "Restored wooden townhouse in historic Gion district. Tatami rooms and private garden.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 7000,
    location: "Kyoto",
    country: "Japan",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [135.7681, 35.0116] }
  },
  {
    title: "Moroccan Riad with Rooftop Pool",
    description: "Ornate riad in the heart of Marrakech Medina. Courtyard pool and rooftop terrace.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4500,
    location: "Marrakech",
    country: "Morocco",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [-8.0089, 31.6295] }
  },
  {
    title: "Cape Town Waterfront Apartment",
    description: "Modern apartment with Table Mountain and harbor views. Walking distance to V&A Waterfront.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5500,
    location: "Cape Town",
    country: "South Africa",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [18.4241, -33.9249] }
  },
  {
    title: "Hampi Boulders Homestay",
    description: "Stay among ancient ruins and giant boulders. Cycle to temples at sunrise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1500,
    location: "Hampi",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [76.4601, 15.335] }
  },
  {
    title: "Barcelona Beach Loft",
    description: "Sunlit loft on Barceloneta beach. Surfboards available and seafood restaurants next door.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6000,
    location: "Barcelona",
    country: "Spain",
    category: "Trending",
    geometry: { type: "Point", coordinates: [2.1734, 41.3851] }
  },
  {
    title: "Jim Corbett Jungle Camp",
    description: "Glamping tents on the edge of Corbett National Park. Morning safaris and bonfire nights.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4000,
    location: "Jim Corbett",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [78.7748, 29.53] }
  },
  {
    title: "Darjeeling Tea Estate Bungalow",
    description: "Colonial-era bungalow on a working tea estate. Wake to Kanchenjunga views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5500,
    location: "Darjeeling",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [88.2663, 27.041] }
  },
  {
    title: "Amalfi Coast Cliff House",
    description: "White-washed house clinging to cliffs with private beach access and lemon groves.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&q=80&w=800" },
    price: 12000,
    location: "Positano",
    country: "Italy",
    category: "Trending",
    geometry: { type: "Point", coordinates: [14.4851, 40.6281] }
  },
  {
    title: "Varanasi Ghat View Room",
    description: "Room overlooking the sacred ghats. Witness the evening Ganga Aarti from your window.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2000,
    location: "Varanasi",
    country: "India",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [83.0076, 25.3176] }
  },
  {
    title: "Norwegian Fjord Cabin",
    description: "Secluded cabin on the edge of a fjord. Kayaking, fishing, and northern lights in winter.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?ixlib=rb-4.0.3&q=80&w=800" },
    price: 9000,
    location: "Bergen",
    country: "Norway",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [5.3221, 60.3913] }
  },
  {
    title: "Pondicherry French Quarter Villa",
    description: "Colonial villa in White Town. Pastel walls, bougainvillea, and beach bicycle rides.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Pondicherry",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [79.8083, 11.9416] }
  },
  {
    title: "Egyptian Nile Cruise Suite",
    description: "Luxury suite on a Nile cruise ship. Visit Luxor and Aswan temples from the water.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 18000,
    location: "Luxor",
    country: "Egypt",
    category: "Boats",
    geometry: { type: "Point", coordinates: [32.6396, 25.6872] }
  },
  {
    title: "Ooty Tea Garden Bungalow",
    description: "Heritage bungalow surrounded by tea gardens. Cool weather and toy train rides.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3200,
    location: "Ooty",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [76.695, 11.4102] }
  },
  {
    title: "London Mews House",
    description: "Converted garage mews house in Kensington. Blue door, cobblestone street, very British.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800" },
    price: 10000,
    location: "London",
    country: "United Kingdom",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [-0.1903, 51.5074] }
  },
  {
    title: "Spiti Valley Homestay",
    description: "Stone house at 12,000 ft. Stargazing, monastery visits, and the cold desert landscape.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1800,
    location: "Spiti Valley",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [78.2676, 32.2432] }
  },
  {
    title: "Greek Island Cave House",
    description: "Carved into the cliffside in Oia. Blue domes, caldera views, and the best sunset spot.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-4.0.3&q=80&w=800" },
    price: 11000,
    location: "Oia",
    country: "Greece",
    category: "Castles",
    geometry: { type: "Point", coordinates: [25.3763, 36.4614] }
  },
  {
    title: "Darjeeling Treehouse",
    description: "Elevated treehouse with glass walls and forest canopy views. Zip line access.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4500,
    location: "Dharamkot",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [76.3, 32.22] }
  },
  {
    title: "Miami South Beach Art Deco",
    description: "Pastel art deco apartment on Ocean Drive. Neon lights, beach, and nightlife at your door.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1622396481328-9b1b78cdd9fd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 7500,
    location: "Miami",
    country: "United States",
    category: "Trending",
    geometry: { type: "Point", coordinates: [-80.1301, 25.7907] }
  },
  {
    title: "Coorg Coffee Plantation Stay",
    description: "Bungalow on a working coffee estate. Freshly brewed coffee, nature trails, and rainforest sounds.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3800,
    location: "Coorg",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [75.7437, 12.3375] }
  },
  {
    title: "New York Brooklyn Loft",
    description: "Industrial loft in Williamsburg with Manhattan skyline views. Exposed brick and rooftop deck.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&q=80&w=800" },
    price: 9000,
    location: "New York City",
    country: "United States",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [-73.9568, 40.7075] }
  },
  {
    title: "Alleppey Luxury Houseboat",
    description: "Premium houseboat with AC bedrooms, kitchen, and upper deck. Full-day backwater cruise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506461883276-594a12b11cf3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 9000,
    location: "Alleppey",
    country: "India",
    category: "Boats",
    geometry: { type: "Point", coordinates: [76.3388, 9.4981] }
  },
  {
    title: "Iceland Glass Igloo",
    description: "Heated glass igloo for aurora watching from bed. Hot tub, fireplace, and lava field hikes.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 18000,
    location: "Rovaniemi",
    country: "Finland",
    category: "Domes",
    geometry: { type: "Point", coordinates: [25.7294, 66.5039] }
  },
  {
    title: "Munnar Tea Valley Resort",
    description: "Resort room overlooking endless tea valleys. Trekking, waterfall visits, and spice gardens.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4200,
    location: "Munnar",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [77.0591, 10.0889] }
  },
  {
    title: "Thai Beach Bungalow",
    description: "Thatched roof bungalow on a secluded Thai beach. Snorkeling, kayaking, and Thai cooking class.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4000,
    location: "Koh Lanta",
    country: "Thailand",
    category: "Camping",
    geometry: { type: "Point", coordinates: [99.0382, 7.6089] }
  },
  {
    title: "Udaipur Lake Palace View",
    description: "Room with Lake Pichola and City Palace views. Rooftop dinners under the stars.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6000,
    location: "Udaipur",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [73.6833, 24.5854] }
  },
  {
    title: "Swedish Treehotel Room",
    description: "Suspended mirror cube room among pine trees. Minimalist Scandinavian design with forest views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 14000,
    location: "Harads",
    country: "Sweden",
    category: "Domes",
    geometry: { type: "Point", coordinates: [20.2661, 65.9681] }
  },
  {
    title: "Shillong Guesthouse",
    description: "Cosy guesthouse in the Scotland of the East. Waterfalls, live music, and Khasi cuisine.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2500,
    location: "Shillong",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [91.8831, 25.5787] }
  },
  {
    title: "Dubai Palm Jumeirah Villa",
    description: "Beachfront villa on The Palm with private pool and Atlantis views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 30000,
    location: "Dubai",
    country: "United Arab Emirates",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [55.1403, 25.1124] }
  },
  {
    title: "Auli Ski Resort Room",
    description: "Room with Nanda Devi views. Skiing in winter, trekking in summer. India's best kept secret.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Auli",
    country: "India",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [79.5711, 30.5309] }
  },
  {
    title: "Tulum Beachfront Yoga Retreat",
    description: "Eco-chic cabana on Tulum beach. Daily yoga, cenote swims, and Mayan ruins nearby.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 7000,
    location: "Tulum",
    country: "Mexico",
    category: "Camping",
    geometry: { type: "Point", coordinates: [-87.4654, 20.2145] }
  },
  {
    title: "Kasol Riverside Camp",
    description: "Riverside tents in Parvati Valley. Triveni Trek, Israeli food, and mountain vibes.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1500,
    location: "Kasol",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [77.3156, 32.0116] }
  },
  {
    title: "Prague Old Town Apartment",
    description: "Apartment in a 14th century building. Astronomical Clock views from the window.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5000,
    location: "Prague",
    country: "Czech Republic",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [14.4378, 50.0755] }
  },
  {
    title: "Tawang Monastery Homestay",
    description: "Stay near the largest monastery in India. Buddhist culture, snow-capped peaks, and peace.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2000,
    location: "Tawang",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [91.8632, 27.5868] }
  },
  {
    title: "Malibu Surf Shack",
    description: "Beachside shack with surfboard storage and outdoor shower. Fall asleep to ocean waves.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 8000,
    location: "Malibu",
    country: "United States",
    category: "Camping",
    geometry: { type: "Point", coordinates: [-118.6793, 34.0259] }
  },
  {
    title: "Ladakh Campsite Dome",
    description: "Luxury dome tent at 14,000 ft. Pangong Lake views, camel rides, and clear night skies.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5000,
    location: "Leh",
    country: "India",
    category: "Domes",
    geometry: { type: "Point", coordinates: [77.5771, 34.1526] }
  },
  {
    title: "Byron Bay Lighthouse Cottage",
    description: "Cottage near the lighthouse with whale watching views and surf beaches.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-4.0.3&q=80&w=800" },
    price: 7500,
    location: "Byron Bay",
    country: "Australia",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [153.6167, -28.6397] }
  },
  {
    title: "Pushkar Desert Camp",
    description: "Desert camp with camel safari, folk music, and sunset over sand dunes.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3000,
    location: "Pushkar",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [74.5527, 26.4897] }
  },
  {
    title: "Reykjavik Harbor Apartment",
    description: "Apartment overlooking the harbor with Harpa Concert Hall views and hot spring access.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 8000,
    location: "Reykjavik",
    country: "Iceland",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [-21.8174, 64.1466] }
  },
  {
    title: "Lonavala Pool Villa",
    description: "Weekend getaway villa with private pool, BBQ area, and valley views. Perfect for groups.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 8500,
    location: "Lonavala",
    country: "India",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [73.4078, 18.7537] }
  },
  {
    title: "Amsterdam Houseboat",
    description: "Converted canal boat with modern interior. Fall asleep to gentle water sounds.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6500,
    location: "Amsterdam",
    country: "Netherlands",
    category: "Boats",
    geometry: { type: "Point", coordinates: [4.8952, 52.3702] }
  },
  {
    title: "Mahabaleshwar Strawberry Farm",
    description: "Farmstay amid strawberry fields. Pick your own strawberries and enjoy fresh cream.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2800,
    location: "Mahabaleshwar",
    country: "India",
    category: "Farms",
    geometry: { type: "Point", coordinates: [73.6647, 17.9239] }
  },
  {
    title: "Seoul Bukchon Hanok Village Stay",
    description: "Traditional Korean hanok house with heated ondol floors. Temple and palace walks.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5500,
    location: "Seoul",
    country: "South Korea",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [126.978, 37.5826] }
  },
  {
    title: "Dharamkot Meditation Cabin",
    description: "Simple cabin in McLeod Ganj. Meditation courses, Tibetan food, and Dhauladhar trek access.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1800,
    location: "McLeod Ganj",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [76.3178, 32.2426] }
  },
  {
    title: "Turkey Cappadocia Cave Hotel",
    description: "Carved into fairy chimneys. Hot air balloon views from your terrace at sunrise.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 9000,
    location: "Goreme",
    country: "Turkey",
    category: "Castles",
    geometry: { type: "Point", coordinates: [34.8333, 38.6431] }
  },
  {
    title: "Gokarna Beach Hut",
    description: "Beach hut on Om Beach. Simple, clean, and steps from the waves. Trek to paradise beach.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1200,
    location: "Gokarna",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [74.3162, 14.5204] }
  },
  {
    title: "Venice Canal View Apartment",
    description: "Apartment on a quiet canal with gondola views. Authentic Venetian experience.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1514824137252-bdf72b99f78e?ixlib=rb-4.0.3&q=80&w=800" },
    price: 11000,
    location: "Venice",
    country: "Italy",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [12.3155, 45.4408] }
  },
  {
    title: "Wayanad Treehouse Resort",
    description: "Elevated treehouse in Wayanad rainforest. Canopy walks and tribal village visits.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 6000,
    location: "Wayanad",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [76.132, 11.6854] }
  },
  {
    title: "Patagonia Eco Lodge",
    description: "Off-grid lodge at the edge of Torres del Paine. Glacier treks and puma tracking.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 13000,
    location: "Torres del Paine",
    country: "Chile",
    category: "Domes",
    geometry: { type: "Point", coordinates: [-72.8823, -51.2538] }
  },
  {
    title: "Mount Abu Hill Station Villa",
    description: "Villa near Dilwara Temples. Cool weather, Nakki Lake boating, and sunset point visits.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3000,
    location: "Mount Abu",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [72.7163, 24.5926] }
  },
  {
    title: "Tokyo Shibuya Capsule Plus",
    description: "Upgraded capsule with private shower and work desk. Heart of Shibuya crossing.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Tokyo",
    country: "Japan",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [139.6917, 35.6895] }
  },
  {
    title: "Saputara Hill Station Cottage",
    description: "Cottage overlooking Gujarat's only hill station. Lake boating and artist colony visits.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2200,
    location: "Saputara",
    country: "India",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [73.5005, 20.5853] }
  },
  {
    title: "New Zealand Lakeside Lodge",
    description: "Lodge on Lake Wakatipu with Remarkables mountain views. Bungee and jet boat rides.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 12000,
    location: "Queenstown",
    country: "New Zealand",
    category: "Mountains",
    geometry: { type: "Point", coordinates: [168.6626, -45.0312] }
  },
  {
    title: "Kodaikanal Lakeside Cabin",
    description: "Cabin overlooking the lake. Boating, Coaker's Walk, and homemade chocolates.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2500,
    location: "Kodaikanal",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [77.4872, 10.2381] }
  },
  {
    title: "Canadian Rockies Chalet",
    description: "Ski-in chalet near Lake Louise. Hot tub with mountain views and wildlife spotting.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&q=80&w=800" },
    price: 16000,
    location: "Banff",
    country: "Canada",
    category: "Arctic",
    geometry: { type: "Point", coordinates: [-115.5708, 51.1784] }
  },
  {
    title: "Jaisalmer Desert Fort Stay",
    description: "Room inside the living fort. Camel safaris, folk dance, and golden sand dunes at sunset.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Jaisalmer",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [70.9083, 26.9157] }
  },
  {
    title: "Budapest Ruin Bar Apartment",
    description: "Apartment above the famous ruin bars. Thermal baths and ruin pub crawls nearby.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4500,
    location: "Budapest",
    country: "Hungary",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [19.0402, 47.4979] }
  },
  {
    title: "Mcleodganj Tibetan Homestay",
    description: "Warm Tibetan homestay near Tsuglagkhang Monastery. Momos, thukpa, and meditation.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1500,
    location: "McLeod Ganj",
    country: "India",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [76.3178, 32.2426] }
  },
  {
    title: "Cuba Vintage Havana House",
    description: "Restored colonial house with classic car garage. Rooftop mojitos and salsa music nights.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&q=80&w=800" },
    price: 5000,
    location: "Havana",
    country: "Cuba",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [-82.3666, 23.1136] }
  },
  {
    title: "Meghalaya Living Root Bridge Stay",
    description: "Homestay near the living root bridges. Trek through wettest place on earth.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2000,
    location: "Cherrapunji",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [91.696, 25.2994] }
  },
  {
    title: "Australia Great Barrier Reef Villa",
    description: "Waterfront villa with reef access. Snorkeling, diving, and island hopping tours.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?ixlib=rb-4.0.3&q=80&w=800" },
    price: 14000,
    location: "Cairns",
    country: "Australia",
    category: "Amazing pools",
    geometry: { type: "Point", coordinates: [145.7781, -16.9186] }
  },
  {
    title: "Mount Abu Heritage Haveli",
    description: "100-year-old haveli with marble carvings. Peaceful gardens and Jain temple visits.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 3500,
    location: "Mount Abu",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [72.7163, 24.5926] }
  },
  {
    title: "Iceland Black Sand Beach Cottage",
    description: "Cottage near Vik black sand beach. Waterfalls, glacier hikes, and puffin watching.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1451337516015-6b6e9a44a8a3?ixlib=rb-4.0.3&q=80&w=800" },
    price: 10000,
    location: "Vik",
    country: "Iceland",
    category: "Rooms",
    geometry: { type: "Point", coordinates: [-19.006, 63.4187] }
  },
  {
    title: "Pachmarhi Forest Lodge",
    description: "Forest department lodge in Satpura. Bison sightings, bee falls, and cave paintings.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&q=80&w=800" },
    price: 1800,
    location: "Pachmarhi",
    country: "India",
    category: "Camping",
    geometry: { type: "Point", coordinates: [77.7567, 22.4671] }
  },
  {
    title: "Porto Wine Cellar Apartment",
    description: "Apartment above a port wine cellar. River Douro views and wine tasting at your doorstep.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixlib=rb-4.0.3&q=80&w=800" },
    price: 4000,
    location: "Porto",
    country: "Portugal",
    category: "Iconic cities",
    geometry: { type: "Point", coordinates: [-8.6291, 41.1579] }
  },
  {
    title: "Khajuraho Temple View Stay",
    description: "Stay near the famous temple complex. Night sound and light show and orchha excursion.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&q=80&w=800" },
    price: 2200,
    location: "Khajuraho",
    country: "India",
    category: "Castles",
    geometry: { type: "Point", coordinates: [79.9199, 24.8518] }
  }
];

module.exports = { data: sampleListings };