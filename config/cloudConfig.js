const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Connects your code to your specific Cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

// Configures the storage settings
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: process.env.NODE_ENV === 'production' ? 'wanderlust_prod' : 'wanderlust_DEV',
        allowedFormats: ["png", "jpg", "jpeg"],
    },
});

module.exports = {
    cloudinary,
    storage,
};