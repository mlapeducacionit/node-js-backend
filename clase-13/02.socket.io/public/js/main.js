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

socket.on('mensajes', (mensajes) => {
    console.log(mensajes)
})