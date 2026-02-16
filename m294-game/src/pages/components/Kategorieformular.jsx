





const handleSubmit = (event) => {

    event.preventDefault() // verhindert das Default-Formularverhalten

    if (inputs.category.trim().length<3) {
      alert("Bitte sinnvollen Kategorienamen mit mindestens drei Zeichen eingeben")
      return
    }
    fetch("http://localhost:8081/category", {
      mode: "cors",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: "name="+inputs.category
    }).then((response) => {
      if (response.ok) {
        alert("Kategorie wurde angelegt")
      } else {
        alert("Kategorie konnte nicht angelegt werden, Fehlercode: " + response.status)
      }
    })
  }



  const [inputs, setInputs] = useState({})

  const handleChange = (event) => {
    const {name, value} = event.target  // liest name-Attribut und Wert des aktuellen inputs
    setInputs({
      ...inputs,    // spread operator: speichert alle bisherigen key-value Paare
      [name]: value // speichert aktuelles key-value Paar
    })
  }



  return (
    <>
      <h1>Neue Kategorie hinzufügen</h1>
      <form action="">
      <div>
          <label htmlFor="category">Kategoriename</label>
          <input type="text" name="category" id="category" onChange={ handleChange } />
        </div>
        <div>
          <button type="submit" onClick={ handleSubmit }>Kategorie hinzufügen</button>
          <button type="reset">Abbrechen</button>
        </div>
      </form>
    </>
  )