import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = 'SECRETKEY';

export async function register(req,res) {
    try{
        const {fullName,email,password} = req.body;

         if (!fullName || !email || !password) {
         return res.status(400).json({ message: "All fields are required" });
         }
        //checks if user already exists or not
        const existingUser = await userModel.findOne({email});
        if(existingUser)
        {
            return res.status(409).json({message:"User Already exists"})
        }
        const hashedPassword = await bcrypt.hashSync(password,10);
            const newUser = await userModel.create({
                fullName,email,password: hashedPassword
            })
            return res.status(201).json({message:"User created successfully",userId:newUser._id})
        }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}

export async function login(req,res) {
    try{
        const {email,password} = req.body;

        if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
        }
        
        //find user by email
        const user = await userModel.findOne({email});
        if(!user)
        {
            return res.status(404).json({message:"User doesn't exist"})
        }

        //verify password
        const validPassword = bcrypt.compareSync(password,user.password);
        if(!validPassword)
        {
            return res.status(403).json({message:"Wrong Credentials"})
        }

        //Generate JWT token
        const token = jwt.sign({id:user._id}, JWT_SECRET, {expiresIn:'1h'})
        return res.status(200).json({
            user:{
                fullName:user.fullName,
                email:user.email,
            },
            accessToken:token,
            message:"Logged in successfully"
        });
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}