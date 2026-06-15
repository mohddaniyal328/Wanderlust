const Listing = require("../models/listing");

const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

// In-memory cache to avoid repeated API calls for the same address
const geocodeCache = new Map();

async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return { found: false };
    }

    const normalized = address.trim().toLowerCase();

    // 1. Check in-memory cache first
    if (geocodeCache.has(normalized)) {
        return geocodeCache.get(normalized);
    }

    // 2. Check if any existing listing has this exact location
    const existing = await Listing.findOne({ location: new RegExp(`^${address.trim()}$`, "i") });
    if (existing && existing.geometry && existing.geometry.coordinates) {
        const result = { found: true, coordinates: existing.geometry.coordinates };
        geocodeCache.set(normalized, result);
        return result;
    }

    // 3. Hit the Nominatim API
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.trim())}&limit=1`,
            {
                headers: { "User-Agent": "Wanderlust_Student_Project" },
            }
        );

        if (response.status === 429) {
            console.log("Nominatim rate-limited, using fallback coordinates");
            const result = { found: true, coordinates: FALLBACK_COORDS, fallback: true };
            geocodeCache.set(normalized, result);
            return result;
        }

        const data = await response.json();

        if (data && data.length > 0) {
            const result = { found: true, coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)] };
            geocodeCache.set(normalized, result);
            return result;
        }

        return { found: false };

    } catch (err) {
        console.log("Geocoding API failed, using fallback:", err.message);
        const result = { found: true, coordinates: FALLBACK_COORDS, fallback: true };
        geocodeCache.set(normalized, result);
        return result;
    }
}

module.exports = { geocode, FALLBACK_COORDS };
