import { getUsers, Login, Logout, Register } from "../controllers/UserController.js";
import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { getOrders } from "../controllers/OrderController.js";

const UserRouter = express.Router();

UserRouter.get("/", verifyToken, getOrders);
UserRouter.post("/register", Register);
UserRouter.post("/login",Login);
UserRouter.get("/token", refreshToken);
UserRouter.delete("/logout", Logout);


export default UserRouter;