import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KategoryForm() { 
  // State initialisieren (ID hinzugefügt)
  const [entries, setEntries] = useState({ name: "", id: "" });
  const navigate = useNavigate();

  // Universelle Change-Funktion
  const store = (e) => {
    const { name, value } = e.target;
    setEntries((prev) => ({ ...prev, [name]: value }));
  };

  // Die Funktion, die beim Klick (Submit) die Kategorie hinzufügt
  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8081/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });

      if (response.ok) {
        // Nach Erfolg zur Liste zurückkehren
        navigate("/kategorien");
      } else {
        console.error("Server antwortete mit Fehler:", response.statusText);
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
    }
  };

  return (
    <div className="category-form-container">
      <h2>Neue Kategorie erstellen</h2>
      <form onSubmit={submit}>
        <div className="form-control">
          <label htmlFor="category-name">Kategoriename:</label>
          <input
            id="category-name"
            type="text"
            name="name" // Muss "name" sein für entries.name
            value={entries.name}
            onChange={store}
            required
          />
            <br></br>
          <label htmlFor="category-id">Kategorie ID</label>
          <input
            id="category-id"
            type="text"
            name="id" // WICHTIG: Name muss "id" sein, damit store() richtig zuordnet
            value={entries.id}
            onChange={store}
            required
          />
        </div>
        <button type="submit">Kategorie hinzufügen</button>
      </form>
    </div>
  );
}