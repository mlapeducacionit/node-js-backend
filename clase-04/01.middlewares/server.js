//const express = require('express') // Módulos de Node -> Commonjs
// https://nodejs.org/docs/latest/api/esm.html
import express from 'express' // Módulos de Node -> ES Modules
import 'dotenv/config'

const app = express()
//const PORT = 8080

app.use(express.static('./public'))

const PORT = process.env.PORT

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Arrancando el servidor en http://locahost:${PORT}`)
})