import express from 'express'
import 'dotenv/config'
const app = express()
const PORT = process.env.PORT || 8088

app.get('/', (req, res) => {
  const nombre = 'Maxi'
  res.send(`Hello ${nombre}`)
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})