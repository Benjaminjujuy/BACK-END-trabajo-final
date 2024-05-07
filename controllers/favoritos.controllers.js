const FavModel = require("../model/fav.Schema");
const ProductModel = require("../model/product.schema");

const getAllFavoritos = async(req, res) => {
    try {
    const getFavs = await FavModel.findOne({_id: req.idFavortio});
    res.status(200).json({ mg:"Favoritos", getFavs });
    } catch (error) {
    console.log(error);
    }
};

const deleteOneProdFav = async(req, res) => {
    try {
        const sectionFav = await FavModel.findOne({_id: req.idFavorito});
        const product = await ProductModel.findOne({_id: req.params.idProd});

        const productosNoBorrados = sectionFav.favoritos.filter(
        (fav) =>fav._id.tooString() !== product._id.tooString());

        const productosABorrar = sectionFav.favoritos.filter(
        (fav) =>fav._id.tooString() === product._id.tooString());

        if(!productosABorrar.length){
        return res.status(400).json({msg: "ID incorrecto"});
        }

        sectionFav.favoritos = productosNoBorrados;

        await sectionFav.save();

        res.status(200).json({msg: "Producto eliminado correctamente de favoritos"});

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    getAllFavoritos,
    deleteOneProdFav,
};
