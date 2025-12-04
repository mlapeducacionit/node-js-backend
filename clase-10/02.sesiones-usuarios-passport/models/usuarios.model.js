import mongoose from "mongoose";

const UsuarioEsquema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true
        },
        correo: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    }, 
    {
        timestamps: true,
        versionKey: false
    }
)

const UsuarioModelo = mongoose.model('usuarios', UsuarioEsquema)

/* Método de acceso a la DB */

const getUserByEmail = () => {

}

const getUserById = () => {

}

const createuser = () => {

}

const chequearPassword = () => {

}

export default {
    getUserByEmail,
    getUserById,
    createuser,
    chequearPassword
}