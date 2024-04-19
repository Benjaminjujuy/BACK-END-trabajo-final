const resultValidator = require("../helpers/validatorResult");
const ProductModel = require (`../model/product.schema`);
const { validationResult } = require("express-validator");
const cloudinary = require("../helpers/cloudinary");

const getProducts = async (req, res) => {
    try {
        resultValidator(req);

        const getAllproducts = await ProductModel.find();
        res.status(200).json({msg: `Productos encontrados`, getAllproducts});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
};

const getOneProduct = async (req, res) => {
    try {
        const result = resultValidator(req);

        if(!errors.isEmpty()){
            return res.status(422).json({msg: result.array() });
          }

        const getProduct = await ProductModel.findOne({ _id: req.params.id });
        res.status(200).json({msg: `Producto encontrado`, getProduct });
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
};

const createProduct = async (req, res) => {
try {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }

    const { titulo, precio, codigo } = req.body

    if(!titulo || !precio || !codigo){
        res.status(500).json({ mensaje: "Algun campo esta vacio" });
        return;
    }

    const result = await cloudinary.uploader.upload(req.file.path)
    const newProduct = new ProductModel({
        ...req.body,
         imagen: result.secure_url
        });
    await newProduct.save();
    res
       .status(201)
       .json({mensaje: `El producto se creo correctamente`, newProduct});
} catch (error) {
    res.status(500).json({ mensaje: "server error", error});
}
};

const updateProduct = async (req, res) => {
   try {
    console.log(req.params.id);
    console.log(reg.body);
    const updateProduct = await ProductModel.findByIdAndUpdate(
        {_id: req.params.id},
         req.body,
         { new: true}
         );
    res.status(200).json({ msg: `Producto actualizado`, updateProduct});
   } catch (error) {
    res.status(500).json({ mensaje: "server error", error});
   }
};

const deleteProduct = async(req, res) => {
    try { 
    await ProductModel.findByIdAndDelete({_id: req.params.id})
    res.status(200).json({ msg: `Producto eliminado correctamente`});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});   
    }
};

module.exports = {
    getProducts,
    getOneProduct,
    createProduct,
    updateProduct,
    deleteProduct
};