const Listing = require("../models/listing");
const Review = require("../models/review");

// CREATE REVIEW
module.exports.createReview = async (req, res) => {
    let listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;

    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();

    // Incremental update: add this review's rating to the running total
    const newSum = listing.ratingSum + newReview.rating;
    const newCount = listing.reviewCount + 1;
    await Listing.updateOne(
        { _id: listing._id },
        {
            $inc: { ratingSum: newReview.rating, reviewCount: 1 },
            $set: { averageRating: parseFloat((newSum / newCount).toFixed(1)) }
        }
    );

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    // Find the review to get its rating before deleting
    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }
    let rating = review.rating;

    // Remove review reference from listing and delete the document
    const listing = await Listing.findById(id);
    if (listing) {
        listing.reviews.pull(reviewId);
        await listing.save();
    }
    await Review.findByIdAndDelete(reviewId);

    // Incremental update: subtract this review's rating from the running total
    const newSum = Math.max(0, listing.ratingSum - rating);
    const newCount = Math.max(0, listing.reviewCount - 1);
    await Listing.updateOne(
        { _id: id },
        {
            $inc: { ratingSum: -rating, reviewCount: -1 },
            $set: { averageRating: newCount > 0 ? parseFloat((newSum / newCount).toFixed(1)) : 0 }
        }
    );

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};
