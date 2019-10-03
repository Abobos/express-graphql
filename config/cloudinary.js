import cloudinary from 'cloudinary';
import URL from 'url';
import dotenv from 'dotenv';

dotenv.config();
const cloudinaryUrl = URL.parse(process.env.CLOUDINARY_URL);

cloudinary.config({
  cloud_name: cloudinaryUrl.host,
  api_key: cloudinaryUrl.auth.split(':')[0],
  api_secret: cloudinaryUrl.auth.split(':')[1],
});

export default cloudinary;
