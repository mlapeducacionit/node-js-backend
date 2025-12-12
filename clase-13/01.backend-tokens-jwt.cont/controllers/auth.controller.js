import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import logger from '../configs/logger.js'
import models from '../models/usuarios.model.js'
import passport from 'passport'
import jwt from 'jsonwebtoken'


const __filename = fileURLToPath(import.meta.url) // La ruta absoluta que incluye el nombre del archivo
const __dirname = path.dirname(__filename) // La ruta absoluta al proyecto de node.
//console.log(__filename)
//console.log(__dirname)

const obtenerPagina = async (view, data = {}) => {
  const rutaALaPagina = path.join(__dirname, '..', 'views', 'pages', view + '.ejs')
  console.log(rutaALaPagina)
  return ejs.renderFile(rutaALaPagina, data) // Devolverme la plantilla ya renderizada
}
const mostrarFormuLogin =  async (req, res) => {
    const body = await obtenerPagina('formu-login')
    res.render('layout', { titulo: 'Formulario de Autenticación', body })
}

const mostrarFormuRegister = async (req, res) => {
    const body = await obtenerPagina('formu-register')
    res.render('layout', { titulo: 'Formulario de Registro', body })
}
const procesarDataFormuLogin = async (req, res) => {

    try {
        const { correo, password } = req.body
        const usuario = await models.getUserByEmail(correo)

        const esCorrecto = await models.chequearPasword(usuario, password)

        if ( !usuario || !esCorrecto) {
            return res.status(200).json({ mensaje: 'Credenciales inválidas' })
        }

        console.log('OK')

        // ! FIRMAR EL TOKEN (GENERAR TOKEN)
        const payload = { id: usuario._id }
        const token = jwt.sign(payload, 'esto-es-un secreto-123-%&$', { expiresIn: '1d'})
        console.log(token)
        // https://www.jwt.io/
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: false, // Cuando este en produción a true (HTTPS)
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 1 día
        })

        res.json({ token: `Bearer ${token}`})

    } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje:'Algo falló'})
    }


}


const procesarDataFormuRegister = async (req, res) => { // /auth/formu-register

    try {
        //console.log(req.body)

        const { nombre, correo, password, password_confirm } = req.body
        //console.log(nombre)
        //console.log(correo)
        //console.log(password)
        //console.log(password_confirm)
        // ! 1. Revisar el correo (Controlar si el usuario existe dentro del sistema)
        const usuario = await models.getUserByEmail(correo)

        if ( usuario ) {
            return res.json({ mensaje: 'El usuario ya existe en nuestros registros'})
        }
        // ! 2. Chequear coincidencia de las passwords (Que sean iguales)

        if ( password !== password_confirm ) {
            return res.json({ mensaje: 'La constraseñas no coinciden' })
        }

        // ! 3. Creamos el usuario
        const objUsuario = { nombre, correo, password }
        const usuarioCreado = await models.createUser(objUsuario)

        res.status(201).json(
            {
                mensaje: 'Todo salío pipi cucu. Usuario creado',
                usuario: { nombre: usuarioCreado.nombre, correo: usuarioCreado.correo }
            }
        )

    } catch (error) {
        // console.log(error)
        logger.error(error)
    }

}

const logout = (req, res) => { // /auth/logout
    res.clearCookie('jwt')
    res.json({ mensaje: 'Sesión cerrada'})

}

export default {
    mostrarFormuLogin,
    mostrarFormuRegister,
    procesarDataFormuLogin,
    procesarDataFormuRegister,
    logout
}