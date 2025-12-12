import 'dotenv/config'

const variablesEntorno = {
    public_directory: process.env.PUBLIC_DIR,
    secret_session: process.env.SECRET_SESSION
}
export default variablesEntorno