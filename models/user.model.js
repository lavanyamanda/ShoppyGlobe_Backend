import mongoose from "mongoose";

//schema creation
const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},
{ timestamps: true });

//model creation
const userModel = mongoose.model('User',userSchema)
export default userModel;
