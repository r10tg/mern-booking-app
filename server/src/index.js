import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoutes from '../src/routes/users.js'
import authRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

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

app.get('/testing',(req,res)=>{
    res.send('testing ok')
})
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
})