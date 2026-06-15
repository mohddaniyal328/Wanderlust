const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const ExpressError = require("../utils/ExpressError.js");

// 1. Import Cloudinary storage configuration
const { storage } = require("../config/cloudConfig.js");
const multer = require('multer');

// 2. File filter: only allow png, jpg, jpeg
const fileFilter = (req, file, cb) => {
    if (['image/png', 'image/jpeg', 'image/jpg'].includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new ExpressError(400, 'Only PNG and JPEG images are allowed'), false);
    }
};

// 3. Initialize Multer with Cloudinary storage, file filter, and 5MB size limit
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

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