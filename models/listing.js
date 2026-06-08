const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: {
            type: String,
            // The default link if the field is undefined
            default: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=80&w=1080",
            // THE FIX: The setter handles empty strings ("") or null values
            set: (v) => (!v || v === "") ? "https://images.unsplash.com/photo-1571896349842-33c89424de2d?ixlib=rb-4.0.3&q=80&w=1080" : v,
        },
        filename: {
            type: String,
            default: "listingimage"
        }
    },
    price: {
        type: Number,
        min: [0, "Price cannot be negative!"]
    },
    location: String,
    country: String,
    category: {
        type: String,
        enum: ["Trending", "Rooms", "Iconic cities", "Mountains", "Castles", "Amazing pools", "Camping", "Farms", "Arctic", "Domes", "Boats"],
        default: "Rooms"
    },
    averageRating: {
        type: Number,
        default: 0
    },
    reviewCount: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: { 
            type: String, 
            enum: ['Point'], 
            default: 'Point' // This prevents the 'geometry.type is required' error
        },
        coordinates: { 
            type: [Number], 
            default: [75.7873, 26.9124] // Default to Jaipur if search fails
        }
    }
});

// Middleware for cleaning up reviews after a listing is deleted
listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await Review.deleteMany({
            _id: {
                $in: listing.reviews,
            },
        });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;