//const express = require('express') // Módulos de Node -> Commonjs
// https://nodejs.org/docs/latest/api/esm.html
import express from 'express' // Módulos de Node -> ES Modules
import 'dotenv/config'

// ! Constantes / variables
const app = express()
//const PORT = 8080
const PORT = process.env.PORT

// ! Middleware (Antes de las rutas)

/* 
¿Qué es Middleware? Un middleware es una función que se ejecutan antes de que la solicitud llegue a la ruta final o antes de que se envíe la respuesta. Permiten agregar funcionalidades, validaciones, autenticaciones, logs y manejo de errores
*/
// * Verificar si el usuario está autenticado
// * Validar datos del req.body
// * Agregar información (modificar el request)
// * Registrar logs de acceso
// * Manejar errores globales
// * Limitar el acceso por IP, rol, token, etc


// ! 1. Middleware a nivel de aplicación (Buildin) || Dentro de Express
app.use(express.static('./public'))
app.use(express.json()) // Para que express decifre lo que le llega por el body (json)

// Middleware que nos loguea a que ruta ingreso el usuario
app.use((req, res, next) => {
    console.log('--------------------')
    console.log(req.url)
    console.log('--------------------')
    //res.send(`No dejo ir al ruta ${req.url}`)
    //res.send('Se queda en middleware')
    next()
})
// Middleware que nos loguea a que hora y fecha ingreso a esa ruta.
app.use((req, res, next) => {
    console.log('--------------------')
    console.log(new Date().toLocaleString())
    console.log('--------------------')
    next()
})
// Middleware de detección de rol administrador.
// Query String -> Cadena de consulta (URL)
// ?nombre=Maxi | ? rol=admin
const soloAdministradores = (req, res, next) => {
    console.log(req.query) // Un objeto con las variables dentro de la query String
    if ( req.query.rol === 'admin' ) {
        next()
    } else {
        //res.status(403).send('Acceso denegado') // el servidor recibió la petición. rechaza la petición.
        const error = {
            status: 403,
            mensaje: 'Acceso denegado'
        }
        next(error)
    }
}



app.use(soloAdministradores)

// ! 2. Middleware a nivel de ruta

// ! Rutas / Ruteo
// case '/'
app.get('/', (req, res) => {
  res.send('Hello World!')
})
// case '/api/v1/productos'
app.get('/api/v1/productos', (req, res) => {
    res.send('Listamos productos...')
})

app.get('/api/v1/admin-panel', (req, res) => {
    res.send('Area restringida!')
})

// default
app.all('{*splat}', (req, res) => {
    res.send('Otra ruta!')
})

// ! Middlewarej de manejo de error (siempre al final)

const errorHandler = (err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).json(
        {
            mensaje: err.mensaje || 'Error interno del servidor'
        } 
    )
}

app.use(errorHandler)

// ! Arranque/Escucha aplicación
app.listen(PORT, () => {
  console.log(`Arrancando el servidor en http://locahost:${PORT}`)
})