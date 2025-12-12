import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import variablesEntorno from './constants/variables-entorno.js'

// ! Variables | Constantes
const app = express()
const PORT = 8080
const FILENAME = fileURLToPath(import.meta.url)
const DIRNAME = path.dirname(FILENAME)

// ! Middleware
app.use(express.static(path.join(DIRNAME, variablesEntorno.public_directory)))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Servidor funcioanndo en http://localhost:${PORT}`)
})