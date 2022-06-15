import express from "express";
import { RegisterCustomer } from "../controllers/CustomerController.js";

const CustomerController = express.Router();

CustomerController.post("/", RegisterCustomer);

export default CustomerController;