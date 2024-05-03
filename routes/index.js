const express = require("express")
const router = express.Router()

const productRoutes = require("./products.routes")

router.use(`/products`)
router.use(`/users`)
router.use(`/favs`)
router.use(`/carts`)