const Listing = require("../models/listing");

// INDEX - Show all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
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
    res.render("listings/show.ejs", { specificListing });
};

// CREATE - Post New Listing (Updated for Optional File Upload)
module.exports.createListing = async (req, res, next) => {
    // 1. Grab the address the user typed in the 'Location' field
    let address = req.body.listing.location;

    try {
        // 2. THIS IS THE GEOCODING MAN! 
        // We send the address to OpenStreetMap and ask for JSON back.
        let response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
            {
                headers: { 'User-Agent': 'Wanderlust_Student_Project' }
            }
        );

        let data = await response.json();

        const newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;

        // 3. Check if the Geocoder actually found the place
        if (data && data.length > 0) {
            console.log("Location Found:", data[0].display_name);
            newListing.geometry = {
                type: "Point",
                coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)] // Real dynamic data!
            };
        } else {
            console.log("Location not found, using fallback.");
            newListing.geometry = {
                type: "Point",
                coordinates: [75.7873, 26.9124] // Jaipur fallback
            };
        }

        if (req.file) {
            newListing.image = { url: req.file.path, filename: req.file.filename };
        }

        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listings");

    } catch (err) {
        console.error("Geocoding failed:", err);
        next(err); // This catches the 'Access Denied' or network issues
    }
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

// UPDATE - Put Update Listing (Updated for File Upload)
module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    
    // 1. Update the text fields first
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    // 2. ONLY update the image if the user actually uploaded a new file
    if (typeof req.file !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = { url, filename };
        await listing.save();
    }

    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};

// DELETE - Destroy Listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};