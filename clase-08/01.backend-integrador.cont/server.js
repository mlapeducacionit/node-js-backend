import express from 'express'
import 'dotenv/config'
import logger from './configs/logger.js'
import handleConnection from './utils/handle-connection.js'
import usuariosRouter from './routers/usuarios.router.js'
import productosRouter from './routers/productos.router.js'
import path from 'path'
import { fileURLToPath } from 'url'

// ! Variables / Contantes
const app = express()
const PORT = process.env.PORT || 8088
const __filename = fileURLToPath(import.meta.url) // La ruta absoluta que incluye el nombre del archivo
const __dirname = path.dirname(__filename) // La ruta absoluta al proyecto de node.
//console.log(__filename)
//console.log(__dirname)
// ! Configuraciones
//console.log(process.env)


// ! Middlewares
//console.log(path.join(__dirname, 'public'))
app.use(express.static(path.join(__dirname, 'public')))

// ! Rutas
// * Rutas de usuarios
app.use('/', usuariosRouter)
// * Rutas de productos
app.use('/', productosRouter)

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

