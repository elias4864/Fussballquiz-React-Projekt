import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryForm() {
  // State für den Kategorienamen
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  // Handler für die Eingabeänderung von Backend
  const handleChange = (e) => {
    setCategoryName(e.target.value);
  };

  // Absenden der Daten an das Backend  asynchron zuerst daten schicekn dann fethcne also und dann zurückschcen udn con JSON in Plain Stext ugweandelt
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validierung: Name muss mindestens 3 Zeichen haben (optional laut Bildbeispiel)
    if (categoryName.trim().length < 3) {
      alert("Bitte einen sinnvollen Kategorienamen eingeben.");
      return;
    }

    // 1. Ziel-URL mit URL-Parametern zusammenbauen (laut Aufgabe Punkt 5)
    // Beispiel: http://localhost:8080/category?name=Datenbanken
    const url = `http://localhost:8080/category?name=${encodeURIComponent(categoryName)}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          // 2. Geforderter Content-Type laut Aufgabenstellung
          "Content-Type": "application/x-www-form-urlencoded",
        },
        // Da die Daten bereits in der URL stehen, bleibt der Body leer oder 
        // enthält die passenden encodeten Daten. Hier laut URL-Beispiel:
        body: "" 
      });

      if (response.ok) {
        alert("Kategorie wurde angelegt!");
        // Zurück zur Liste navigieren
        navigate("/kategorien");
      } else {
        alert(`Fehler: ${response.status}`);
      }
    } catch (error) {
      console.error("Netzwerkfehler beim Speichern:", error);
    }
  };

  return (
    <div className="category-form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="category">Kategoriename:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={categoryName}
            onChange={handleChange}
            required
          />
        </div>
        
        <div style={{ marginTop: "10px" }}>
          <button type="submit">Kategorie hinzufügen</button>
          <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            {cat.name} 
            <button onClick={() => deleteCategory(cat.id)}>Löschen</button>
          </li>
        ))}
      </ul>
          <button type="button" onClick={() => navigate("/kategorien")}>
            Abbrechen
          </button>
        </div>
      </form>
    </div>
  );
}