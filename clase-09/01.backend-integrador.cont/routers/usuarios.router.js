import express from 'express'
const usuariosRouter = express.Router()

// CRUD Usuarios
// TODO: Validaciones de usuarios
usuariosRouter.get('/user/login', (req, res) => {
  res.send('login get')
})
usuariosRouter.post('/user/login', (req, res) => {
  res.send('login post')
})
usuariosRouter.get('/user/register', (req, res) => {
  res.send('register get')
})
usuariosRouter.post('/user/register', (req, res) => {
  res.send('register post')
})
usuariosRouter.put('/user/edit/:id', (req, res) => {
  res.send('edit')
})
usuariosRouter.delete('/user/delete/:id', (req, res) => {
  res.send('delete')
})

export default usuariosRouter