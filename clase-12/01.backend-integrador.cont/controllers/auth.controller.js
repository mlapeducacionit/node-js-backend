import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import logger from '../configs/logger.js'
import models from '../models/usuarios.model.js'


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
const procesarDataFormuLogin = (req, res) => { // /auth/formu-login
    res.send('formu-login (POST)')
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
    res.send('logout')
}

export default {
    mostrarFormuLogin,
    mostrarFormuRegister,
    procesarDataFormuLogin,
    procesarDataFormuRegister,
    logout
}