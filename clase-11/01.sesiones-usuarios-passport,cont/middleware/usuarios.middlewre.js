const isAutenthicated = (req, res, next) => {

    if ( req.isAutenthicated() ) {
        return next()
    }

    res.send('No tenés acceso a la parte privada')
    // res.redirect('/login')

}

export default isAutenthicated