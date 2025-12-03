import ModeloProducto from "../models/productos.model.js"


const obtenerProductos = async () => {

    try {
        const todosLosProductos = await ModeloProducto.find()
        return todosLosProductos
    } catch (error) {
        throw error // Lanzar el error para arriba. O sea la función que utilice este método va a recibir el error   
    }

}

const guardarProducto = async (productoPorCrear) => {
    try {
        const productoGuardado = await ModeloProducto.create(productoPorCrear)
        return productoGuardado
    } catch (error) {
        throw error
    }
}

const obtenerProductoPorId = async (id) => {
    try {
        const unProducto = await ModeloProducto.findById(id)
        return unProducto
    } catch (error) {
        throw error
    }
}

export default {
    obtenerProductos,
    guardarProducto,
    obtenerProductoPorId
}