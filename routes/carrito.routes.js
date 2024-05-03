const express = require(`express`);
const { 
    getAllcarts, 
    deleteOneProdCart
 } = require("../controllers/carrito.controllers");
const router = express.Router();

router.get(`/`, getAllcarts);
router.delete(`/:idCart/:idProd`, deleteOneProdCart)

module.exports = router;