import express from "express";
import {confirmOrder, deleteOrder, getOrderByName, getOrders, insertOrder } from "../controllers/OrderController.js";

const OrderRouter = express.Router();

OrderRouter.get("/:nama_pelanggan", getOrderByName);
OrderRouter.get("/", getOrders)
OrderRouter.post("/", insertOrder);
OrderRouter.put("/:_id", confirmOrder);
OrderRouter.delete("/:_id", deleteOrder);

export default OrderRouter;