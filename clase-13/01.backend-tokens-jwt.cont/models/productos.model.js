// Esquema y El Modelo

import mongoose from "mongoose";

const EsquemaProducto = new mongoose.Schema(
    {
        nombre: String,
        categoria: String,
        precio: Number
    },
    {
        versionKey: false,
        timestamps: true
    }
)

const ModeloProducto = mongoose.model('productos', EsquemaProducto)

export default ModeloProducto