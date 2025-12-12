console.log('Funcioando...')
console.log(io) // http://localhost:8080/socket.io/socket.io.js

const socket = io.connect() // Este se conecta al receptor

socket.on('nombre', (nombre) => {
    console.log(nombre)
})

socket.on('objeto-producto', (objeto) => {
    console.log(objeto)
})

socket.on('array-numeros', (arrayNumero) => {
    console.log(arrayNumero)
    arrayNumero.forEach(element => {
        console.log(element)
    })
})

const render = (mensajes) => {

    let html = mensajes.map(msj => {
        return (
            `
                <div>
                    <strong>${msj.usuario}</strong>
                    <em>${msj.mensaje}</em>
                </div>
            `
        )
    }).join(' ')
    console.log(html)
    document.getElementById('mensajes').innerHTML = html

}


socket.on('mensajes', (mensajes) => {
    console.log(mensajes)
    render(mensajes)
})

// ! Emitir el mensaje que se cree en el formulario
const chatFormu = document.getElementById('chat-formu')

function agregarMensaje(e) {
    e.preventDefault()
    console.log('Se agregar un mensaje')
    console.log(e)
    const nodoInputNombre = e.target[0]
    const nodoInputMensaje = e.target[1]

    const objNuevoMensaje = {
        [nodoInputNombre.name]: nodoInputNombre.value,
        [nodoInputMensaje.name]: nodoInputMensaje.value
    }
    console.log(objNuevoMensaje)
    socket.emit('nuevo-mensaje', objNuevoMensaje)

    //nodoInputNombre.value = ''
    //nodoInputMensaje.value = ''
    chatFormu.reset()
}

chatFormu.addEventListener('submit', agregarMensaje)