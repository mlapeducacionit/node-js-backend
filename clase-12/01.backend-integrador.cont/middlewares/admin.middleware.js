
const isAuthenticated = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/auth/formu-login')

}

export default isAuthenticated