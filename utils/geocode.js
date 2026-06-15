const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

/**
 * Geocodes a text address to [longitude, latitude] using Nominatim (OpenStreetMap).
 * Returns { found: true, coordinates } if valid, { found: false } if not found.
 */
async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return { found: false };
    }

    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address.trim())}&limit=1`,
            {
                headers: { "User-Agent": "Wanderlust_Student_Project" },
            }
        );
        const data = await response.json();

        if (data && data.length > 0) {
            return {
                found: true,
                coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
            };
        }
    } catch (err) {
        console.log("Geocoding failed:", err.message);
    }

    return { found: false };
}

module.exports = { geocode, FALLBACK_COORDS };
