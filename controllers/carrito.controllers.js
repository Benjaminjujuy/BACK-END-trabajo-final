const CartModel = require("../model/cart.Schema");
const ProductModel = require("../model/product.schema");

const getAllcarts = async (req, res) => {
    try {
       const getCarts = await CartModel.find();
       res.status(200).json({msg: "carritos", getCarts});
    } catch (error) {
        console.log(error);
    }
};

const deleteOneProdCart = async(req, res) => {
    try {
        const sectionCart = await CartModel.findOne({_id: req.params.idCart});
        const product = await ProductModel.findOne({_id: req.params.idProd});

        const productosNoBorrados = sectionCart.productos.filter(
        (prod) =>prod._id.tooString() !== product._id.tooString());

        const productosABorrar = sectionCart.productos.filter(
        (prod) =>prod._id.tooString() === product._id.tooString());

        if(!productosABorrar.length){
        return res.status(400).json({msg: "ID incorrecto"});
        }

        sectionCart.productos = productosNoBorrados;

        await sectionCart.save();

        res.status(200).json({msg: "Producto eliminado correctamente del carrito"});

    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    getAllcarts,
    deleteOneProdCart,
};