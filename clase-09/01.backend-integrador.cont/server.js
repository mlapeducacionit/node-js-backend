import express from 'express'
import 'dotenv/config'
import logger from './configs/logger.js'
import handleConnection from './utils/handle-connection.js'
import usuariosRouter from './routers/usuarios.router.js'
import productosRouter from './routers/productos.router.js'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'

// ! Variables / Contantes
const app = express()
const PORT = process.env.PORT || 8088
const __filename = fileURLToPath(import.meta.url) // La ruta absoluta que incluye el nombre del archivo
const __dirname = path.dirname(__filename) // La ruta absoluta al proyecto de node.
//console.log(__filename)
//console.log(__dirname)
// ! Configuraciones
//console.log(process.env)
app.set('view engine', 'ejs') // Le indico por medio de una variable que motor de plantillas quiero usar

app.set('views', path.join(__dirname, 'views')) // Ruta a donde va a ir a buscar las plantillas
app.set('layout', 'layout')

// ! Middlewares
//console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')))

// ! Rutas
// * Rutas de usuarios
app.use('/', usuariosRouter)
// * Rutas de productos
app.use('/api/v1/', productosRouter)

const obtenerPagina = async (view, data = {}) => {
  const rutaALaPagina = path.join(__dirname, 'views', 'pages', view + '.ejs')
  console.log(rutaALaPagina)
  return ejs.renderFile(rutaALaPagina, data) // Devolverme la plantilla ya renderizada
}
// Rutas de nuestra aplicación
// https://www.cbtnuggets.com/blog/technology/devops/ejs-vs-pug-vs-handlebars
// Home
app.get('/', async (req, res) => {
  const body = await obtenerPagina('home')
  res.render('layout', { titulo: 'Inicio', body })
})

// Productos
app.get('/productos', async (req, res) => {
  const productos = [
    {id: 1, nombre: 'PC', precio: 234 },
    {id: 2, nombre: 'Tablet', precio: 555 },
    {id: 3, nombre: 'Notebook', precio: 333 }
  ]

  const body = await obtenerPagina('productos', { productos })
  res.render('layout', { titulo: 'Productos', body })
})
// Nosotros
app.get('/nosotros', async (req, res) => {
  const body = await obtenerPagina('nosotros')
  res.render('layout', { titulo: 'Nosotros', body })
})
// Contacto
app.get('/contacto', async (req, res) => {
  const body = await obtenerPagina('contacto')
  res.render('layout', { titulo: 'Contacto', body })
})

// ! Arranque del servidor
app.listen(PORT, (err) => {
  //if ( err ) console.log(err)
  if ( err ) {
    logger.error('No se pudo levantar el servidor')
    logger.error(err)
  }    
  //console.log(`El servidor funciona correctamente en: http://localhost:${PORT}`)
  logger.info(`El servidor funciona correctamente en: http://localhost:${PORT}`)
  const uri = 'mongodb://localhost:27017/db_integrador'
  handleConnection(uri)
})

