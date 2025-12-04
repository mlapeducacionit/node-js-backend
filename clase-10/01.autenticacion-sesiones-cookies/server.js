import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

const app = express()
const PORT = process.env.PORT || 8088

// Middleware
app.use(cookieParser())

app.get('/', (req, res) => {
  const nombre = 'Maxi'
  res.send(`Hello ${nombre}`)
})

app.get('/set-cookie', (req, res) => {

  res.cookie('nombre', 'Maxi')
  res.cookie('modo', 'dark')
  res.send('Te envío una cookie')
})

app.get('/get-cookies', (req, res) => {
  console.log(req.cookies) // 
  res.send('Cookies recibidas...')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})