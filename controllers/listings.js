const Listing = require("../models/listing");
const { geocode } = require("../utils/geocode");

const ITEMS_PER_PAGE = 6;

// INDEX - Show all listings (with search, filter & pagination)
module.exports.index = async (req, res) => {
    let { q, category, minPrice, maxPrice, page } = req.query;
    let filter = {};

    // 1. Text search: match title, location, or country
    if (q) {
        const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(escaped, "i");
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

    // Pagination
    const currentPage = parseInt(page) || 1;
    const totalItems = await Listing.countDocuments(filter);
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const allListings = await Listing.find(filter)
        .skip((currentPage - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);

    res.render("listings/index.ejs", {
        allListings, q, category, minPrice, maxPrice,
        currentPage, totalPages, totalItems
    });
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

    const { found, coordinates } = await geocode(location);
    if (!found) {
        req.flash("error", "Location not found. Please enter a valid city or address.");
        return res.redirect("/listings/new");
    }

    const newListing = new Listing({ title, description, location, country, price, category });
    newListing.owner = req.user._id;
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

    // Re-geocode if location was changed
    if (location) {
        const { found, coordinates } = await geocode(location);
        if (!found) {
            req.flash("error", "Location not found. Please enter a valid city or address.");
            return res.redirect(`/listings/${id}/edit`);
        }
        let listing = await Listing.findByIdAndUpdate(
            id,
            { title, description, location, country, price, category, geometry: { type: "Point", coordinates } },
            { new: true, runValidators: true }
        );
        if (!listing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");
        }
    } else {
        await Listing.findByIdAndUpdate(
            id,
            { title, description, location, country, price, category },
            { new: true, runValidators: true }
        );
    }

    if (typeof req.file !== "undefined") {
        let listing = await Listing.findById(id);
        if (listing) {
            listing.image = { url: req.file.path, filename: req.file.filename };
            await listing.save();
        }
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

// MY LISTINGS - Show current user's listings
module.exports.myListings = async (req, res) => {
    const myListings = await Listing.find({ owner: req.user._id });
    res.render("listings/mylistings.ejs", { allListings: myListings });
};

// TOGGLE WISHLIST - Add/remove listing from user's wishlist
module.exports.toggleWishlist = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const User = require("../models/user");

    const user = await User.findById(userId);
    const index = user.wishlists.findIndex(w => w.toString() === id);

    if (index === -1) {
        user.wishlists.push(id);
    } else {
        user.wishlists.splice(index, 1);
    }
    await user.save();

    // Refresh the session user so currUser.wishlists is up to date
    req.login(user, (err) => {
        if (err) return res.redirect("back");
        const isWishlisted = index === -1;
        if (req.headers["x-requested-with"] === "XMLHttpRequest") {
            return res.json({ wishlisted: isWishlisted });
        }
        req.flash("success", isWishlisted ? "Added to wishlists!" : "Removed from wishlists!");
        res.redirect(`/listings/${id}`);
    });
};

// WISHLISTS PAGE - Show all wishlisted listings
module.exports.wishlists = async (req, res) => {
    const User = require("../models/user");
    const user = await User.findById(req.user._id).populate("wishlists");
    res.render("listings/wishlists.ejs", { allListings: user.wishlists });
};

// BOOK - Create a booking
module.exports.createBooking = async (req, res) => {
    const Booking = require("../models/booking");
    const Listing = require("../models/listing");
    const { id } = req.params;
    const { checkin, checkout } = req.body;

    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    const checkInDate = new Date(checkin);
    const checkOutDate = new Date(checkout);

    if (checkOutDate <= checkInDate) {
        req.flash("error", "Checkout date must be after check-in date!");
        return res.redirect(`/listings/${id}`);
    }

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
        listing: id,
        status: { $ne: "cancelled" },
        $or: [
            { checkin: { $lt: checkOutDate }, checkout: { $gt: checkInDate } }
        ]
    });

    if (overlapping) {
        req.flash("error", "Dates are not available! Someone already booked these dates.");
        return res.redirect(`/listings/${id}`);
    }

    const nights = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const totalPrice = nights * listing.price;

    const booking = new Booking({
        listing: id,
        user: req.user._id,
        checkin: checkInDate,
        checkout: checkOutDate,
        nights,
        totalPrice
    });

    await booking.save();
    req.flash("success", `Booking confirmed! ${nights} nights for ₹${totalPrice.toLocaleString("en-IN")}`);
    res.redirect(`/listings/${id}`);
};

// MY BOOKINGS - Show current user's bookings
module.exports.myBookings = async (req, res) => {
    const Booking = require("../models/booking");
    const bookings = await Booking.find({ user: req.user._id })
        .populate({ path: "listing", populate: { path: "owner" } })
        .sort({ createdAt: -1 });
    res.render("listings/mybookings.ejs", { bookings });
};

// CANCEL BOOKING
module.exports.cancelBooking = async (req, res) => {
    const Booking = require("../models/booking");
    const { bookingId } = req.params;
    const booking = await Booking.findById(bookingId);

    if (!booking || !booking.user.equals(req.user._id)) {
        req.flash("error", "Booking not found!");
        return res.redirect("/listings");
    }

    booking.status = "cancelled";
    await booking.save();
    req.flash("success", "Booking cancelled!");
    res.redirect("/my-bookings");
};