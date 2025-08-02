import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";


export async function addCartItem(req,res) {
    try{

        const userId = req.user.id;
        const { product,quantity} = req.body;

         if (!product || !quantity || quantity <= 0) {
         return res.status(400).json({ message: "Product and positive quantity are required" });
         }

         if (!mongoose.Types.ObjectId.isValid(product)) {

         return res.status(400).json({ message: "Invalid product ID format" });
    }

        //  Check if product ID is valid and exists
        const validProduct = await productModel.findById(product);
        if (!validProduct) {

        return res.status(404).json({ message: "Product not found" });
        }
        //find user's  cart
        let cart = await cartModel.findOne({user:userId});

        //create new cart if not found
        if(!cart)
        {
            cart = new cartModel({user:userId,items:[]});
        }

        //check if product already in cart
        const existingItem = cart.items.find(item=>item.product.toString()=== product);
        if(existingItem)
        {
            existingItem.quantity=existingItem.quantity+quantity;
        }
        else{
            cart.items.push({product,quantity});
        }
        //save updated cart
        await cart.save();
        const populatedCart = await cartModel.findOne({user:userId}).populate("items.product","name price description");

        return res.status(200).json({message:"Item added to cart",populatedCart});
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}

export async function updateCartItem(req,res) {
    try{
        const userId = req.user.id;
        const product = req.params.productId;
        const { quantity} = req.body;
        if(!product || typeof quantity !== "number"){
            return res.status(400).json({message:"Invalid inputs"})
        }

        //find user's cart
        const cart = await cartModel.findOne({user:userId});
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        //find item in the cart
        const itemIndex = cart.items.findIndex(item=>item.product.toString()===product);

        if(itemIndex === -1){
            return res.status(404).json({message:"Product not found in cart"});
        }
        //update quantity
        cart.items[itemIndex].quantity = quantity;
        //save updated cart
        await cart.save();
        return res.status(200).json({message:"Cart Updated",cart});
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}

export async function deleteCartItem(req,res) {
    try{
        const userId = req.user.id;
        const product = req.params.productId;

        if(!product)
        {
            return res.status(400).json({message:"Product id is required"});
        }
        //find user's cart
        const cart = await cartModel.findOne({user:userId});
        if(!cart){
            return res.status(404).json({message:"Cart not found"})
        }
        //check if product exists in the cart
        const itemIndex = cart.items.findIndex(item=>item.product.toString()===product);
        if(itemIndex === -1)
        {
            return res.status(404).json({message:"Product not found in cart"});
        }

        //remove the item from cart
        cart.items.splice(itemIndex,1);

        //save updated cart
        await cart.save();
        return res.status(200).json({message:"Item removed from the cart",cart});
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message});
    }
}