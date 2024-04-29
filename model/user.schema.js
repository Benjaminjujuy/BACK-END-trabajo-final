const { Schema, model, Types } = require("mongoose");

const UsersSchema = new Schema({
    nombreUsuario:{
        type: String,
        require: true,
    },
    emailUsuario:{
        type: String,
        require: true,
        unique: true,
    },
    contrasenia:{
        type: String,
        require: true,
    },
    role:{
        type: String,
        default: "user",
    },
    idCarrito:{
        type: Types.ObjectId,
    },
    idFavoritos:{
        type: Types.ObjectId,
    },
});

UsersSchema.methods.toJSON = function(){
    const { contrasenia, ...user } = this.toObject()
    return user;
};

const UsersModel = model("users", UsersSchema);
module.exports = UsersModel;