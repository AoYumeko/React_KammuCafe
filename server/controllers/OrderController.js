import mongoose from "mongoose";
import Order from "../models/OrderModel.js";
import Cart from "../models/CartModel.js";

export const insertOrder = async (req, res) => {
    try {
        const { nama_pelanggan, no_meja, total_bayar } = req.body;
        const response = await Cart.find({
            nama_pelanggan: nama_pelanggan
        })

        if (!response) return res.status(404).json({ msg: "404" });

        await Order.create({
            tanggal_transaksi: Date(),
            total_bayar: total_bayar,
            no_meja: no_meja,
            pesanan: response
        })
        res.status(200).json({ msg: "Sukses Masuk Transaksi" });

        await Cart.deleteMany({
            nama_pelanggan: nama_pelanggan
        })

    } catch (error) {
        console.log(error);
    }
}

export const getOrders = async (req, res) => {
    try {
        const response = await Order.find();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getOrderByName = async (req, res) => {
    const { nama_pelanggan } = req.params;
    try {
        const response = await Order.find({
            'pesanan.nama_pelanggan': nama_pelanggan
        });
        return res.status(200).json(response);
    }
    catch(error){
        console.log(error.message);
    }
}

export const deleteOrder = async (req, res) => {
    try {
        const { _id } = req.params;
        await Order.findOneAndDelete({
            _id: _id
        })
    } catch (error) {
        console.log(error);
    }
}

export const confirmOrder = async (req, res) => {
    try {
        const id = mongoose.Types.ObjectId(req.params._id);
        console.log(id);
        await Order.updateOne({
            _id: id
        }, {
            tanggal_bayar: new Date(new Date().getTime() - (24*60*60*1000)),
            isBayar: req.body.isBayar

        }, (err) => {
            if (err) return json.status(400).json({ msg: err });
            res.status(200).json({ msg: "Berhasil diBayar" });
        }).clone();
    } catch (error) {
        console.log(error);
    }
}