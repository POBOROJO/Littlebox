import User from "../models/User.js";
import jwt from "jsonwebtoken";

export const Register = async(req,res)=>{
    try{
        const {name,username, password} = req.body;

        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({
                message: "User already registered !",
                success: false
            })
        }

        const newUser= new User({
            name,
            username,
            password
        })
        await newUser.save();

        res.status(201).json({
            success:true,
            message:"User created successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

export const Login = async(req,res)=>{
    try{
        const {username, password} = req.body;
        // console.log(username, password);
        const user = await User.findOne({username});
        // console.log(user);
        if(!user){
            return res.status(401).json({
                message: "User not found !",
                success: false
            })
        }

        if(user.password !== password){
            return res.status(401).json({
                message: "Incorrect password. Please try again.",
                success: false
            })
        }

        const token = jwt.sign({userId: user._id, username :user.username}, process.env.JWT_SECRET, {expiresIn: "1h"});

        res.status(200).json({
            message: "Login successful !",
            token: token
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}