const express = require(`express`);
const { getAllcarts } = require("../controllers/carrito.controllers");
const route = express.Router();

route.get(`/`, getAllcarts);

module.exports = route;