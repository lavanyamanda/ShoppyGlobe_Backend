import productModel from "../models/product.model.js";
import mongoose from "mongoose";

export async function fetchProducts(req,res) {
    try{
        const products = await productModel.find();
        return res.status(200).json(products);
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message})
    }
}

export async function fetchProductById(req,res) {
    try{
        const {id} = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid product ID format" });
        }
        const product = await productModel.findById(id);
        if(!product)
        {
            return res.status(404).json({message:"Product not found"});
        }
        return res.status(200).json(product);
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error", error:err.message})
    }
}

export async function addProduct(req,res){
    try{
        const { name, price,description, stockQuantity } = req.body;
        
        const newProduct = await productModel.create({
            name,
            price,
            description,
            stockQuantity
        });
        res.status(201).json({message:"Product added successfully",product:newProduct})
    }
    catch(err)
    {
        return res.status(500).json({message:"Server Error",error:err.message})
    }
}
