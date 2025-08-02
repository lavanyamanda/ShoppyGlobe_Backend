import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/product.route.js";
import userRoutes from "./routes/user.route.js";
import cartRoutes from "./routes/cart.route.js";
import cors from "cors";

const app = express(); //instance of your application

app.use(express.json())
app.use(cors());

app.use('/api/products',productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/cart', cartRoutes)


//DB connection
mongoose.connect('mongodb+srv://lavanya95manda:wxZeto4Qd1uty3mY@cluster0.iwhfhll.mongodb.net/shoppyglobe')

.then(()=>
{
    console.log(`DB Connected`);
})
.catch((err)=>{
    console.log(`DB Failed to connect`,err);
})


app.get("/",(req,res)=>
{
    res.send("API is running")
})

app.use((req,res,next)=>
{
    return res.status(404).json({error:"Route not found"});
})

const PORT = 8080;
app.listen(PORT,()=>{
    console.log(`Server connected at port: ${PORT}`);
})