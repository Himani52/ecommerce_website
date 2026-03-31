const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET, // ✅ FIXED
});

const cloudinaryUploadImg = async (fileToUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      fileToUploads,
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.log("CLOUDINARY ERROR 👉", error); // ✅ debug
          return reject(error);
        }
        resolve({
          url: result.secure_url,
          asset_id: result.asset_id,
          public_id: result.public_id,
        });
      }
    );
  });
};

const cloudinaryDeleteImg = async (fileToDelete) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(
      fileToDelete,
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.log("Cloudinary delete error 👉", error);
          return resolve({}); // ✅ don't reject
        }
        resolve(result);
      }
    );
  });
};

module.exports = { cloudinaryUploadImg, cloudinaryDeleteImg };