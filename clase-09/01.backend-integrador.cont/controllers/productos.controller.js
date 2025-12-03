import logger from '../configs/logger.js'
import services from '../services/productos.service.js'

const getAll = async (req, res) => {
  try {

    const productos = await services.obtenerProductos()
    
    res.json(productos)

  } catch (error) {
    logger.error(error)
    //console.log(error)
  }
}

const getOne = (req, res) => {
  res.send('get one producto')
}

const create = (req, res) => {
  res.send('create producto')
}

const edit = (req, res) => {
  res.send('edit producto')
}

const remove = (req, res) => {
  res.send('delete producto')
}

export default {
    getAll,
    getOne,
    create,
    edit,
    remove
}