import express from 'express'
import 'dotenv/config'
import pino from 'pino'

// ! Variables / Contantes
const app = express()
const PORT = process.env.PORT || 8088

// ! Configuraciones
const logger = pino(
    {
        transport: {
            targets: [
                {
                    level: 'info',
                    target: 'pino/file',
                    options: { destination: './logs/info.log'}
                },
                {
                    level: 'error',
                    target: 'pino/file',
                    options: { destination: './logs/error.log'}
                },
                {
                    target: 'pino-pretty',
                    options: {
                        colorize: true
                    }
                }
            ]
        }
    }
)

// ! Middlewares

// ! Rutas
app.get('/', (req, res) => {
  res.send('Hello World!')
})

// ! Arranque del servidor
app.listen(PORT, (err) => {
  if ( err ) console.log(err)
  console.log(`El servidor funciona correctamente en: http://localhost:${PORT}`)
})

