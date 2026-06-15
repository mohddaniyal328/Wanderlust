const listingDataElement = document.getElementById('listing-data');
const listing = listingDataElement ? JSON.parse(decodeURIComponent(listingDataElement.getAttribute('data-listing'))) : null;

// Ensure 'listing' exists before running to prevent crashes
if (listing !== null) {
    let lat = 26.9124; 
    let lng = 75.7873;

    if (listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2) {
        lng = listing.geometry.coordinates[0];
        lat = listing.geometry.coordinates[1];
    }

    const map = L.map('map').setView([lat, lng], 12);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    const airbnbIcon = L.divIcon({
        html: '<i class="fa-solid fa-house-chimney" style="color: #fe424d; font-size: 24px; text-shadow: 0 0 3px white;"></i>',
        className: 'airbnb-marker', 
        iconSize: [30, 30],
        iconAnchor: [15, 30], 
        popupAnchor: [0, -30] 
    });

    L.marker([lat, lng], { icon: airbnbIcon }).addTo(map)
        .bindPopup(`
            <div style="width: 150px; text-align: center;">
                <img src="${listing.image.url}" style="width: 100%; border-radius: 5px; height: 80px; object-fit: cover; margin-bottom: 5px;">
                <h6 style="margin: 0; font-weight: bold;">${listing.title}</h6>
                <p style="margin: 2px 0; font-size: 12px; color: #555;">${listing.location}</p>
                <p style="margin: 0; font-weight: bold; color: #fe424d;">₹${listing.price.toLocaleString("en-IN")} / night</p>
                <p style="margin: 4px 0 0; font-size: 11px; color: #888;">+ 18% GST = ₹${Math.round(listing.price * 1.18).toLocaleString("en-IN")}</p>
            </div>
        `)
        .openPopup();
}