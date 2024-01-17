import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import { check, validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import verifyToken from "../middleware/auth.js";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is Required").isEmail(),
    check("password", "Password is required").isLength({ min: 8 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors)
     return res.status(400).json({ message: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
       return res.status(404).json({ message: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(404).json({ message: "Invalid Credentials" });
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });
      return res.status(200).send({userId:user._id});
    } catch (error) {
      console.log(error)
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

router.get('/verify-token',verifyToken,(req,res)=>{
  res.status(200).send({userId:req.userId})
})

router.post('/logout',async(req,res)=>{
  res.cookie('auth_token',"",{
    expires: new Date(0)
  })
  res.send()
})

export default router;
