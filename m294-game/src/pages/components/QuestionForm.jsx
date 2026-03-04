import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Frageform() {
  const [questionText, setQuestionText] = useState("");
  const [difficulty, setDifficulty] = useState("leicht");
  const navigate = useNavigate();
  const [savedQuestion, setSavedQuestion] = useState(null);

  // State als Objekt (passend zur SQL-Struktur)
  const [answers, setAnswers] = useState({
    correctAnswer: "", 
    wrong_answer1: "",
    wrong_answer2: "",
    wrong_answer3: "",
  });

  // Einfacher Handler für Objekt-States
  const handleFieldChange = (field, value) => {
    setAnswers((prev) => ({ ...prev, [field]: value }));
  };

  const submit = async (e) => {
    e.preventDefault();


      if (questionText.trim().length < 3) {
      alert("Bitte einen Namen eingeben, der mindestens 3 Zeichen lang ist.");
      return;
    }

    // 1. Validierung
    if (!questionText.trim() || !answers.correctAnswer.trim()) {
      return alert("Bitte Fragetext und richtige Antwort ausfüllen.");
    }

    // 2. Bestätigung
    const confirmSend = window.confirm(`Möchtest du diese Frage speichern?\n\n"${questionText}"`);
    if (!confirmSend) return;

    // 3. Payload für das Backend (CamelCase für correctAnswer!)
    const payload = {
      question: questionText,
      correctAnswer: answers.correctAnswer,
          wrong_answer1: answers.wrong_answer1,
          wrong_answer2: answers.wrong_answer2,
          wrong_answer3: answers.wrong_answer3,
          difficulty: difficulty,
          player_id: 10, 
    };

    // 4. API Request
    try {
      const response = await fetch("http://localhost:8081/questions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });
         
      if (response.ok) {
        const data = await response.json();
        setSavedQuestion(data);
        alert("Erfolgreich gespeichert!");

        // Formular leeren
        setQuestionText("");
        setAnswers({
          correctAnswer: "",
          wrong_answer1: "",
          wrong_answer2: "",
          wrong_answer3: "",
        });
      } else {
        alert("Server-Fehler: Die Frage konnte nicht gespeichert werden.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Netzwerkfehler: Keine Verbindung zum Backendserver.");
    }
  };

  return (
    <div style={{ background: "#05377c", color: "orange", padding: "20px", borderRadius: "8px", maxWidth: "500px", margin: "0 auto", textAlign: "center", minHeight: "100vh" }}>
      <h2 style={{ textShadow: "2px 2px red" }}>Neue Frage hinzufügen</h2>
      
      <form onSubmit={submit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name der Frage</label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="z.B. Wer ist Rekordmeister?"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px", textAlign: "center" }}
          />
        </div>

        {/* Richtige Antwort - Grüner Fokus */}
        <div style={{ margin: "10px 0", padding: "10px", background: "rgba(0,255,0,0.1)", borderRadius: "8px" }}>
          <label style={{ color: "#2ecc71" }}>Richtige Antwort</label>
          <input
            type="text"
            value={answers.correctAnswer}
            onChange={(e) => handleFieldChange("correctAnswer", e.target.value)}
            required
            style={{ width: "100%", padding: "8px", border: "2px solid #2ecc71", borderRadius: "8px", textAlign: "center" }}
          />
        </div>

        {/* Falsche Antworten */}
        {[1, 2, 3].map((num) => (
          <div key={num} style={{ margin: "10px 0" }}>
            <label>Falsche Antwort {num}</label>
            <input
              type="text"
              value={answers[`wrong_answer${num}`]}
              onChange={(e) => handleFieldChange(`wrong_answer${num}`, e.target.value)}
              required
              style={{ width: "100%", padding: "8px", borderRadius: "8px", textAlign: "center" }}
            />
          </div>
        ))}

        <div style={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
          <button type="submit" style={{ cursor: "pointer", padding: "10px 20px", background: "orange", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
            Frage absenden
          </button>
          <button type="button" onClick={() => navigate("/frageliste")} style={{ cursor: "pointer", padding: "10px 15px", backgroundColor: "gold", color: "#05377c", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
            Zur Frageliste
          </button>
        </div>
      </form>

      {/* Die korrigierte Vorschau für die Tabelle/Datenbank-Struktur */}
      {savedQuestion && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#333", borderLeft: "4px solid #4CAF50", textAlign: "left" }}>
          <h3 style={{ color: "white" }}>Zuletzt gespeichert:</h3>
          <p><strong>Frage:</strong> {savedQuestion.question}</p>
          <p style={{ color: "#4CAF50" }}>Richtig: {savedQuestion.correctAnswer}</p>
          <p style={{ color: "orange" }}> Falsch: {savedQuestion.wrong_answer1}</p>
          <p style={{ color: "orange" }}> Falsch: {savedQuestion.wrong_answer2}</p>
          <p style={{ color: "orange" }}> Falsch: {savedQuestion.wrong_answer3}</p>
        </div>
      )}
    </div>
  );
}