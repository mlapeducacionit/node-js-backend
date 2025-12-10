const UsuarioEsquema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: true,
        },
        correo: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false
    }
)

const UsuarioModelo = mongoonse.model('usuarios', UsuarioEsquema)

export default UsuarioModelo