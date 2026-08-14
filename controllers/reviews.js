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

    // Recalculate ratings from all reviews (safe against drift)
    const populated = await Listing.findById(listing._id).populate("reviews");
    const reviews = populated.reviews;
    const count = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;

    await Listing.updateOne(
        { _id: listing._id },
        {
            $set: {
                ratingSum: sum,
                reviewCount: count,
                averageRating: avg
            }
        }
    );

    req.flash("success", "New Review Created!");
    res.redirect(`/listings/${listing._id}`);
};

// DELETE REVIEW
module.exports.destroyReview = async (req, res) => {
    let { id, reviewId } = req.params;

    let review = await Review.findById(reviewId);
    if (!review) {
        req.flash("error", "Review not found!");
        return res.redirect(`/listings/${id}`);
    }

    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);

    // Recalculate ratings from remaining reviews
    const populated = await Listing.findById(id).populate("reviews");
    const reviews = populated.reviews;
    const count = reviews.length;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const avg = count > 0 ? parseFloat((sum / count).toFixed(1)) : 0;

    await Listing.updateOne(
        { _id: id },
        {
            $set: {
                ratingSum: sum,
                reviewCount: count,
                averageRating: avg
            }
        }
    );

    req.flash("success", "Review Deleted!");
    res.redirect(`/listings/${id}`);
};
