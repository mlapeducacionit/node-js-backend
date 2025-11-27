const App = () => {



  return (
    <div className="container mt-4">
      <h1 className="display-6 text-success">Formulario de subida de imagenes</h1>
      <form className="border border-successs rounded p-4">

        <div class="mb-3">
          <label for="subida-archivo" className="form-label">Subir archivo: </label>
          <input type="file" className="form-control" id="subida-archivo" placeholder="Elija un archivo" />
        </div>

        <button className="btn btn-success">Enviar</button>
      </form>
    </div>
  )


}

export default App