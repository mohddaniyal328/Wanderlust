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
  }
];

module.exports = { data: sampleListings };