const CartModel = require("../model/cart.Schema")

const getAllcarts = async (req, res) => {
    try {
       const getCarts = await CartModel.find();
       res.status(200).json({msg: "carritos", getCarts});
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllcarts,
};