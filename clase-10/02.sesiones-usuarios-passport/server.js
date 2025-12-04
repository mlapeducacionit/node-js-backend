import express from 'express'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import routerUser from './routes/usuarios.route.js'

const app = express()
const PORT = process.env.PORT || 8088

// Middleware
// ! Cookies
app.use(cookieParser())
// ! Sesiones

// * secret -> cadena de caracteres que se va a usar para generar sesiones ->  Esto va dentro de una variable de entorno -> secret es una semilla que me va permitir generar un sid único para mi servidor
// * resave -> false (recomendado) -> Permite indica si se va a estar guardando cada vez que se haga una petición.
// * saveUninitialized -> false (recomendado) -> Ni bien crea sesión, si crea vacía no la guardo.
// * cookie. Controla que la cookie sea segura.
// * store: Permite especificar donde se van a guardar las sesiones creadas. Por defecto si no le coloco, guarda en memoria.

app.use(session(
  {
    secret: 'sarasa-tudobom-1234567-%%$$',
    resave: false,
    saveUninitialized: false,
    /* cookie: { secure: true} */
  }
))

// ! Rutas

app.use('/', routerUser)

app.get('/', (req, res) => {
  const nombre = 'Maxi'
  res.send(`Hello ${nombre}`)
})

app.get('/set-cookie', (req, res) => {

  res.cookie('nombre', 'Maxi')
  res.cookie('modo', 'dark')
  res.send('Te envío una cookie')
})

app.get('/get-cookies', (req, res) => {
  console.log(req.cookies) // 
  res.send('Cookies recibidas...')
})

app.get('/info', (req, res) => {
  console.log('-----------------------------------------------------------')
  console.log(req.session)
  console.log('-----------------------------------------------------------')
  console.log(req.sessionID)
  console.log('-----------------------------------------------------------')
  console.log(req.cookies)
  console.log('-----------------------------------------------------------')
  console.log(req.sessionStore) // Memoria
  console.log('-----------------------------------------------------------')
  res.json({ok: true})
})

/* -------------------------------------------- */
/* SESIONES------------------------------------ */
/* -------------------------------------------- */
let contadorSinSesion = 0

app.get('/sin-sesion', (req, res) => {
  /* res.send('Sin Sesion') */
  res.json({ contador: ++contadorSinSesion })
})

app.get('/con-sesion', (req, res) => {

  console.log(req.session)
  // Variable de sesión
  //req.session.contador = 1
  
  if (req.session.contador) {
    req.session.contador++
    res.json({ mensaje: `Usted ha visitado el sitio: ${req.session.contador} veces` })
  } else {
    req.session.contador = 1
    res.json({ mensaje: 'Bienvenido!'})
  }

})


app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`)
})