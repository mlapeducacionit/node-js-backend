import express from 'express'
const routerAuth = express.Router()

// Muestra la vista de login (formulario de logueo)
routerAuth.get('/formu-login', (req, res) => {
    res.send('formu-login')
})
// Muestra la vista de register (formulario de registro)
routerAuth.get('/formu-register', (req, res) => {
    res.send('formu-register')
})
// Donde envía el formulario de login
routerAuth.post('/formu-login', (req, res) => {
    res.send('formu-login (POST)')
})
// Donde envía el formulario de register
routerAuth.post('/formu-register', (req, res) => {
    res.send('formu-register (POST)')
})
routerAuth.get('/logout', (req, res) => {
    res.send('logout')
})

export default routerAuth