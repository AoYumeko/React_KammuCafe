import mongoose from "mongoose";
import Cart from "../models/CartModel.js";

export const insertCart = async (req, res) => {
    try {
        const { nama_pelanggan, jumlah, produk, total_harga } = req.body;
        await console.log(no_meja);
        await Cart.create({
            nama_pelanggan: nama_pelanggan,
            jumlah: jumlah,
            produk: produk,
            total_harga: total_harga,
        })
        res.status(200).json({ msg: "Sukses Masuk Keranjang" });
    } catch (error) {
        console.log(error);
    }
}


export const getCartProductById = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params.produkId)
        const response = await Cart.find({
            'produk._id': id
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

export const updateCart = async (req, res) => {
    try {
        const { nama_pelanggan, jumlah, produk, total_harga } = req.body;
        const id = mongoose.Types.ObjectId(req.params.id)
        const response = await Cart.updateOne({
            _id: id
        }, {
            nama_pelanggan: nama_pelanggan,
            jumlah: parseInt(jumlah),
            produk: produk,
            total_harga: parseInt(total_harga),
        }, 
        (err, result) => {
            if(err) res.status(500).json({msg: err.message});
            res.status(200).json("Hore Berhasil Diedit")
        }).clone()
    }
    catch (error) {
        console.log(error.message);
    }
}

export const getCart = async (req, res) => {
    try {
        const {nama_pelanggan} = req.query;
        const response = await Cart.find({
            "nama_pelanggan": nama_pelanggan
        })
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
    }
}

export const deleteCart = async (req, res) => {
    try{
        const response = await Cart.deleteMany({
            nama_pelanggan: req.params.namaCus
        })
        console.log(response);
    }
    catch(error){
        console.log(error.message);
    }
}