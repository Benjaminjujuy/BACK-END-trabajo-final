const express = require(`express`)
const {
     getAllFavoritos, 
     deleteOneProdFav } 
     = require("../controllers/favoritos.controllers")
const router = express.Router()

router.get(`/`, getAllFavoritos);
router.delete(`/:idFav/:idProd`, deleteOneProdFav)

module.exports = router;