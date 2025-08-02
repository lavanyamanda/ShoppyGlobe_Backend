import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

const JWT_SECRET = 'SECRETKEY'; 

//middleware to verify token


export  function verifyToken(req,res,next)
{
    if(
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(' ')[0]==="JWT"
    )
    {
        jwt.verify(
            req.headers.authorization.split(' ')[1],
            JWT_SECRET, 
            async function (err,verifyToken) {
                if(err)
                {
                    return res.status(403).json({message:"Invaid JWT token"})
                }
                const user = await userModel.findById(verifyToken.id)
                if (!user) {
                 return res.status(401).json({ message: "User not found" });
                 }
                req.user=user;
                next();
                
            }
        )
    }
    else{
        return res.status(401).json({message:"Token Not found"})
    }
}