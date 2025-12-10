import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const UsuarioEsquema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

UsuarioEsquema.methods.encriptarPassowrd = async (password) => {

    try {
        const salt = await bcrypt.genSalt(10)
        const passwordEncriptada = await bcrypt.hash(password, salt)
        return passwordEncriptada
    } catch (error) {
        throw error
    }
}


const UsuarioModelo = mongoose.model('usuarios', UsuarioEsquema)


const getUserByEmail = async (correo) => {

    try {
        const usuario = await UsuarioModelo.findOne( { correo })
        return usuario
    } catch (error) {
        throw error
    }

}

const createUser = async (nuevoUsuario) => {

    try {
        
        const usuarioPorCrear = new UsuarioModelo(nuevoUsuario)
        // Tenemos que llamar al método del esquema
        usuarioPorCrear.password = await usuarioPorCrear.encriptarPassowrd(usuarioPorCrear.password)
        const usuarioCreado = await usuarioPorCrear.save()
        return usuarioCreado
    } catch (error) {
        throw error
    }

}

export default {
    getUserByEmail,
    createUser
}