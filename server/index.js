import "dotenv/config";
import express from "express";
import cors from "cors";
import FileUpload from "express-fileupload";
import db from "./configs/Database.js";
import ProductRouter from "./routes/ProductRouter.js";
import CategoryRouter from "./routes/CategoryRouter.js";
import UserRouter from "./routes/UserRouter.js";
import cookieParser from "cookie-parser";
import CartRouter from "./routes/CartRouter.js";
import OrderRouter from "./routes/OrderRoute.js";
import CustomerController from "./routes/CustomerRouter.js";

const app = express();
const PORT = process.env.PORT;
const origin = process.env.ORIGIN;

// Database Connection
db.once("open", () => console.log("Database Successfully Connect"));

// Middleware
app.use(cors({ credentials: true, origin: "http://34.128.125.148" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(FileUpload());
app.use(cookieParser());

//Router
app.use("/user", UserRouter);
app.use("/customer", CustomerController)
app.use("/categories", CategoryRouter);
app.use("/products", ProductRouter);
app.use("/cart", CartRouter);
app.use("/orders", OrderRouter);

//Port
app.listen(PORT, () => console.log(`Server is Up and Listening on PORT ${PORT}`));
