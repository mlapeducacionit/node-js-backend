import ModeloProducto from "../models/productos.model.js"


const obtenerProductos = async () => {

    try {
        const todosLosProductos = await ModeloProducto.find()
        return todosLosProductos
    } catch (error) {
        throw error // Lanzar el error para arriba. O sea la función que utilice este método va a recibir el error   
    }

}

export default {
    obtenerProductos
}