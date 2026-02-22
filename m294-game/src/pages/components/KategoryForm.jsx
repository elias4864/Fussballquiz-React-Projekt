
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Kategorien from "../../assets/Kategorien.webp";
export default function KategoryForm() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Kleingeschrieben für Konsistenz

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validierung
    if (categoryName.trim().length < 3) {
      alert("Bitte einen sinnvollen Kategorienamen (mind. 3 Zeichen) eingeben.");
      return;
    }

    // 2. Bestätigung
    const confirmSend = window.confirm(`Möchtest du die Kategorie "${categoryName}" wirklich speichern?`);
    if (!confirmSend) return;

    const url = "http://localhost:8081/categories/createcategory";

    // 3. Try-Catch Block
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // Sende Name und ID ans Backend
        body: JSON.stringify({ 
          id: categoryId, 
          name: categoryName 
        }), 
      });

      if (response.ok) {
        alert("Kategorie wurde angelegt!");
        navigate("/kategorieliste");
      } else {
        alert(`Fehler: ${response.status}`);
      }
    } catch (error) {
      console.error("Netzwerkfehler:", error);
      alert("Verbindung zum Server fehlgeschlagen.");
    }
  };

  return (
    // ZENTRIERUNG: Flexbox sorgt für die mittige Ausrichtung
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif"
    }}>
      
      <div style={{ 
        padding: "30px", 
        border: "1px solid #ccc", 
        borderRadius: "10px", 
        backgroundColor: "#f9f9f9",
        textAlign: "center", // Zentriert den Text innerhalb der Box
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
      }}>
        <h2  className="background-kategorien" style={{ color: "orange",fontFamily: " monospace",textShadow:"2px 2px blue" }}>Neue Kategorie erstellen</h2>
        
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
          <div>
            <label htmlFor="category" style={{ display: "block", marginBottom: "5px" }}>Kategoriename:</label>
            <input
              type="text"
              id="category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              style={{ padding: "8px", width: "200px" }}
            />
          </div>

          <div>
            <label htmlFor="categoryid" style={{ display: "block", marginBottom: "5px" ,textAlign:"center"}}>Kategorie-ID (Zahl):</label>
            <input
              type="number"
              id="categoryid"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{ padding: "8px", width: "200px" }}
            />
          </div>

          <div style={{ marginTop: "10px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button style={{ backgroundColor: "orange", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer" }} type="submit">
              Speichern
            </button>
            <button 
              style={{ backgroundColor: "salmon", color: "white", padding: "10px 20px", border: "none", borderRadius: "30px", cursor: "pointer" }} 
              type="button" 
              onClick={() => navigate("/kategorieliste")}
            >
              Abbrechen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}