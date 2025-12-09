import express from 'express'
import controller from '../controllers/usuarios.controller.js'

const routerUser = express.Router()

// Ruta donde recibo la info de logueo
routerUser.post('/login', controller.login)
// Ruta donde recibo la info de registro
routerUser.post('/register', controller.register)
// Ruta deslogueo de usuarios
routerUser.get('/logout', controller.logout)

export default routerUser
