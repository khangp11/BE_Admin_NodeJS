require('dotenv').config();
const cloudinary = require('cloudinary').v2;
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const STATIC_URL = "http://localhost:5173/"
const cloudinaryService = {
    uploadFile: (imagefile, user_id, company_id) => {
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload(
                imagefile.path,
                { folder: 'uploads', allowed_formats: ['jpg', 'png', 'jpeg'] },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        const url = `${STATIC_URL}/files/${company_id}/${user_id}/${year}/${month}/${day}`;
                        console.log(url);
                        resolve(result.secure_url);
                    }
                }
            );
        });
    },
};
module.exports = cloudinaryService;



