const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

/**
 * Geocodes a text address to [longitude, latitude] using Nominatim (OpenStreetMap).
 * Returns { found: true, coordinates } if geocoded or API failed (fallback).
 * Returns { found: false } only if the address is empty/blank.
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

        if (response.status === 429) {
            // Rate-limited — use fallback so listing still gets created
            console.log("Nominatim rate-limited, using fallback coordinates");
            return { found: true, coordinates: FALLBACK_COORDS };
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                found: true,
                coordinates: [parseFloat(data[0].lon), parseFloat(data[0].lat)]
            };
        }
    } catch (err) {
        console.log("Geocoding API failed, using fallback:", err.message);
    }

    // API returned no results or errored — use fallback
    return { found: true, coordinates: FALLBACK_COORDS };
}

module.exports = { geocode, FALLBACK_COORDS };
