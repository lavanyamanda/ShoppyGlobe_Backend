import express from "express";
import { addCartItem, updateCartItem,deleteCartItem} from "../controllers/cart.controller.js"
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/",verifyToken,addCartItem);
router.put("/:productId",verifyToken,updateCartItem);
router.delete("/:productId",verifyToken,deleteCartItem);

export default router;