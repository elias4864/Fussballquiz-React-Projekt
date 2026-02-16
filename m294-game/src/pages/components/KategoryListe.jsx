
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
export default function KategoryListe(){

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/categories")
      .then(response => response.ok && response.json() || Promise.reject(response))
      .then(data => setCategories(data))
      .catch(error => console.error(error))
  }, [])





  
    

  function addCategory(id){
    fetch(`http://localhost:8081/categories/${id}`, {
      method: "POST"
    })
    .then(response => response.ok && window.location.reload() || Promise.reject(response))
    .catch(error => console.error(error))
  }


  function deleteCategory(id){
    fetch(`http://localhost:8081/categories/${id}`, {
      method: "DELETE"
    })
    .then(response => response.ok && window.location.reload() || Promise.reject(response))
    .catch(error => console.error(error))
  }



  return (
    <div>
      <h1>CategoryList</h1>
      <hr />
      <table className="questionlist">
        <thead>
          <tr>
            <th>Kategorie</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            categories.map(cat => <tr key={cat.id}>
              <td>{cat.name}</td>
              <td><a className="wastebasket" title="Loeschen" onClick={() => deleteCategory(cat.id)}>&#128465;</a></td>
              <th><a className="addkategorie" title="hinzufügen" onClick={()=>addCategory(cat.id)}>&#128465;</a></th>
            </tr>)
          }
        </tbody>
      </table>
      <hr />
      <button className="kategorie">
        <Link to="/new-category">Neue Kategorie</Link>
      </button>
    </div>

  )
}
