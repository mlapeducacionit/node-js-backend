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
let clientesConectados = 0
const mensajes = [
    { usuario: 'Pedro', mensaje: 'Hola! que tal!'},
    { usuario: 'Alfredo', mensaje: 'Muy bien y vos?'},
    { usuario: 'Natalia', mensaje: 'Genial' },
    { usuario: 'Laura', mensaje: 'Todo feten feten' }
]

// ! Configuraciones
// * Agrego la librería socket.io
const server = createServer(app)
const io = new Server(server)

// ! Middleware
app.use(express.static(path.join(DIRNAME, variablesEntorno.public_directory)))


io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado', socket.id) // es como un dni pero podría no ser único
    clientesConectados++
    console.log(clientesConectados)
    // socket.id -> único por conexión
    // socket.id -> No es un identificador estable de usuario (no)

    socket.on('disconnect', () => {
        console.log('Cliente desconectado', socket.id)
        clientesConectados--
        console.log(clientesConectados)
    })


    // Emitir mensajes desde el servidor al cliente
    socket.emit('nombre', 'Maximiliano')

    socket.emit('objeto-producto', {
        nombre: 'PC',
        categoria: 'Informatica',
        precio: 123
    })

    socket.emit('array-numeros', [4, 3, 2, 5, 7, 8, 12, 34])

    /* --------------------- APP Chat en vivo */

    socket.emit('mensajes', mensajes)

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

server.listen(PORT, () => {
  console.log(`Servidor funcioanndo en http://localhost:${PORT}`)
})