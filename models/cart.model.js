import mongoose from "mongoose";

//schema creation
const cartSchema = new mongoose.Schema({
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    unique:true
   },
   items:[ { product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true
    },
    quantity:{
        type:Number,
        required:true,
        default:1
    }
}
   ]
},
{ timestamps: true });

//model creation
const cartModel = mongoose.model('Cart', cartSchema)
export default cartModel;