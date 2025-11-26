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
app.use(express.json()) // Puedo recibir informaicón JSON
app.use(express.urlencoded({ extended: false })) // Puedo recibir información de un Formulario

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/datos-contacto-manual', (req, res) => {
    console.log(req.body)
    const error = []

    const {name, lastname, age} = req.body

    if(!name) {
      //return res.status(400).json({ error: 'El nombre es requerido'})
      error.push({error: 'El nombre es requerido'})
    }

    if(!lastname) {
      //return res.status(400).json({ error: 'El apellido es requerido'})
      error.push({error: 'El apellido es requerido'})
    }

    if(!age) {
      //return res.status(400).json({ error: 'El edad es requerido'})
      error.push({error: 'El edad es requerido'})
    }

    if(error.length > 0) {
      return res.status(400).json({ error })
    }

    res.status(201).json({ mensaje: 'Todo Okey', nombre: name, apellido: lastname, edad: age })
})

app.post('/datos-contacto', (req, res) => {
    console.log(req.body)
   
    res.status(201).json({ mensaje: 'Todo Okey' })
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})