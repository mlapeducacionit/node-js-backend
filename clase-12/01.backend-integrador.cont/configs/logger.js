import pino from 'pino'

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

export default logger