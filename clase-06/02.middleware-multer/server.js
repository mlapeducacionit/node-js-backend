import express from 'express'
import 'dotenv/config'
import { fileURLToPath } from 'url'
import path from 'path'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors'

// ! Constantes y Variables
const app = express()
const PORT = process.env.PORT
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)

// ! Multer sirve para recibir en el backend cualquier formato de archivo binario. (Pdfs, xlsx, docx, jpg, webp)
// ! Configuraciones
const storage = multer.diskStorage({ // callback => cb
  destination: function (req, file, cb) { // directorio guarda la imagen
    cb(null, './uploads')
  },
  filename: function (req, file, cb) { // el nombre del archivo que se va a guardar
    console.log(file) // caracteristicas del archivo que nos envían
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const uniqueSuffix = uuidv4()
    const arrayCadenas = file.mimetype.split('/')

    // arrayCadenas.length -> 2 -1 -> 1 -> ['image', 'jpeg'] -> 'jpeg'
    //const extension = arrayCadenas[ arrayCadenas.length - 1 ]
    const extension = arrayCadenas.at(-1) // ['image', 'jpeg'].at(-1) -> 'jpeg |  ['image', 'comprimida', 'jpeg'].at(-1) -> 'jpeg'
    console.log(extension)
    const nombreArchivo = uniqueSuffix + '.' + extension
    //cb(null, file.fieldname + '-' + uniqueSuffix + '.' + extension)
    cb(null, nombreArchivo)
  }
})
// Creo el middleware de ruta
const upload = multer({ storage }) // ES6

// ! Middlewares a nivel de aplicación
app.use(express.static(path.join(DIRNAME, 'public')))
app.use(express.static(path.join(DIRNAME, 'uploads'))) // hago pública el acceso a la carpeta y archivo dentro
console.log(path.join(DIRNAME, 'uploads'))
app.use(express.json()) // Puedo recibir informaicón JSON
app.use(express.urlencoded({ extended: false })) // Puedo recibir información de un Formulario

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions))


// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/v1/uploads', upload.single('archivo'), (req, res) => {
  console.log(req.file) // El archivo guardado.

  console.log(req.protocol) // http:// | https://
  console.log(req.get('host')) // dominio:puerto | subdominio.dominio

  const protocolo = req.protocol
  const host = req.get('host')
  const urlAlArchivo = `${protocolo}://${host}/${req.file.filename}`
  console.log(urlAlArchivo)
  //res.json({ data: req.file, url: urlAlArchivo })
  res.json({ url: urlAlArchivo })
})

app.listen(PORT, () => {
  console.log(`Servidor funcionando en http://localhost:${PORT}`)
})