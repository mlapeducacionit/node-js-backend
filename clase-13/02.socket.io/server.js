import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import variablesEntorno from './constants/variables-entorno.js'
import { createServer } from 'http' // Api node http
import { Server } from 'socket.io'

// ! Variables | Constantes
const app = express()
const PORT = 8080
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)

// ! Configuraciones
// * Agrego la librería socket.io
const server = createServer(app)
const io = new Server(server)

// ! Middleware
app.use(express.static(path.join(DIRNAME, variablesEntorno.public_directory)))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log(`Servidor funcioanndo en http://localhost:${PORT}`)
})