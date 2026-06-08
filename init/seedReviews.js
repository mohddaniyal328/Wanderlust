require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const mongoose = require("mongoose");
const Listing = require("../models/listing.js");
const Review = require("../models/review.js");
const User = require("../models/user.js");

const MONGO_URL = process.env.DB_URL;

const sampleReviews = [
    { rating: 5, comment: "Absolutely loved this place! The views were breathtaking and the host was incredibly welcoming." },
    { rating: 4, comment: "Great location, very clean. Only minor issue was the WiFi was a bit slow." },
    { rating: 5, comment: "Perfect getaway! Would definitely come back again. Highly recommended." },
    { rating: 3, comment: "Decent stay for the price. The photos were a bit misleading but overall okay." },
    { rating: 5, comment: "This was the highlight of our trip. Stunning scenery and cozy interior." },
    { rating: 4, comment: "Lovely place with great amenities. The kitchen was fully stocked which was a nice surprise." },
    { rating: 2, comment: "The listing didn't match the description. Some amenities were missing." },
    { rating: 5, comment: "Exceeded all expectations! The host thought of every little detail." },
    { rating: 4, comment: "Beautiful property in a great location. Would recommend to friends." },
    { rating: 5, comment: "One of the best stays I've ever had. The location is unbeatable." },
    { rating: 3, comment: "Good overall but the check-in process was confusing and took a while." },
    { rating: 5, comment: "Magical experience! Waking up to that view was unforgettable." },
    { rating: 4, comment: "Very comfortable and well-maintained. The neighborhood was safe and quiet." },
    { rating: 5, comment: "Hands down the best rental we've booked. Everything was perfect." },
    { rating: 4, comment: "Great value for money. The location is perfect for exploring the area." },
    { rating: 3, comment: "Nice place but could use some updates. The bathroom was a bit dated." },
    { rating: 5, comment: "We didn't want to leave! The property was even better than the photos." },
    { rating: 5, comment: "Exceptional host and amazing property. A five-star experience all around." },
];

async function main() {
    await mongoose.connect(MONGO_URL);
    console.log("Connected to DB");

    const users = await User.find({});
    const listings = await Listing.find({});

    if (users.length === 0) {
        console.log("No users found! Run seed.js first.");
        await mongoose.disconnect();
        return;
    }

    // Clear existing reviews
    await Review.deleteMany({});

    let reviewIdx = 0;
    for (let i = 0; i < listings.length; i++) {
        const listing = listings[i];
        // Assign 1-2 reviews per listing, cycling through users
        const numReviews = (i % 2 === 0) ? 2 : 1;
        for (let j = 0; j < numReviews; j++) {
            const reviewData = sampleReviews[reviewIdx % sampleReviews.length];
            const author = users[reviewIdx % users.length];
            const review = new Review({
                ...reviewData,
                author: author._id,
                createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
            });
            await review.save();
            listing.reviews.push(review._id);
            reviewIdx++;
        }
        await listing.save();
        console.log(`Added ${numReviews} reviews to "${listing.title}"`);
    }

    // Recalculate ratings for all listings
    for (const listing of listings) {
        const populated = await Listing.findById(listing._id).populate("reviews");
        if (populated.reviews.length > 0) {
            const sum = populated.reviews.reduce((acc, r) => acc + r.rating, 0);
            populated.averageRating = parseFloat((sum / populated.reviews.length).toFixed(1));
            populated.reviewCount = populated.reviews.length;
        } else {
            populated.averageRating = 0;
            populated.reviewCount = 0;
        }
        await populated.save();
    }

    console.log(`\nSeeded ${reviewIdx} total reviews!`);
    await mongoose.disconnect();
    console.log("Done!");
}

main().catch((err) => {
    console.log(err);
    process.exit(1);
});
