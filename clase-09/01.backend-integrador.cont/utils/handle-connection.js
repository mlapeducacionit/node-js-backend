import mongoose from "mongoose"
import logger from "../configs/logger.js"

const handleConnection = async (uri) => {
    try {
        await mongoose.connect(uri)
        logger.info('Se conecto a la DB')
    } catch (error) {
        logger.error('No se pudo conectar a la base de datos')
        logger.error(error)
    }
}

export default handleConnection