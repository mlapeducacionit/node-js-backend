import { Strategy } from "passport-local";
import models from '../models/usuarios.model.js'
import passport from "passport";

const fieldEstrategia = { usernameField: 'correo' }

const comprobandoUsuario = async (correo, password, done) => {

   try {
     // ! 1. Busco el usuario
    const usuario = await models.getUserByEmail(correo)

    if (!usuario) {
        return done(null, false, { mensaje: 'Usuario no encontrado'})
    }

    // ! 2. Comprobar password
    const esCorrecto = await models.chequearPasword(usuario, password) // usuario encontrado y password que llegó del form de login

    if ( !esCorrecto ) {
        return done(null, false, { mensaje: 'No coincide el password' } )
    }

    // ! 3. El usuario si existe y coloco la contraseña correcta. Puede ingresar
    return done(null, usuario)
   } catch (error) {
    console.log('Comprobación de usuario fallida', error)
   }


}

const estrategiaLocal = new Strategy(fieldEstrategia, comprobandoUsuario)

export default passport.use(estrategiaLocal)

// Se ejecuta una sola vez después del login
passport.deserializeUser((usuario, done) => {
    done(null, usuario.id) // Guardo el ID en el cookie de sesión
})

// Chequea la cokie cada vez que se haga un request
passport.deserializeUser( async (id, done) => {
    const usuario = await models.getUserById(id)
    done(null, usuario)
}) // Gracias a esta función. req.user
