
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function KategoryForm() { 
  const [entries, setEntries] = useState({ 
    name: "", 
    id: "", 
    question_id: "" 
  });
  const [error, setError] = useState(null); // Für Fehlermeldungen im UI
  const navigate = useNavigate();

  const store = (e) => {
    const { name, value } = e.target;
    setEntries((prev) => ({ ...prev, [name]: value }));
  };






  const submit = async (e) => {
    e.preventDefault();
    setError(null); // Reset Fehlerzustand

    try {
      const response = await fetch("http://localhost:8081/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entries),
      });

      if (response.ok) {
        navigate("/kategorien");
      } else {
        setError("Fehler beim Speichern der Kategorie.");
      }
    } catch (err) {
      setError("Server nicht erreichbar. Bitte später versuchen.");
      console.error("Fetch-Fehler:", err);
    }
  };




 
 

  return (
    <div className="kategory-container">
      <h2>Neue Kategorie erstellen</h2>
      
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={submit}>
        <div className="form-group">
          <label htmlFor="name">Kategoriename:</label>
          <input 
            id="name"
            type="text" 
            name="name" 
            value={entries.name} 
            onChange={store} 
            required 
          />
        </div>

        <div className="form-group">
          <label htmlFor="id">Kategorie ID:</label>
          <input 
            id="id"
            type="number" // Besser als text für IDs
            name="id" 
            value={entries.id} 
            onChange={store} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="question_id">Frage ID:</label>
          <input 
            id="question_id"
            type="number" 
            name="question_id" 
            value={entries.question_id} 
            onChange={store} 
            required 
          />
        </div>

        <button type="submit" className="submit-btn">Hinzufügen</button>
      </form>
    </div>
  );
}