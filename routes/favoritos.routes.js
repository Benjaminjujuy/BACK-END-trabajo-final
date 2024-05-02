const express = require(`express`)
const { getAllFavoritos } = require("../controllers/favoritos.controllers")
const route = express.Router()

route.get(`/`, getAllFavoritos);

module.exports = route;