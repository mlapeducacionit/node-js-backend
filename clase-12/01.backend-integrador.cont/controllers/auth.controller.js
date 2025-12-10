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
const procesarDataFormuRegister =  (req, res) => { // /auth/formu-register
    res.send('formu-register (POST)')
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