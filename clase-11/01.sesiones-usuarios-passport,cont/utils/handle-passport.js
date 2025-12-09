import passport from "passport"
import { Strategy } from "passport-local"
import models from "../models/usuarios.model.js"

const fieldEstrategia = { usernameField: 'correo' }
//                       correo, contraseña y cb -> done
const comprobarUsuario = async (correo, password, done) => {

    try {

        // 1. Busco el usuario en la DB
        const usuario = await models.getUserByEmail(correo) // usuario o nullo

        if ( !usuario ) {
            return done(null, false, { mensaje: 'Usuario no se encontró'})
        }

        // ! 2. Comprobar si el password que recibí del formulario de login coincide con el password almacenado en la db
        // true si es correcto y devuelve false si no es correcto
        // usuario encontrado basado en el correo y password recibido desde el formulario de login
        const esCorrecto = await models.chequearPassword(usuario, password) 
        //                           el usuario obtenido y el password que viene del form de login.
        
        if ( !esCorrecto ) {
            // done es una función -> 3 argumentos ->  (error, salio-todo-bien, info-adicional) si salio todo bien o no. Mensaje opcional. 2do argumento el usuario obtenido en el punto 1.
            return done(null, false, { mensaje: 'No coincide el password'})
        }

        // ! 3. El usuario existe y coloco la contraseña correcta
        return done(null, usuario) // ¿Está autenticad?

        
    } catch (error) {
        console.log('Comprobanción de usuario fallida', error)
    }

}

// Strategy(<field>, callback)
const estrategiaLocal = new Strategy(fieldEstrategia, comprobarUsuario)


export default passport.use(estrategiaLocal)

// Se ejecuta una sola vez después login. No guardo el usuario entero en la cookie, guardo solo el id
passport.serializeUser((usuario, done) => {
    done(null, usuario.id) //Guadar el id en la cookie del cliente (Guarda el id)
})

// Passport recupera el ID de la cookie
// Busca el usuario en el db
// lo deja disponible en req.user
passport.deserializeUser( async (id, done) => {
    const usuario = await models.getUserById(id)
    done(null, usuario)
}) // Esta función inyecta en el objeto req. el usuario autenticado (req.user)