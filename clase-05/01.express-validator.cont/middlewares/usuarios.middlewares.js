import { validationResult } from "express-validator"

const usuariosMiddleware =  (req, res, next) => {
  console.log(req) // <----- las marcas que dejan los check
  const errores = validationResult(req) // Se encarga de extrar lo que fueron generando los check
  console.log(errores)
  if ( !errores.isEmpty() ) {
    return res.status(400).json( errores )
  }
  next()
}

export default usuariosMiddleware