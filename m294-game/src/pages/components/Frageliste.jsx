import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FragenBg from "../../assets/Fragen.webp";

export default function Frageliste() {
  const [questions, setQuestions] = useState([]);
  const [newQuestionName, setNewQuestionName] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:8081/questions/allquestions");
      if (!response.ok) throw new Error("Server antwortet nicht");
      const data = await response.json();
      setQuestions(data);
    } catch (err) {
      console.error("Ladefehler:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const createQuestion = async () => {
    if (newQuestionName.trim().length < 5) {
      alert("Die Frage muss mindestens 5 Zeichen lang sein!");
      return;
    }

    if (!window.confirm(`Frage hinzufügen?\n\n"${newQuestionName}"`)) return;

    // KORREKTUR: Keys passend zu deinem Backend (correctAnswer statt correct_answer)
    const newQuestionData = {
      question: newQuestionName,
      correctAnswer: "Standard Antwort", // WICHTIG: Hier correctAnswer schreiben!
      wrong_answer1: "Falsch 1",
      wrong_answer2: "Falsch 2",
      wrong_answer3: "Falsch 3"
    };

    try {
      const response = await fetch("http://localhost:8081/questions/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestionData),
      });

      if (response.ok) {
        alert("Erfolgreich hinzugefügt!");
        setNewQuestionName("");
        fetchQuestions();
      }
    } catch (err) {
      alert("Fehler beim Senden.");
    }
  };

  const deleteQuestion = async (id, e) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Wirklich löschen?")) return;

    try {
      const response = await fetch(`http://localhost:8081/questions/delete/${id}`, {
        method: "DELETE",
      });
      if (response.ok) fetchQuestions();
    } catch (err) {
      alert("Löschfehler.");
    }
  };

  return (
    <div style={{ padding: "20px", backgroundImage: `url(${FragenBg})`, backgroundSize: "cover", minHeight: "100vh" }}>
      <h2 style={{ color: "white", textAlign: "center", textShadow: "2px 2px brown", fontSize: "50px" }}>Frageliste</h2>

      <div style={{ marginBottom: "20px", textAlign: "center", background: "rgba(255,255,255,0.9)", padding: "15px", borderRadius: "8px" }}>
        <input
          value={newQuestionName}
          onChange={(e) => setNewQuestionName(e.target.value)}
          placeholder="Neue Frage eingeben..."
          style={{ padding: "10px", width: "60%", marginRight: "10px", borderRadius: "4px" }}
          required
        />
        <button onClick={createQuestion} style={{ padding: "10px 20px", backgroundColor: "#28a745", color: "white", border: "none", cursor: "pointer" }}>
          Hinzufügen
        </button>
      </div>

      <table style={{ width: "100%", background: "white", borderRadius: "10px", borderCollapse: "collapse", boxShadow: "0 4px 8px rgba(0,0,0,0.2)" }}>
        <thead>
          <tr style={{ background: "gold", color: "black" }}>
            <th style={{ padding: "12px" }}>ID</th>
            <th style={{ padding: "12px" }}>Frage</th>
            <th style={{ padding: "12px" }}>Korrekte Antwort</th>
            <th style={{ padding: "12px" }}>Aktion</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="4" style={{ padding: "20px", textAlign: "center" }}>Lade Fragen...</td></tr>
          ) : (
            questions.map((q) => (
              <tr key={q.id} onClick={() => navigate(`/questions/${q.id}`)} style={{ cursor: "pointer", borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "12px", textAlign: "center" }}>{q.id}</td>
                <td style={{ padding: "12px" }}>{q.question}</td>
                
                {/* KORREKTUR: Hier wird jetzt q.correctAnswer genutzt */}
                <td style={{ padding: "12px", textAlign: "center", color: q.correctAnswer ? "green" : "red", fontWeight: "bold" }}>
                  {q.correctAnswer }
                </td>

                <td style={{ padding: "12px", textAlign: "center" }}>
                  <button onClick={(e) => deleteQuestion(q.id, e)} style={{ backgroundColor: "#ff4d4d", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px", cursor: "pointer" }}>
                    Löschen
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}