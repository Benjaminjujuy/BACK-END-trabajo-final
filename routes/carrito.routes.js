const express = require(`express`);
const { 
    getAllcarts, 
    deleteOneProdCart
 } = require("../controllers/carrito.controllers");
const auth = require("../middlewars/auth");
const router = express.Router();

router.get("/", auth(`user`), getAllcarts);
router.delete("/:idCart/:idProd", auth(`user`), deleteOneProdCart);

module.exports = router;