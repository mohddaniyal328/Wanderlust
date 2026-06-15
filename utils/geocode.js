const FALLBACK_COORDS = [75.7873, 26.9124]; // Jaipur

let geocoder = null;
function getGeocoder() {
    if (!geocoder && process.env.MAPBOX_TOKEN) {
        const mapboxClient = require("@mapbox/mapbox-sdk/services/geocoding");
        geocoder = mapboxClient({ accessToken: process.env.MAPBOX_TOKEN });
    }
    return geocoder;
}

const geocodeCache = new Map();

async function geocode(address) {
    if (!address || typeof address !== "string" || address.trim() === "") {
        return { found: false };
    }

    const normalized = address.trim().toLowerCase();

    if (geocodeCache.has(normalized)) {
        return geocodeCache.get(normalized);
    }

    const client = getGeocoder();
    if (!client) {
        console.log("MAPBOX_TOKEN not set, using fallback coordinates");
        const result = { found: true, coordinates: FALLBACK_COORDS, fallback: true };
        geocodeCache.set(normalized, result);
        return result;
    }

    try {
        const response = await client
            .forwardGeocode({
                query: address.trim(),
                limit: 1,
            })
            .send();

        const features = response.body.features;

        if (features && features.length > 0) {
            const result = {
                found: true,
                coordinates: features[0].center // [longitude, latitude]
            };
            geocodeCache.set(normalized, result);
            return result;
        }

        return { found: false };

    } catch (err) {
        console.log("Mapbox geocoding failed, using fallback:", err.message);
        const result = { found: true, coordinates: FALLBACK_COORDS, fallback: true };
        geocodeCache.set(normalized, result);
        return result;
    }
}

module.exports = { geocode, FALLBACK_COORDS };
