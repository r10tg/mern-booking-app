import express from "express";
import Hotel from "../models/hotels.js";
import multer from "multer";
import cloudinary from "cloudinary";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5mb
  },
});

router.post("/",verifyToken ,upload.array("imageFiles", 6), async (req, res) => {
  try {
    const imageFiles = req.files;
    const newHotel = req.body;


    // upload images to cloudinary

    const urlPromises = imageFiles.map(async (image) => {
      const b64 = image.buffer.toString("base64"); //converting image to base 64 format
      const dataURI = "data:" + image.mimetype + ";base64," + b64; // adding suffix to the data uri that is adding format to the stirng
      const cloudRes = await cloudinary.v2.uploader.upload(dataURI); // uploading the uri to cloudinary
      return cloudRes.url; // returning the url from cloudinary
    });

    const imageURL = await Promise.all(urlPromises);

    newHotel.imageUrls = imageURL;
    newHotel.lastUpdated = new Date();
    newHotel.userId = req.userId;


    const hotel = new Hotel(newHotel);
    await hotel.save()

    res.status(201).send(hotel)

  } catch (error) {
    console.log('error creating hotel: ',error);
    res.status(500).json({message:'Something went wrong'})
  }
});

export default router;
