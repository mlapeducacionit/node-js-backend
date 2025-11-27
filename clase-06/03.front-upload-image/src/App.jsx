

const App = () => {


  const envioFormulario = async (e) => {
    e.preventDefault()
    console.log('Enviando la data...')

    console.log(e.target)
    const formu = e.target

    const formData  = new FormData(formu)

    console.log(formData)

    formData.forEach((valor, clave) => {
      console.log(clave)
      console.log(valor)
    })
    const urlBack = 'http://localhost:8080/api/v1/uploads/'
    const options = {
      method: 'POST',
      body: formData
    }
    try {
      const res = await fetch(urlBack, options)

      if (!res.ok) {
        throw new Error('No se pudo subir la imagen')
      }

      const data = await res.json()

      console.log(data)

      e.target.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mt-4">
      <h1 className="display-6 text-success">Formulario de subida de imagenes</h1>
      <form onSubmit={envioFormulario} className="border border-success rounded p-4">

        <div className="mb-3">
          <label htmlFor="subida-archivo" className="form-label">Subir archivo: </label>
          <input type="file" name="archivo" className="form-control" id="subida-archivo" placeholder="Elija un archivo" />
        </div>

        <button className="btn btn-success">Enviar</button>
      </form>
    </div>
  )

}

export default App