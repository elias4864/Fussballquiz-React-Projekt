import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fragen from "../../assets/Fragen.webp";

export default function Frageliste() {

  //Use States um einzelne Kateogrin zu löschen 
  const [questions, setQuestions] = useState([]);
  const [newQuestionName, setNewQuestionName] = useState("");
  const [deleteId, setDeleteId] = useState("");
  const navigate = useNavigate();

  // 1. Fragen vom Server laden
 

  useEffect(() => {
    fetchQuestions();
  }, []);

  // 2. Neue Frage erstellen
  const createQuestion = async (e) => {
    if (e) e.preventDefault();






    // Füge dies oben in deinem Component hinzu (vor dem useEffect)
const fetchQuestions = async () => {
  try {
    const response = await fetch("http://localhost:8081/questions/allquestions");
    if (!response.ok) throw new Error("Fehler beim Laden");
    const data = await response.json();
    setQuestions(data); // Hier wird der State gesetzt!
  } catch (err) {
    console.error("Ladefehler:", err);
  }
};
    

    if (newQuestionName.trim().length < 5) {
      alert("Die Frage muss mindestens 5 Zeichen lang sein!");
      return;
    }

    const newQuestionData = {
      question: newQuestionName,
      correctAnswer: "Test Antwort",
      wrong_answer1: "Falsch 1",
      wrong_answer2: "Falsch 2",
      wrong_answer3: "Falsch 3",
      category: null,
      league: null,
      difficulty: null,
      team: null
    };

    try {
      const response = await fetch("http://localhost:8081/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(newQuestionData),
      });

      if (!response.ok) {
        throw new Error(`Fehler beim Speichern: ${response.statusText}`);
      }

      setNewQuestionName(""); // Input leeren
      fetchQuestions();       // Liste aktualisieren
    } catch (err) {
      console.error("Sende-Fehler:", err);
      alert("Server-Fehler: Konnte die Frage nicht speichern.");
    }
  };

  // 3. Frage löschen
  const deleteQuestion = (id) => {
    if (!id) return;
    fetch(`http://localhost:8081/questions/delete/${id}`, { method: "DELETE" })
      .then(() => {
        setDeleteId(""); // ID-Feld leeren
        fetchQuestions();
      })
      .catch((err) => console.error("Löschfehler:", err));
  };

  return (
    <div style={{ 
      display: "flex", 
      flexDirection: "column", 
      alignItems: "center", 
      minHeight: "100vh", 
      width: "100vw",
      backgroundImage: `url(${Fragen})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      padding: "40px 20px",
      boxSizing: "border-box"
    }}>
      
      <h2 style={{ textShadow: "2px 2px 4px brown", color: "white", fontSize: "2.5rem" }}>
        Frageliste
      </h2>

      {/* EINGABEBOX */}
      <div style={{ 
        marginBottom: "30px", 
        padding: "25px", 
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "15px",
        backgroundColor: "rgba(249, 249, 249, 0.9)",
        width: "100%",
        maxWidth: "600px",
        boxShadow: "0 10px 25px rgba(0,0,0,0.3)"
      }}>
        <div style={{ display: "flex", gap: "10px", alignItems: "center",    }}>
          <label style={{ fontWeight: "bold" }}>Neue Frage: </label>
          <input
            type="text"
            placeholder="Frage eingeben..."
            value={newQuestionName}
            onChange={(e) => setNewQuestionName(e.target.value)}
            style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={createQuestion} style={{ backgroundColor: "lightgreen", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Hinzufügen
          </button>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <label style={{ fontWeight: "bold" }}>Löschen (ID): </label>
          <input
            type="number"
            value={deleteId}
            onChange={(e) => setDeleteId(e.target.value)}
            placeholder="ID"
            style={{ padding: "8px", width: "80px", borderRadius: "5px", border: "1px solid #ccc" }}
          />
          <button onClick={() => deleteQuestion(deleteId)} style={{ backgroundColor: "salmon", padding: "8px 15px", border: "none", borderRadius: "5px", cursor: "pointer" }}>
            Löschen
          </button>
        </div>
      </div>

      {/* TABELLE */}
      <div style={{ width: "100%", maxWidth: "800px", overflowX: "auto",  width: "100%",
  maxWidth: "800px"}}>
        <table style={{ width: "100%", textAlign: "center", borderCollapse: "collapse", backgroundColor: "gold", borderRadius: "10px", overflow: "hidden" }}>
          <thead>
            <tr style={{ backgroundColor: "red", color: "gold" }}>
              <th style={{ padding: "15px" }}>ID</th>
              <th style={{ padding: "15px" }}>Frage</th>
              <th style={{ padding: "30px" }}>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id} style={{ borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
                <td style={{ padding: "10px" }}>{q.id}</td>
                <td style={{ padding: "10px" }}>{q.question}</td>
                <td style={{ padding: "10px" }}><td></td>
                  <button 
                    onClick={() => deleteQuestion(q.id)} 
                    style={{ cursor: "pointer", backgroundColor: "white", border: "1px solid red", color: "red", borderRadius: "3px" }}
                  >
                    Löschen
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <div style={{ marginTop: "20px" }}>
          <button 
            onClick={() => navigate(`/new-question`)} 
            style={{ backgroundColor: "orange", color: "white", border: "none", borderRadius: "5px", padding: "10px 20px", cursor: "pointer" }}
          >
            Neue Seite öffnen
          </button>
        </div>
      </div>
    </div>
  );
}