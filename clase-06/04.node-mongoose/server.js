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
app.use(express.static(path.join(DIRNAME, 'uploads'))) // hago pública el acceso a la carpeta y archivo dentro
console.log(path.join(DIRNAME, 'uploads'))
app.use(express.json()) // Puedo recibir informaicón JSON
app.use(express.urlencoded({ extended: false })) // Puedo recibir información de un Formulario

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})