const UsersModel = require("../model/user.schema");
const bcrypt = require(`bcryptjs`);
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const CartModel = require("../model/cart.Schema");
const FavModel = require("../model/fav.Schema");

const getUsers = async (req, res) => {
    try {
        const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }
        const getAllUsers = await UsersModel.find();
        res.status(200).json({ mensaje: "Usuarios", getAllUsers});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
};


const getOneUser = async(req, res) =>{
    try {
        const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }
        const getUser = await UsersModel.findOne({ _id: req.params.id });
        res.status(200).json({mensaje: `usuario encontrado`, getUser});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
}

const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }
       const { nombreUsuario, emailUsuario, contrasenia } = req.body; 
       const userExist = await UsersModel.findOne({ nombreUsuario });

       if (userExist) {
        res.status(400).json({ msg: "usuario ya existe en la base de datos" });
        return;
       }

       const newUser = new UsersModel(req.body);

       let salt = bcryptjs.genSaltSync(10);
       newUser.contrasenia = bcryptjs.hashSync(contrasenia, salt);

       const newCart  = new CartModel({idUsuario: newUser._id})
       const newFav  = new FavModel({idUsuario: newUser._id})

       newUser.idCarrito = newCart._id;
       newUser.idFavoritos = newFav._id;

       await newUser.save();
       await newCart.save();
       await newFav.save();
       
       res.status(201).json({ msg: "usuario creado correctamente"}, newUser );
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});  
    }
};

const updateUser = async (req, res) => {
    try {
        const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }
        const updateUser = await UsersModel.findByIdAndUpdate(
            { _id: req.params.id },
             req.body, 
             { new: true }
             );
        res.status(200).json({ mensaje:"Usuario actualizado", updateUser });
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
};

const deleteUser =  async (req, res) => {
    try {
        const errors = validationResult(req);

    if(!errors.isEmpty()){
    return res.status(422).json({msg: errors.array() });
    }
        const userExist = await UsersModel.findOne({ _id: req.params.id });

        if (!userExist) {
            res
            .status(400)
            .json({ msg: "ID incorrecto, usuario no existe en la base de datos" });
            return;
           }

       await UsersModel.findByIdAndDelete({_id:req.params.id});
       res.status(200).json({msg: "usuario eliminado"});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});
    }
};

const loginUser = async(req,res) =>{
    try {
       const { nombreUsuario, contrasenia } = req.body; 
       const userExist = await UsersModel.findOne({ nombreUsuario });

       if (!userExist) {
        res.status(400).json({ msg: "usuario y/o contraseña son incorrectos" });
        return;
       }
       
       const passCheck = await bcryptjs.compare(contrasenia, userExist.contrasenia);

       if(!passCheck){
        res.status(400).json({ msg: "usuario y/o contraseña son incorrectos" });
        return;
       }

       const payload = {
        idUsuario: userExist._id,
        idCarrito: userExist.idCarrito,
        idFavorito: userExist.idFavorito,
        role: userExist.role,
       };

       const token = jwt.sign(payload, process.env.SECRET_KEY);

        res.status(200).json({ msg: "logueado", token, role: userExist.role, idUsuario: userExist._id});
    } catch (error) {
        res.status(500).json({ mensaje: "server error", error});   
    }
}



module.exports = {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    loginUser,
};