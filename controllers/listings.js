const Listing = require("../models/listing");
const { geocode } = require("../utils/geocode");

// INDEX - Show all listings (with search & filter)
module.exports.index = async (req, res) => {
    let { q, category, minPrice, maxPrice } = req.query;
    let filter = {};

    // 1. Text search: match title, location, or country
    if (q) {
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, "i"); // case-insensitive
        filter.$or = [
            { title: regex },
            { location: regex },
            { country: regex }
        ];
    }

    // 2. Category filter
    if (category && category !== "All") {
        filter.category = category;
    }

    // 3. Price range filter
    if (minPrice || maxPrice) {
        filter.price = {};
        const min = Number(minPrice);
        const max = Number(maxPrice);
        if (minPrice && !isNaN(min)) filter.price.$gte = min;
        if (maxPrice && !isNaN(max)) filter.price.$lte = max;
    }

    const allListings = await Listing.find(filter);

    res.render("listings/index.ejs", { allListings, q, category, minPrice, maxPrice });
};

// NEW - Render form to create listing
module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

// SHOW - Details of a single listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const specificListing = await Listing.findById(id)
        .populate({ path: "reviews", populate: { path: "author" } })
        .populate("owner");
    if (!specificListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    res.render("listings/show.ejs", { specificListing, averageRating: specificListing.averageRating });
};

// CREATE - Post New Listing (Whitelisted fields to prevent mass assignment)
module.exports.createListing = async (req, res, next) => {
    const { title, description, location, country, price, category } = req.body.listing;
    const newListing = new Listing({ title, description, location, country, price, category });
    newListing.owner = req.user._id;

    const coordinates = await geocode(location);
    newListing.geometry = { type: "Point", coordinates };

    if (req.file) {
        newListing.image = { url: req.file.path, filename: req.file.filename };
    }

    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
};

// EDIT - Render Edit Form
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs", { specificListing: listing }); 
};

// UPDATE - Put Update Listing (Whitelisted fields + re-geocoding)
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    const { title, description, location, country, price, category } = req.body.listing;

    let listing = await Listing.findByIdAndUpdate(
        id,
        { title, description, location, country, price, category },
        { new: true, runValidators: true }
    );
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    // Re-geocode if location was changed
    if (location) {
        const coordinates = await geocode(location);
        listing.geometry = { type: "Point", coordinates };
        await listing.save();
    }

    if (typeof req.file !== "undefined") {
        listing.image = { url: req.file.path, filename: req.file.filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE - Destroy Listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    if (!deletedListing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};