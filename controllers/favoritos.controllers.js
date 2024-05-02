const FavModel = require("../model/fav.Schema")

const getAllFavoritos = async(req, res) => {
    try {
    const getFavs = await FavModel.find();
    res.status(200).json({ mg:"Favoritos", getFavs });
    } catch (error) {
    console.log(error);
    }
};

module.exports = {
    getAllFavoritos,
};
