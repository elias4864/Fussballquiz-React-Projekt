import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fragen from "../../assets/Fragen.webp";

export default function Frageliste() {
  const [questions, setQuestions] = useState([]);
  const [newQuestionName, setNewQuestionName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();

  // Fragen laden
  const fetchQuestions = () => {
    fetch("http://localhost:8081/questions/allquestions")
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error("Ladefehler:", err));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  // NEUE FUNKTION: Frage erstellen
  const createQuestion = () => {
    if (newQuestionName.trim().length < 5) {
      alert("Die Frage ist zu kurz!");
      return;
    }

    fetch("http://localhost:8081/questions/add}", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newQuestionName }),
    })
      .then((res) => {
        if (res.ok) {
          setNewQuestionName(""); // Input leeren
          fetchQuestions(); // Liste aktualisieren
        }
      })
      .catch((err) => console.error("Fehler beim Erstellen:", err));
  };

  const deleteQuestion = (id) => {
    fetch(`http://localhost:8081/questions/delete/${id}`, { method: "DELETE" })
      .then(() => fetchQuestions())
      .catch((err) => console.error("Löschfehler:", err));
  };

  return (
    <div style={{ 
      // 1. ZENTRIERUNG & HÖHE
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      justifyContent: "flex-start", // Startet oben, zentriert aber horizontal
      minHeight: "100vh", 
                 // Nutzt immer die volle Bildschirmhöhe
      width: "100vw",   
                  // Volle Breite
      
      // 2. HINTERGRUNDBILD
      backgroundImage: `url(${Fragen})`, // Nutzt deinen Import oben
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",    // Bild bleibt beim Scrollen feststehen
      
      padding: "40px 20px",             // Abstand oben/unten und seitlich
      boxSizing: "border-box"
    }}>
      
      <h2 style={{ 
        textShadow: "2px 2px 4px brown", 
        color: "white", 
        fontSize: "2.5rem",
        maxWidth: "500px", // Hier wird die Breite gestoppt
      }}>
        Frageliste
      </h2>

      {/* EINGABEBOX */}
      <div style={{ 
        marginBottom: "30px", 
        border: "1px solid #ccc", 
        padding: "25px", 
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        maxWidth: "500px", // Hier wird die Breite gestoppt
        gap: "15px",
        backgroundColor: "rgba(249, 249, 249, 0.9)", // Leicht transparent
        width: "100%",
        maxWidth: "4000px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
      }}>
        {/* ... (Hinzufügen & Löschen Content bleibt gleich) ... */}
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ fontWeight: "bold" }}>Neue Frage hinzufügen: </label>
          <input
            type="text"
            placeholder="Frage eingeben..."
            value={newQuestionName}
            onChange={(e) => setNewQuestionName(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
          <button 
            onClick={createQuestion} 
            style={{ backgroundColor: "lightgreen", cursor: "pointer", fontWeight: "bold", padding: "8px 15px", border: "none", borderRadius: "5px" }}
          >
            Hinzufügen
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ fontWeight: "bold" }}>Löschen (ID): </label>
          <input
            type="number"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="ID eingeben"
            style={{ padding: "8px", width: "80px", borderRadius: "5px", border: "1px solid #ccc" }}
            required
          />
          <button 
            onClick={() => deleteQuestion(deleteId)} 
            style={{ backgroundColor: "salmon", cursor: "pointer", fontWeight: "bold", padding: "8px 15px", border: "none", borderRadius: "5px" }}
          >
            Löschen
          </button>
        </div>
      </div>

      {/* TABELLE */}
      <div style={{ width: "100%", maxWidth: "800px", overflowX: "auto" }}>
        <table border="1" style={{ 
          width: "100%", 
          textAlign: "center", 
          borderCollapse: "collapse", 
          backgroundColor: "rgba(255, 215, 0, 0.85)", // Gold mit leichter Transparenz
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#333", color: "gold" }}>
              <th style={{ padding: "12px" }}>ID</th>
              <th style={{ padding: "12px" }}>Name</th>
              <th style={{ padding: "12px" }}>Kategorie Id</th> 
              <th style={{ padding: "12px" }}>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <td style={{ padding: "10px" }}>{q.id}</td>
                <td style={{ padding: "10px" }}>{q.question}</td>
                <td style={{ padding: "10px" }}>{q.category_id || "N/A"}</td>
                <td style={{ padding: "10px" }}>
                  <button 
                    onClick={() => deleteQuestion(q.id)} 
                    style={{ cursor: "pointer", backgroundColor: "white", border: "1px solid red", borderRadius: "3px", color: "red" }}
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}