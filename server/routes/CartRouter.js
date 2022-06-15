import express from "express";
import { deleteCart, getCart, getCartProductById, insertCart, updateCart } from "../controllers/CartController.js";
import { getProductById } from "../controllers/ProductController.js";

const CartRouter = express.Router();

CartRouter.post("/", insertCart);
CartRouter.get("/:produkId", getCartProductById);
CartRouter.put("/:id", updateCart);
CartRouter.get("/", getCart);
CartRouter.delete("/:namaCus", deleteCart);

export default CartRouter;