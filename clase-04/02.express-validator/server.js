import express from 'express'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path from 'path'

// ! Constantes y Variables
const app = express()
const PORT = process.env.PORT
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)

// ! Middlewares a nivel de aplicación
app.use(express.static(path.join(DIRNAME, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/datos-contacto', (req, res) => {
    console.log(req.body)
    res.json('OK POST')
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})