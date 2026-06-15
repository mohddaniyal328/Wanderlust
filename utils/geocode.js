const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

/**
 * Geocodes a text address to [longitude, latitude] using Nominatim (OpenStreetMap).
 * Returns Jaipur coordinates as fallback if the address is invalid or the API fails.
 */
async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return FALLBACK_COORDS;
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
            return [parseFloat(data[0].lon), parseFloat(data[0].lat)];
        }
    } catch (err) {
        console.log("Geocoding failed, using default coordinates:", err.message);
    }

    return FALLBACK_COORDS;
}

module.exports = { geocode, FALLBACK_COORDS };
