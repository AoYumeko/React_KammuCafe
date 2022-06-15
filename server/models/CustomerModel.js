import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CustomerModel = new Schema({
    nama: { type: String, required: true },
});

export default mongoose.model("Customers", CustomerModel);