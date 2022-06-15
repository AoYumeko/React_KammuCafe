import Customer from "../models/CustomerModel.js";

export const RegisterCustomer = async (req, res) => {
    try {
        const { nama } = req.body;
        await Customer.create({
            nama: nama
        })
        res.status(200).json({msg: "Register Pelanggan Sukses"});
    } catch (error) {
        console.log(error);
    }
}