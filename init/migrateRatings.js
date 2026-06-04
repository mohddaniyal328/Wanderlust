// Run once: node init/migrateRatings.js
const mongoose = require("mongoose");
const Listing = require("../models/listing");
const Review = require("../models/review");
require("dotenv").config({ path: require('path').resolve(__dirname, '../.env') });

async function migrate() {
    await mongoose.connect(process.env.DB_URL || "mongodb://127.0.0.1:27017/wanderlust");
    const listings = await Listing.find({}).populate("reviews");
    for (let listing of listings) {
        if (listing.reviews.length > 0) {
            const sum = listing.reviews.reduce((a, r) => a + r.rating, 0);
            listing.averageRating = parseFloat((sum / listing.reviews.length).toFixed(1));
            listing.reviewCount = listing.reviews.length;
        } else {
            listing.averageRating = 0;
            listing.reviewCount = 0;
        }
        await listing.save();
    }
    console.log(`Migrated ${listings.length} listings.`);
    process.exit(0);
}
migrate();
