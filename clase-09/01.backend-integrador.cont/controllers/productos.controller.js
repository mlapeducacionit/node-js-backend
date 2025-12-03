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

const create = async (req, res) => {

  try {
    const productoPorCrear = req.body
    const productoGuardado = await services.guardarProducto(productoPorCrear)
    res.status(201).json(productoGuardado)
  } catch (error) {
    logger.error(error)
  }
  
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