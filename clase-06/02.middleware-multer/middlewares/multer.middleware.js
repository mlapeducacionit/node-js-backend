import multer from 'multer'
import { v4 as uuidv4 } from 'uuid';

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

export default upload