const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");

// 1. Import Cloudinary storage configuration
const { storage } = require("../config/cloudConfig.js");
const multer = require('multer');

// 2. Initialize Multer to use Cloudinary instead of a local folder
const upload = multer({ storage }); 

// Grouping "/" routes
router.route("/")
    .get(listingController.index)
    .post(
        isLoggedIn, 
        upload.single('listing[image]'), // Files go to Cloudinary here
        validateListing, 
        listingController.createListing
    );

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Grouping "/:id" routes
router.route("/:id")
    .get(listingController.showListing)
    .put(
        isLoggedIn, 
        isOwner, 
        upload.single('listing[image]'), 
        validateListing, 
        listingController.updateListing
    )
    .delete(isLoggedIn, isOwner, listingController.destroyListing);

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, listingController.renderEditForm);

module.exports = router;