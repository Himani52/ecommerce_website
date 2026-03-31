const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");
const uploadImages = asyncHandler(async (req, res) => {
  try {
    console.log("FILES 👉", req.files);
    const uploader = (path) => cloudinaryUploadImg(path);
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      console.log(newpath);
      urls.push({
  url: newpath.url,
  public_id: newpath.public_id,
});
      fs.unlinkSync(path);
    }
   res.json(urls);
  } catch (error) {
  console.log("UPLOAD ERROR 👉", error);
  res.status(500).json({ error: error.message });
}
});
const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    await cloudinaryDeleteImg(id); // ✅ add await
    res.json({ message: "Deleted" });
  } catch (error) {
    console.log("DELETE ERROR 👉", error); // ✅ handle error
    res.status(200).json({ message: "Already deleted or ignored" });
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
