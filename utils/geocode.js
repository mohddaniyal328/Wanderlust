const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

/**
 * Geocodes a text address to [longitude, latitude] using Nominatim (OpenStreetMap).
 * Returns { found: true, coordinates } if geocoded.
 * Returns { found: true, coordinates, fallback: true } if API failed (rate-limit/error).
 * Returns { found: false } if address is empty OR location doesn't exist.
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

        // API rate-limited — use fallback so listing still gets created
        if (response.status === 429) {
            console.log("Nominatim rate-limited, using fallback coordinates");
            return { found: true, coordinates: FALLBACK_COORDS, fallback: true };
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                found: true,
                coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
            };
        }

        // API worked but returned no results — location doesn't exist
        return { found: false };

    } catch (err) {
        // Network error — use fallback
        console.log("Geocoding API failed, using fallback:", err.message);
        return { found: true, coordinates: FALLBACK_COORDS, fallback: true };
    }
}

module.exports = { geocode, FALLBACK_COORDS };
