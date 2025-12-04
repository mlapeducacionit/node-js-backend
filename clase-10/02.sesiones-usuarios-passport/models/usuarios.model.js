import mongoose from "mongoose";
import bcrypt from 'bcrypt'

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

// Esquemas tienen metodos.

UsuarioEsquema.methods.encriptarPassword = async (password) => {
    // Tenemos diferentes tipos de algoritmos de hasheo (encriptación)
    // Simple vía -> Una vez hasheado, no se puede recuperar el valor original -> 123456 -> Nunca más voy a ver ese valor -> (bcrypt)
    // Doble vía -> Un vez hasheado, puedo deshashar y recuperar el valor original.

    try {
        const salt = await bcrypt.genSalt(10) // Semilla ( SaltRound -> Factor de Coste) A Mayor valor, más tiempo y costo de procesamiento para generar la semilla
        const passwordEncriptado = await bcrypt.hash(password , salt)
        return passwordEncriptado
    } catch (error) {
        throw error
    }
}

UsuarioEsquema.methods.comprobarPassword = async function(password) {

}

const UsuarioModelo = mongoose.model('usuarios', UsuarioEsquema)




/* Método de acceso a la DB */

const getUserByEmail = async (correo) => {

    try {
        const usuario = await UsuarioModelo.findOne( { correo} )
        return usuario
    } catch (error) {
        throw error
    }

}

const getUserById = () => {

}

const createUser = async (objUsuario) => {

    try {
        const usuarioPorCrear = new UsuarioModelo(objUsuario) // password sin encriptar
        usuarioPorCrear.password = await usuarioPorCrear.encriptarPassword(usuarioPorCrear.password)
        const usuarioCreado = await usuarioPorCrear.save()
        return usuarioCreado        
    } catch (error) {
        throw error
    }

}

const chequearPassword = () => {

}

export default {
    getUserByEmail,
    getUserById,
    createUser,
    chequearPassword
}