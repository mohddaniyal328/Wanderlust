const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

const geocodeCache = new Map();

async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return { found: false };
    }

    const normalized = address.trim().toLowerCase();

    if (geocodeCache.has(normalized)) {
        return geocodeCache.get(normalized);
    }

    try {
        const response = await fetch(
            `https://photon.komoot.io/api/?q=${encodeURIComponent(address.trim())}&limit=1`,
        );

        if (response.status === 429) {
            console.log("Photon rate-limited, using fallback coordinates");
            const result = { found: true, coordinates: FALLBACK_COORDS, fallback: true };
            geocodeCache.set(normalized, result);
            return result;
        }

        const data = await response.json();

        if (data && data.features && data.features.length > 0) {
            const coords = data.features[0].geometry.coordinates; // [longitude, latitude]
            const result = { found: true, coordinates: coords };
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
