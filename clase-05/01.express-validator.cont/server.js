import express from 'express'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path from 'path'
import { check, validationResult } from 'express-validator'

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

// Middleware de ruta -> Express Validator -> https://express-validator.github.io/docs
// -> https://github.com/validatorjs/validator.js
// https://express-validator.github.io/docs/category/guides
app.post('/datos-contacto', [
                              check('name', 'El nombre es obligatorio y tiene que tener 3 a 10 caracteres').notEmpty().isLength({ min: 3, max: 12}).trim(),
                              check('lastname', 'El apellido es obligatorio').notEmpty(),
                              check('age', 'La edad es obligatoria y tiene que ser mayor de edad. Entre 18 y 99').notEmpty().isInt({ min: 18, max: 99}),
                              check('email', 'El correo no es válido').isEmail(),
                              check('email', 'El campo correo obligatorio').notEmpty(),
                              check('password', 'La contraseña es obligatoria y debe tener por lo menos un caracteres mayusucula, minuscula y numeros').notEmpty().matches(/^[A-Za-z0-9]{6,}$/),
                              (req, res, next) => {
                                console.log(req) // <----- las marcas que dejan los check
                                const errores = validationResult(req) // Se encarga de extrar lo que fueron generando los check
                                console.log(errores)
                                if ( !errores.isEmpty() ) {
                                  return res.status(400).json( errores )
                                }
                                next()
                              }
                            ], (req, res) => {
    console.log(req.body)
   
    res.status(201).json({ mensaje: 'Todo Okey', data: req.body })
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})