import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from '../src/routes/users.js'
import authRoutes from './routes/auth.js'
import myHotelRoutes from '../src/routes/my-hotels.js'
import cookieParser from 'cookie-parser'
import {v2 as cloudinary} from 'cloudinary'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const port = 8000

const app = express();
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials:true
}));

app.use('/api/auth',authRoutes)
app.use('/api/users',userRoutes)
app.use('/api/my-hotels',myHotelRoutes)

app.get('/testing',(req,res)=>{
    res.send('testing ok')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})