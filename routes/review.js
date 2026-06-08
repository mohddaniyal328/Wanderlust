const express = require("express");
const router = express.Router({ mergeParams: true }); // Allows access to :id from parent route
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,validateReview,isReviewAuthor} = require("../middleware.js"); // 1. Import the middleware
const reviewController = require("../controllers/reviews.js");

// POST REVIEW ROUTE
router.post("/", 
    isLoggedIn, 
    validateReview, 
    wrapAsync(reviewController.createReview)
);

// DELETE REVIEW ROUTE
router.delete("/:reviewId", 
    isLoggedIn, 
    isReviewAuthor, 
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;