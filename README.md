<div align="center">

# 🏡 WanderLust

**An Airbnb-inspired full-stack rental platform where users can discover, list, and review unique properties around the world.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Visit-brightgreen?style=for-the-badge)](https://wanderlust-2-aeji.onrender.com)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

</div>

---

## 📸 Screenshots

| Home Page | Listing Detail | Reviews |
|-----------|---------------|---------|
| ![Home](screenshots/home.png) | ![Detail](screenshots/detail.png) | ![Reviews](screenshots/reviews.png) |

| Search & Filter | Map Integration | Mobile View |
|----------------|----------------|-------------|
| ![Search](screenshots/search.png) | ![Map](screenshots/map.png) | ![Mobile](screenshots/mobile.png) |

---

## 🚀 Live Demo

**👉 [https://wanderlust-2-aeji.onrender.com](https://wanderlust-2-aeji.onrender.com)**

### Test Accounts
| Username | Password |
|----------|----------|
| `demo` | *(provided separately)* |
| `demo2` | *(provided separately)* |
| `demo3` | *(provided separately)* |

---

## ✨ Features

- **Listings** — Browse 12+ unique properties with images, pricing, and locations
- **Create & Manage** — Add your own listings with image uploads (Cloudinary)
- **Search & Filter** — Search by title/location/country, filter by category and price range
- **Interactive Maps** — Leaflet.js + OpenStreetMap with geocoded locations
- **Reviews & Ratings** — Star-based rating system with rating breakdown
- **Authentication** — Secure signup/login with Passport.js
- **Authorization** — Only owners can edit/delete their own listings
- **Responsive Design** — Optimized for phones (576px), tablets (768px), and desktops with 3-tier media queries
- **Flash Messages** — Real-time feedback for user actions
- **Session Persistence** — MongoDB-backed sessions with secure cookies

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Runtime** | Node.js |
| **Framework** | Express.js 5 |
| **Database** | MongoDB Atlas (Mongoose ODM) |
| **Authentication** | Passport.js + passport-local-mongoose |
| **File Uploads** | Multer + Cloudinary |
| **Maps** | Leaflet.js + OpenStreetMap + Photon Geocoding |
| **Templating** | EJS + ejs-mate |
| **Frontend** | Bootstrap 5, Font Awesome, Custom CSS |
| **Session Store** | connect-mongo (MongoDB-backed) |
| **Validation** | Joi |
| **Deployment** | Render |

---

## 📁 Project Structure

```
WanderLust/
├── app.js                  # Express server setup
├── package.json            # Dependencies & scripts
├── schema.js               # Joi validation schemas
├── middleware.js            # Auth & validation middleware
├── config/
│   └── cloudConfig.js      # Cloudinary + Multer config
├── models/
│   ├── listing.js           # Listing schema
│   ├── review.js            # Review schema
│   └── user.js              # User schema
├── routes/
│   ├── listing.js           # Listing CRUD routes
│   ├── review.js            # Review routes
│   └── user.js              # Auth routes
├── controllers/
│   ├── listings.js          # Listing logic
│   ├── reviews.js           # Review logic
│   └── users.js             # Auth logic
├── views/                   # EJS templates
├── public/                  # Static assets (CSS, JS)
├── init/                    # Database seeders
├── utils/                   # Geocoding & error handling utilities
│   ├── geocode.js           # Nominatim geocoding with fallback
│   ├── ExpressError.js      # Custom error class
│   └── wrapAsync.js         # Async error wrapper
```

---

## 🏃‍♂️ Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/Wanderlust.git
cd Wanderlust

# Install dependencies
npm install

# Create .env file with your credentials
# (see .env.example below)

# Seed the database
node init/seed.js
node init/seedReviews.js

# Start the server
npm start
```

### Environment Variables (.env)
```
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
SECRET=your_session_secret
DB_URL=your_mongodb_atlas_connection_string
```

---

## 📚 What I Learned

- **Full-stack development** — Built a complete MVC application from scratch
- **RESTful API design** — Proper HTTP methods and route structure
- **Database modeling** — Mongoose schemas with relationships (Listings → Reviews → Users)
- **Authentication & Authorization** — Passport.js local strategy with middleware protection
- **Cloud services** — Cloudinary for file storage, MongoDB Atlas for database
- **Geocoding** — Integrating OpenStreetMap Nominatim API for location data
- **Production deployment** — Environment variables, session security, reverse proxy config
- **Error handling** — Custom error classes, async error wrapping, flash messages

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

---

<div align="center">

**Built with ❤️**

</div>
