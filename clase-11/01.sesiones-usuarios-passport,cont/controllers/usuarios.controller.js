import modelo from '../models/usuarios.model.js'

const login = (req, res) => {
    console.log(req.body)
    res.send('login')
}

const register = async (req, res) => {
   try {
         // Para registrar un usuarios
        // ! 1. recibir los datos ->  nombre, correo, password, confirm_password
        const { nombre, correo, password, confirm_password } = req.body
        console.log(nombre, correo, password, confirm_password)

        // ! 2. Controlar si el correo existe ya en la DB
        const usuario = await modelo.getUserByEmail(correo)

        if ( usuario ) {
            return res.status(200).json({ mensaje: 'El usuario ya existe en nuestros registros'})
        }

        // ! 3. Controlar si los password coinciden
        if ( password !== confirm_password ) {
            return res.status(200).json({ mensaje: 'Las constraseñas no coinciden'})
        }

        // ! 4. Guardo el usuario en la colección Usuarios
        const objUsuario = {nombre, correo, password}
        const usuarioCreado = await modelo.createUser(objUsuario)

        res.status(201).json(
            {
                mensaje: 'Todo salió supercalifragilisticoespialidoso',
                usuario: { nombre: usuarioCreado.nombre, correo: usuarioCreado.correo }
            }
        )

   } catch (error) {
        console.log(error)
        res.status(500).json({ mensaje: 'No se pudo registrar el usuario' })
   }

}


const logout = (req, res) => {
    res.send('logout')
}

export default {
    login,
    register,
    logout
}
