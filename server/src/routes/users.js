import express from "express";
import jwt from 'jsonwebtoken';
import User from "../models/user.js";
import {check,validationResult} from 'express-validator'

const router = express.Router()


// /api/users/register
router.post('/register',[
    check('firstName',"First Name is required").isString(),
    check('lastName',"Last Name is required").isString(),
    check('email',"Email is required").isEmail(),
    check('password',"Password must be of min 8 character with 1 upper case 1 lower case 1 number and 1 special character").isStrongPassword(),
],async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
       return res.status(400).json({message:errors.array()})
    }
    try {
        let user = await User.findOne({email:req.body.mail})
        if(user){
            return res.status(400).json({message:"User already exsist"})
        }
        user = new User(req.body)
        await user.save()

        const token = jwt.sign({userId:user._id},process.env.JWT_SECRET_KEY,{expiresIn:"1d"})
        res.cookie('auth_token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV==='production',
            maxAge: 24*60*60*1000
        })
        return res.sendStatus(200)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Something went wrong"})
    }
})

export default router;