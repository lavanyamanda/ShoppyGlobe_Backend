import express from "express";
import { fetchProducts, fetchProductById,addProduct} from "../controllers/product.controller.js";

const router = express.Router();

router.get("/",fetchProducts);
router.get("/:id",fetchProductById);
router.post("/",addProduct);

export default router;