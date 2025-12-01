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

    if (req.query.data) {
        logger.info('Se recibió la data')
        logger.info(req.query.data)
        res.send(req.query.data)
    } else {
        logger.error('No se recibió la data')
        res.status(400).send('Nada llego.')
    }
    
})

// ! Arranque del servidor
app.listen(PORT, (err) => {
  //if ( err ) console.log(err)
  if ( err ) {
    logger.error('No se pudo levantar el servidor')
    logger.error(err)
  }    
  //console.log(`El servidor funciona correctamente en: http://localhost:${PORT}`)
  logger.info(`El servidor funciona correctamente en: http://localhost:${PORT}`)
})

