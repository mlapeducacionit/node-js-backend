import logger from '../configs/logger.js'
import services from '../services/productos.service.js'

const getAll = async (req, res) => {
  try {

    const productos = await services.obtenerProductos()
    
    //res.json(productos)

    res.json({
      ok: true,
      data: productos
    })

  } catch (error) {
    logger.error(error)
    //console.log(error)
  }
}

const getOne = async (req, res) => {

  try {
    const id = req.params.id
    // console.log(id)

    const unProducto = await services.obtenerProductoPorId(id)

    res.json({
      ok: true,
      data: unProducto
    })
  } catch (error) {
    logger.error(error)
  }
  
}

const create = async (req, res) => {

  try {
    const productoPorCrear = req.body
    const productoGuardado = await services.guardarProducto(productoPorCrear)
    //res.status(201).json(productoGuardado)

    res.status(201).json({
      ok: true,
      data: productoGuardado
    })

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