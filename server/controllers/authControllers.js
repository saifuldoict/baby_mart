import asyncHandler from "express-async-handler"
import User from "../models/userModel.js";

export const registerUser = asyncHandler(async(req,res)=>{
    const {name,email,password,role}= req.body;
  
   const user = await User.create({
    name,
    email,
    password,
    role,
    address: [],
   });

   if(user){
    res.status(201).json({
        _id: user._id,
        name:user.name,
        email:user.email,
        avatar: user.avatar,
        role: user.role,
        addresses: user.addresses,
    });
   } else{
    res.status(400);
    throw new Error("Invalid user data")
   }
})

export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // 1️⃣ Check email
    const user = await User.findOne({ email });

    if (!user) {
        res.status(401);
        throw new Error("Email not found");
    }

    // 2️⃣ Check password
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        res.status(401);
        throw new Error("Incorrect password");
    }

    // 3️⃣ Login success
    res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        role: user.role,
        addresses: user.addresses || [],
    });
});
