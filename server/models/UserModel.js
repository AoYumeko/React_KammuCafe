import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserModel = new Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    refresh_token: { type: String }
});

export default mongoose.model("Users", UserModel);