import { check } from "express-validator"
import usuariosMiddleware from "../middlewares/usuarios.middlewares.js"

const usuariosValidators = [
  check('name', 'El nombre es obligatorio y tiene que tener 3 a 10 caracteres').notEmpty().isLength({ min: 3, max: 12}).trim(),
  check('lastname', 'El apellido es obligatorio').notEmpty(),
  check('age', 'La edad es obligatoria y tiene que ser mayor de edad. Entre 18 y 99').notEmpty().isInt({ min: 18, max: 99}),
  check('email', 'El correo no es válido').isEmail(),
  check('email', 'El campo correo obligatorio').notEmpty(),
  check('password', 'La contraseña es obligatoria y debe tener por lo menos un caracteres mayusucula, minuscula y numeros').notEmpty().matches(/^[A-Za-z0-9]{6,}$/),
  usuariosMiddleware
]

export default usuariosValidators