import { useState, useEffect } from "react";

export default function KategoryListe() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [deleteId, setDeleteId] = useState("");


  //Use Effect ruft fethcCategorie Methdoe auf , wenn alle Daten geholt werden müssen
  useEffect(() => {
    fetchCategories();
  }, []);


  //Alle Kategorien werden  au Datenbank automatisch udn einmalig geholt  und  bei Spalte "Id" und "Kategoriename dementsprechnd die Daten  abgefüllt 
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

  //Vor ABsender der createCategor yMethdoe wird die Länge de eigegeben Textes perüft und dementsprechen eien Fehlermeldugn angezeigt
  const createCategory = (e) => {
    if (e) e.preventDefault();

    if (newCategoryName.trim().length < 3) {
      alert("Bitte einen Namen mit mindestens 3 Zeichen eingeben.");
      return;
    }

      // Funktion zum Erstellen einer Kategorie mit Fe

    fetch(" http://localhost:8081/categories/createcategory", {
      method: "POST",
      headers: {
        "Content-Type": " ",
      },
      body: "name=" + encodeURIComponent(newCategoryName),
    })
      .then((res) => {
        if (res.ok) {
          alert("Kategorie wurde angelegt");
          setNewCategoryName(""); // Input leeren
          fetchCategories(); // Liste neu laden
        } else {
          alert("Fehler beim Anlegen: " + res.status);
        }
      })
      .catch((err) => console.error("Fehler:", err));
  };

  const deleteCategory = (id) => {
    if (!id) return alert("Bitte eine gültige ID eingeben");
    if (!window.confirm(`Kategorie mit ID ${id} wirklich löschen?`)) return;

    fetch(`http://localhost:8081/delete/${id}`, { method: "DELETE" })
      .then((res) => {
        if (res.ok) {
          setCategories((prev) => prev.filter((cat) => cat.id !== parseInt(id)));
          setDeleteId("");
        } else {
          alert("Fehler beim Löschen. Existiert die ID?");
        }
      })
      .catch((err) => console.error("Fehler beim Löschen:", err));
  };

  return (
    <div
      style={{
        padding: "40px 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        // HIER DAS HINTERGRUNDBILD
        backgroundImage: "url('https://images.unsplash.com/photo-1557683316-973673baf926?q=80&w=2000')", 
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        
        <h2 style={{ 
          color: "white", 
          textAlign: "center", 
          fontSize: "2.5rem", 
          textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
          fontFamily: "Bodoni MT",
          textShadow: "2px 2px violet",
          marginBottom: "30px" 
        }}>
          Kategorieliste
        </h2>

        {/* --- CREATE BEREICH --- */}
        <div style={{ 
          marginBottom: "30px", 
          padding: "25px", 
          borderRadius: "15px", 
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Leicht transparent
          backdropFilter: "blur(5px)", // Glassmorphism Effekt
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <h3 style={{ color: "#166534", marginTop: 0 }}>Neue Kategorie erstellen</h3>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="text"
              placeholder="Name der Kategorie..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              style={{ padding: "12px", width: "250px", borderRadius: "8px", border: "1px solid #ccc" }}
            />
            <button 
              onClick={createCategory} 
              style={{ 
                padding: "12px 25px", 
                cursor: "pointer", 
                backgroundColor: "#22c55e", 
                color: "white", 
                border: "none", 
                borderRadius: "8px",
                fontWeight: "bold",
                transition: "transform 0.2s"
              }}
            >
              Hinzufügen
            </button>
          </div>
        </div>

        {/* --- DELETE BEREICH --- */}
        <div style={{ 
          marginBottom: "30px", 
          padding: "25px", 
          borderRadius: "15px", 
          backgroundColor: "rgba(255, 235, 235, 0.93)", 
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}>
          <h3 style={{ color: "#991b1b", marginTop: 0 }}>Kategorie per ID löschen</h3>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
            <input
              type="number"
              placeholder="ID eingeben (z.B. 5)"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
              style={{ padding: "12px", width: "100%", maxWidth: "250px", borderRadius: "8px", border: "1px solid #fca5a5" }}
            />
            <button 
              onClick={() => deleteCategory(deleteId)} 
              style={{ 
                padding: "12px 30px", 
                backgroundColor: "#ef4444", 
                color: "white", 
                border: "none", 
                borderRadius: "8px", 
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              Kategorie löschen
            </button>
          </div>
        </div>

        {/* --- TABELLE --- */}
        <div style={{ overflowX: "auto", borderRadius: "15px", boxShadow: "0 8px 32px rgba(0,0,0,0.2)" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", backgroundColor: "white" }}>
            <thead>
              <tr style={{ backgroundColor: "#fbbf24", color: "#451a03" }}>
                <th style={{ padding: "15px", borderBottom: "2px solid #f59e0b" }}>ID</th>
                <th style={{ padding: "15px", borderBottom: "2px solid #f59e0b" }}>Kategoriename</th>
                <th style={{ padding: "15px", borderBottom: "2px solid #f59e0b" }}>Aktion</th>

                
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan="2" style={{ padding: "20px", textAlign: "center" }}>Lade Daten...</td></tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat.id} style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}