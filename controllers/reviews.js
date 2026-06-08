const Listing = require("../models/listing");
const Review = require("../models/review");

// Helper: Recalculate and cache rating on Listing
async function updateListingRatingCache(listingId) {
    const listing = await Listing.findById(listingId).populate("reviews");
    if (listing.reviews.length > 0) {
        const sum = listing.reviews.reduce((acc, r) => acc + r.rating, 0);
        listing.averageRating = parseFloat((sum / listing.reviews.length).toFixed(1));
        listing.reviewCount = listing.reviews.length;
    } else {
        listing.averageRating = 0;
        listing.reviewCount = 0;
    }
    await listing.save();
}

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let newReview = new Review(req.body.review);
    
    // Assign the logged-in user as the author
    newReview.author = req.user._id; 
    
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    await updateListingRatingCache(listing._id);

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Remove the review reference from the Listing's reviews array
    const listing = await Listing.findById(id);
    if (listing) {
        listing.reviews.pull(reviewId);
        await listing.save();
    }
    // Delete the actual review document
    await Review.findByIdAndDelete(reviewId);
    await updateListingRatingCache(id);

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};