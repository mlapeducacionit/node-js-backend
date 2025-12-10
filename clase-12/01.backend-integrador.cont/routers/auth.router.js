import express from 'express'
const routerAuth = express.Router()
import controller from '../controllers/auth.controller.js'


// Muestra la vista de login (formulario de logueo)
routerAuth.get('/formu-login', controller.mostrarFormuLogin)

// Muestra la vista de register (formulario de registro)
routerAuth.get('/formu-register', controller.mostrarFormuRegister)

// Donde envía el formulario de login
routerAuth.post('/formu-login', controller.procesarDataFormuLogin)

// Donde envía el formulario de register
routerAuth.post('/formu-register', controller.procesarDataFormuRegister)

routerAuth.get('/logout', controller.logout)

export default routerAuth