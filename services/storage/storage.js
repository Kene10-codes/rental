const cloudinary = require('cloudinary').v2
const path = require('path')
const { CloudinaryStorage } = require('multer-storage-cloudinary')

module.exports = function (image) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
        secure: true,
    })

    const storage = new CloudinaryStorage({
        cloudinary,
        params: {
            folder: path.join(__dirname, 'public'),
            allowedFormats: ['jpeg', 'png', 'jpg'],
        },
    })

    return storage
}
