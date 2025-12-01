import express from 'express'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path from 'path'
import mongoose from 'mongoose'

// ! Constantes y Variables
const app = express()
const PORT = process.env.PORT
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)

// ! Configuración

const conexionDB = async () => {
  const uri = 'mongodb://localhost:27017/node_pescar_25' // A que db quiero conectarme o usar
  const uriRemota = 'mongodb+srv://mlpeducacion:6neEx1VPAAcRGyk0@educacionit.aakwr9u.mongodb.net/node_pescar_25?appName=EducacionIT'
  try {
    console.time()
    await mongoose.connect(uri)
    console.timeEnd()
    console.log('Base de datos conectada...')
  } catch (error) {
    console.log('Uhhhhhh, algo paso...', error)
  }
}


// ! Collection | Documentos
// Mongoose -> Un Schema (Como va a ser el documento) y un Modelo (collectión)
// Mongoose usa el driver y además nos permite mapear los objetos de js en documentos BSON. (ODM)
// ORM -> Bases de datos relacionales.
// ODM -> Bases de datos no relacionales
// El Esquema (Schema) es como va a estar el documento definido. Que fields va a tener.
// https://mongoosejs.com/docs/schematypes.html
// mongoose.Schema(<definición-del-doc>, <configuracion-del-esquema>)
const EsquemaUsuario = mongoose.Schema(
  {
    nombre: String,
    apellido: String,
    correo: String,
    edad: Number,
    password: String
  },
  {
    versionKey: false, // Le quita el field __v
    timestamps: true // Agrega los fields createAt y udpateAt
  }
)

// El modelo -> En que colección voy a guardar el documento (Esquema)
// mongoose.model('<nombre-colección-plural>, <que-fields-va-a-tener-ese-documento(esquema)>)
const ModeloUsuario = mongoose.model('usuarios', EsquemaUsuario)


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

// GET ALL Usuarios
app.get('/usuarios', async (req, res) => {

  try {
    //const usuarios = await ModeloUsuario.find()
    //const usuarios = await ModeloUsuario.find({}, { password: 0 } )
    const usuarios = await ModeloUsuario.find().select('-password')
    console.log(usuarios)

    //res.send('OK GET ALL')
    res.json(usuarios)
  } catch (error) {
    console.log(error)
    res.status(500).json( { mensaje: 'No se pudieron cargar los usuarios...'})
  }

})

// POST (Create user)
app.post('/usuarios', async (req, res) => {

  try {
    const usuarioACrear = req.body
    console.log(usuarioACrear)

    const usuarioGuardado = await ModeloUsuario.insertOne(usuarioACrear)
    console.log(usuarioGuardado)


    res.send('OK POST')
  } catch (error) {
    
  }

})



app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
  conexionDB()
})