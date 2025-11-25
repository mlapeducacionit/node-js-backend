const validarToken = (req, res, next) => {
    console.log(req.headers)
    if ( req.headers['x-token'] === 'a23e442ed3428') {
        next()
    } else {
        const error ={
            status: 401,
            mensaje: 'No tiene permisos para poder acceder a la sección'
        }
        next(error)
        //res.status(401).send('No se tiene acceso. No recibimos el token.')
    }
}

export default validarToken