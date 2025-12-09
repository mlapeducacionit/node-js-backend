const isAutenthicated = (req, res, next) => {

    if ( req.isAuthenticated() ) {
        return next()
    }

    res.status(401).send('No tenés acceso a la parte privada')
    // res.redirect('/login')

}

export default isAutenthicated