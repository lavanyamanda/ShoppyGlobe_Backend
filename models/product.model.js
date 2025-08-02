import mongoose from "mongoose";

//schema creation
const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },
    description:{
        type: String,
    },
    stockQuantity:{
        type: Number,
       default:0
    },
},
{ timestamps: true });

//model creation
const productModel = mongoose.model('Product', productSchema);
export default productModel;