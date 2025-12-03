import express from 'express'
import 'dotenv/config'
const app = express()
const PORT = process.env.PORT | 8088

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})