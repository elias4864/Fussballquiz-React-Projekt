import { useState, useEffect } from "react";

export default function KategoryListe() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteId, setDeleteId] = useState(""); // State für die ID-Eingabe zum Löschen

  // States für die Editier-Funktion (die in deinem Template angedeutet waren)
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    fetch(`http://localhost:8081/categories/all`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((err) => console.error("Ladefehler:", err));
  };

  const createCategory = () => {
    if (!newCategoryName.trim()) return alert("Name darf nicht leer sein");
    fetch(`http://localhost:8081/createcategory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newCategoryName }),
    })
      .then((res) => {
        if (res.ok) {
          setNewCategoryName("");
          fetchCategories();
        }
      })
      .catch((err) => console.error("Fehler beim Erstellen:", err));
  };

  const deleteCategory = (id) => {
    if (!id) return alert("Bitte eine gültige ID eingeben");
    if (!window.confirm(`Kategorie mit ID ${id} wirklich löschen?`)) return;

    fetch(`http://localhost:8081/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCategories((prev) => prev.filter((cat) => cat.id !== parseInt(id)));
          setDeleteId(""); // Input nach Löschen leeren
        } else {
          alert("Fehler beim Löschen. Existiert die ID?");
        }
      })
      .catch((err) => console.error("Fehler beim Löschen:", err));
  };





  const handleSubmit = (event) => {

    event.preventDefault() // verhindert das Default-Formularverhalten

    if (inputs.category.trim().length<3) {
      alert("Bitte sinnvollen Kategorienamen mit mindestens drei Zeichen eingeben")
      return
    }
    fetch("http://localhost:8080/category", {
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
  return (
    <div className="background-kategorien" style={{ padding: "20px", fontFamily: "sans-serif", backgroundColor: "#f0fdf4", minHeight: "100vh" }}>
      <h2 style={{ color: "#166534", textShadow: "2px 2px red"}}>Kategorieliste</h2>

      {/* --- CREATE BEREICH --- */}
      <div style={{ marginBottom: "30px", padding: "15px", border: "1px solid #bbf7d0", borderRadius: "8px", backgroundColor: "white",alignItems:"center"  }}>
        <h3>Neue Kategorie erstellen</h3>
        <input
          type="text"
          placeholder="Name der Kategorie..."
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          style={{ padding: "8px", width: "250px" }}
        />
        <button onClick={createCategory} style={{ marginLeft: "10px", padding: "8px 15px", cursor: "pointer", backgroundColor: "#22c55e", color: "white", border: "none", borderRadius: "4px" }}>
          Hinzufügen
        </button>
      </div>

      {/* --- DELETE BEREICH (Mit großem Submit Button) --- */}
      <div style={{marginBottom: "30px", 
  padding: "20px", 
  border: "1px solid #fecaca", 
  borderRadius: "8px", 
  backgroundColor: "#fff1f1",
  /* --- ZENTRIERUNG START --- */
  display: "flex",
  flexDirection: "column", // Stapelt die Elemente untereinander
  alignItems: "center",     // Zentriert alles horizontal
  textAlign: "center"}}>
        <h3>Kategorie per ID löschen</h3>
        <div style={{ display: "flex", 
  justifyContent: "center", // Horizontal zentrieren
  alignItems: "center",     // Vertikal zentrieren (falls gewünscht)
  width: "100%",            // Nimmt die volle Breite ein
  margin: "20px 0", flexDirection: "column", gap: "10px", maxWidth: "300px", textAlign:"center" }}>
          <input
            type="number"
            placeholder="ID eingeben (z.B. 5)"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            style={{ padding: "10px", fontSize: "1rem" }}
          />
          <button 
            onClick={() => deleteCategory(deleteId)} 
          style={{ 
        padding: "15px", 
        backgroundColor: "#ef4444", 
        color: "white", 
        border: "none", 
        borderRadius: "5px", 
        fontWeight: "bold",
        fontSize: "1.1rem",
        cursor: "pointer",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
      }}
    >
          Kategorie löschen
          </button>
        </div>
      </div>

      <hr />


        <table border="2" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
          <thead>
            <tr style={{ backgroundColor: "#fbbf24" }}>
              <th>ID</th>
              <th>Name</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((cat) => (
              <tr key={cat.id} style={{ textAlign: "center" }}>
                <td>{cat.id}</td>
                <td>{cat.name || "Kein Name"}</td>
                <td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    
    </div>
  );
}