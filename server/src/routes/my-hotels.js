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

    const imageURL = await uploadImages(imageFiles);

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

router.get('/',verifyToken,async (req,res)=>{
  try {
    const hotels = await Hotel.find({userId:req.userId});
    res.json(hotels)
  } catch (error) {
    res.status(500).json({message:'Error fetching hotels'})
  }
})

router.get('/:id',verifyToken,async(req,res)=>{
  const hotelId = req.params.id
  try {
    const hotel = await Hotel.findOne({_id:hotelId,userId:req.userId})
    res.json({hotel})
  } catch (e) {
    res.status(500).json({message:'Error fetcing hotel'})
  }
})

router.put('/:hotelId',verifyToken,upload.array('imageFiles'),async(req,res)=>{
  try {
    const updatedHotel = req.body;
    updatedHotel.lastUpdated = new Date();
    const hotel = await Hotel.findOneAndUpdate({
      _id:req.params.hotelId,
      userId:req.userId
    },updatedHotel,{new:true})

    if(!hotel){
     return res.status(404).json({message:'Hotel not found'})
    }

    const files = req.files

    const updatedImageUrls = await uploadImages(files)

    hotel.imageUrls = [...updatedImageUrls,...(updatedHotel.imageUrls||[])]

    await hotel.save();

    res.status(201).json(hotel)

  } catch (error) {
    console.log(error)
    res.status(500).json({message:'Something went wrong!'})
  }
})

async function uploadImages(imageFiles) {
  const urlPromises = imageFiles.map(async (image) => {
    const b64 = image.buffer.toString("base64"); //converting image to base 64 format
    const dataURI = "data:" + image.mimetype + ";base64," + b64; // adding suffix to the data uri that is adding format to the stirng
    const cloudRes = await cloudinary.v2.uploader.upload(dataURI); // uploading the uri to cloudinary
    return cloudRes.url; // returning the url from cloudinary
  });
  
  const imageURL = await Promise.all(urlPromises);
  return imageURL;
}


export default router;