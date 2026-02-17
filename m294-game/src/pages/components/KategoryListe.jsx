import { useState, useEffect } from "react";

export default function KategoryListe() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Laden der Daten (GET)
  useEffect(() => {
    fetch("http://localhost:8081/categories/all") // Endpunkt aus deinem Controller
      .then((response) => response.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Fehler beim Laden:", error);
        setLoading(false);
      });
  }, []);

  // 2. Lösch-Funktion (DELETE)
  const deleteCategory = (id) => {
    // Pfad: /categories/delete/{id} laut Controller
    fetch(`http://localhost:8081/categories/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          // UI-Update ohne Neuladen: Filtert die gelöschte ID aus dem State
          setCategories((prev) => prev.filter((cat) => cat.id !== id));
        } else {
          alert("Löschen fehlgeschlagen.");
        }
      })
      .catch((error) => console.error("Fehler beim Löschen:", error));
  };



  if (loading) return <p>Lade Kategorien...</p>;

  return (
    <div>
      <h2>Kategorieliste</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kategoriename</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>
                <button 
                  onClick={() => deleteCategory(cat.id)}
                  style={{ color: "red" }}
                >
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}