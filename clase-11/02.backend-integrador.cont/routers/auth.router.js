import express from 'express'
const routerAuth = express.Router()
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'

const __filename = fileURLToPath(import.meta.url) // La ruta absoluta que incluye el nombre del archivo
const __dirname = path.dirname(__filename) // La ruta absoluta al proyecto de node.
//console.log(__filename)
//console.log(__dirname)

const obtenerPagina = async (view, data = {}) => {
  const rutaALaPagina = path.join(__dirname, '..', 'views', 'pages', view + '.ejs')
  console.log(rutaALaPagina)
  return ejs.renderFile(rutaALaPagina, data) // Devolverme la plantilla ya renderizada
}

// Muestra la vista de login (formulario de logueo)
routerAuth.get('/formu-login', async (req, res) => {
    const body = await obtenerPagina('formu-login')
    res.render('layout', { titulo: 'Formulario de Autenticación', body })
})
// Muestra la vista de register (formulario de registro)
routerAuth.get('/formu-register', async (req, res) => {
    const body = await obtenerPagina('formu-register')
    res.render('layout', { titulo: 'Formulario de Registro', body })
})
// Donde envía el formulario de login
routerAuth.post('/formu-login', (req, res) => {
    res.send('formu-login (POST)')
})
// Donde envía el formulario de register
routerAuth.post('/formu-register', (req, res) => {
    res.send('formu-register (POST)')
})
routerAuth.get('/logout', (req, res) => {
    res.send('logout')
})

export default routerAuth