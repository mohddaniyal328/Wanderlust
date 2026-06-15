// 1. DATABASE & ENV SETUP
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const sanitize = require("mongo-sanitize");

// Validate required env vars
if (!process.env.SECRET) throw new Error("SECRET environment variable is required");
if (process.env.NODE_ENV === "production") {
    if (!process.env.DB_URL) throw new Error("DB_URL environment variable is required in production");
}

// Models & Utilities
const User = require("./models/user.js");
const ExpressError = require("./utils/ExpressError.js");

// 2. ROUTE IMPORTS
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

// 3. DATABASE CONNECTION
const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/wanderlust";

main()
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(dbUrl);
}

// 4. VIEW ENGINE & MIDDLEWARE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine('ejs', ejsMate);

app.set('trust proxy', 1);

// Security headers
app.use(helmet({
    contentSecurityPolicy: false,
    crossOriginEmbedderPolicy: false,
}));

// Rate limiting
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10, // 10 attempts per window
    message: "Too many attempts, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const listingLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    message: "Too many listing requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

const reviewLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many review requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false,
});

app.use(express.urlencoded({ extended: true }));
app.use(sanitize());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

// 5. SESSION & FLASH CONFIG
const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});

store.on("error", (err) => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: Date.now() + 1 * 24 * 60 * 60 * 1000,
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
    },
};

app.use(session(sessionOptions));
app.use(flash());

// 6. PASSPORT AUTHENTICATION
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 7. RES.LOCALS (Global variables for EJS)
app.use((req, res, next) => {
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

// 8. ROUTE HANDLERS
app.use("/listings", listingLimiter, listingRouter);
app.use("/listings/:id/reviews", reviewLimiter, reviewRouter);
app.use("/", authLimiter, userRouter);
app.get("/", (req, res) => {
    res.redirect("/listings");
});
// 9. ERROR HANDLING
// 404 catch-all middleware
app.use((req, res, next) => {
    next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
    let { statusCode = 500, message = "Something went wrong!" } = err;
    if (process.env.NODE_ENV !== "production") {
        console.error(err);
    }
    res.status(statusCode).render("error.ejs", { err: { statusCode, message } });
});

// 10. SERVER START
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});

