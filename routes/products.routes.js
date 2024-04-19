const express = require("express");
const route = express.Router();
const { check } = require("express-validator")
const { 
    getProducts, 
    createProduct, 
    updateProduct,
    deleteProduct,
    getOneProduct
} = require("../controllers/products.controllers");
const multer = require("../middlewars/multer");

route.get("/", getProducts);
route.get("/:id",[check(`id`, `Formato incorrecto`).isMongoId()],getOneProduct);
route.post( "/", multer.single("imagen"),
   [
    check(`Titulo`, `Campo vacio`).notEmpty(),
    check(`Precio`, `Campo vacio`).notEmpty(),
    check(`Codigo`, `Campo vacio`).notEmpty(),
   ], 
createProduct
);
route.put("/:id",[check(`id`, `Formato incorrecto`).isMongoId()], updateProduct);
route.delete("/:id",[check(`id`, `Formato incorrecto`).isMongoId()], deleteProduct);

module.exports = route;