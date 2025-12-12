import passport from 'passport'
import { Stragery as JwtStrategy } from 'passport-jwt'
import models from '../models/usuarios.model.js'

const cookieExtractor = req => {
    let token = null
    if ( req && req.cookies ) {
        token = req.cookies.jwt
    }
    return token
}

const opciones = {
    jwtFromRequest: cookieExtractor,
    secretOrKey: 'esto-es-un secreto-123-%&$'
}

const comprobarUsuario = async (jwt_payload, done) => {

    try {
        // ! 1. Busco el usuario dentro de la DB
        const usuario = await models.getUserById(jwt_payload.id)

        // ! 2. si el usuario existe
        if ( usuario ) {
            return done(null, usuario)
        } 
        // ! 2.1 si el usuario no existe
        return done(null, false)

    } catch (error) {
        return done(error, false)
    }

}

const estrategiaJWT = new JwtStrategy(opciones, comprobarUsuario)
export default passport.use(estrategiaJWT)