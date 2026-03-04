import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Kategorien from "../../assets/Kategorien.webp";

export default function KategoryForm() {
  // Konsistente Benennung wie im Backend
  const [categoryName, setCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Validierung (Jetzt mit der korrekten Variable categoryName)
    if (categoryName.trim().length < 3) {
      alert("Bitte einen sinnvollen Kategorienamen (mind. 3 Zeichen) eingeben.");
      return;
    }

    // 2. Bestätigung
    const confirmSend = window.confirm(`Möchtest du die Kategorie "${categoryName}" wirklich speichern?`);
    if (!confirmSend) return;



    try {
      // KORREKTUR: Richtige URL für POST
      const response = await fetch("http://localhost:8081/categories/createcategory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // KORREKTUR: Feldnamen müssen exakt zur Java-Entity passen
        body: JSON.stringify({ 
          id: categoryId, 
          category_name: categoryName // Passend zu deiner @Column(name = "category_name")
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



    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "center", 
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
      backgroundImage: `url(${Kategorien})`,
      backgroundSize: "cover",
      backgroundPosition: "center"
      
    }}>
      <h2 className="kategorieformular">Kategorieformular</h2>
      
      <div style={{ 
        padding: "30px", 
        borderRadius: "15px", 
        backgroundColor: "rgba(91, 17, 106, 0.9)", // Etwas Transparenz für den Look
        width: "350px",
        textAlign: "center",
        boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
        color: "white"
      }}>
        <h2 style={{ 
          color: "orange", 
          fontFamily: "monospace", 
          textShadow: "2px 2px blue",
          marginBottom: "20px" 
        }}>
          Neue Kategorie erstellen
        </h2>
        


        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>

          <div style={{ textAlign: "left" }}>
            <label htmlFor="category_name" style={{ display: "block", marginBottom: "5px" }}>Kategoriename:</label>
            <input
              type="text"
              id="category_name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
              placeholder="Bitte eine Kategorie angeben"
              style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "none" }}
            />
          </div>

          <div style={{ textAlign: "left" }}>
            <label htmlFor="id" style={{ display: "block", marginBottom: "5px" }}>Kategorie-ID (Zahl):</label>
            <input
              type="number"
              id="id"
              value={categoryId}
              placeholder="Bitte eine gültige ID angeben"
              onChange={(e) => setCategoryId(e.target.value)}
              required
              style={{ padding: "10px", width: "100%", borderRadius: "5px", border: "none" }}
            />
          </div>

          <div style={{ marginTop: "15px", display: "flex", gap: "10px", justifyContent: "center" }}>
            <button 
              style={{ backgroundColor: "orange", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }} 
              type="submit"
            >
              Speichern
            </button>
            <button 
              style={{ backgroundColor: "salmon", color: "white", padding: "10px 20px", border: "none", borderRadius: "5px", cursor: "pointer", fontWeight: "bold" }} 
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