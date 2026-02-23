import { useState } from "react";

export default function Frageform() {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false },
  ]);
  
  // State für die Anzeige der vom Server zurückgegebenen Daten
  const [savedQuestion, setSavedQuestion] = useState(null);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };


  //Die richtigen Antworten werden gemappt
  const handleCorrectChange = (index) => {
    const newAnswers = answers.map((ans, i) => ({
      ...ans,
      correct: i === index,
    }));
    setAnswers(newAnswers);
  };

const submit = async (e) => {
    e.preventDefault();

    // 1. Validierung: Prüfen, ob der Fragetext überhaupt existiert
    if (!questionText.trim()) {
      return alert("Bitte gib einen Fragetext ein, bevor du speicherst.");
    }

    // Prüfen, ob eine Antwort als "Richtig" markiert wurde
    const hasCorrectAnswer = answers.some(ans => ans.correct);
    if (!hasCorrectAnswer) {
      return alert("Bitte markiere eine der Antworten als 'Richtig'.");
    }

    // 2. Bestätigung (Confirm): Erst jetzt fragen wir den User
    const confirmSend = window.confirm(
      `Möchtest du diese Frage speichern?\n\n"${questionText}"`
    );
    
    if (!confirmSend) return; // Abbrechen, wenn der User "Abbrechen" klickt
    // 3. Payload vorbereiten, der die Eingabe der Frage im question paamet abepscie rudn dei antwroten in answers
    const payload = {
      question: questionText,
      answers: answers,
    };



   
    // 4. Senden (Fetch)
    try {
      const response = await fetch("http://localhost:8081/questions/createcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        setSavedQuestion(data);
        alert("Erfolgreich gespeichert!");
        
        // Formular leeren
        setQuestionText("");
        setAnswers(answers.map(a => ({ answer: "", correct: false })));
      } else {
        alert("Server-Fehler: Die Frage konnte nicht gespeichert werden.");
      }
    } catch (error) {
      console.error("Fehler:", error);
      alert("Netzwerkfehler: Keine Verbindung zum Backendserver.");
    }
  };

  return (
    <div style={{ background: "#05377c", color: "orange", padding: "20px", borderRadius: "8px", maxWidth: "500px", justifyContent: "center", }}>
      <h2>Neue Frage hinzufügen</h2>
      <form onSubmit={submit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Name der Frage </label>
          <input
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            placeholder="z.B. SQL steht für"
            required
            style={{ width: "100%", padding: "8px", marginTop: "5px",  textAlign:"center" }}
          />
        </div>

        

        {answers.map((ans, i) => (
          <div key={i} style={{ margin: "10px 0", borderBottom: "1px solid #444", paddingBottom: "10px" }}>
            <label>Antwort {i + 1} </label>
            <input
              type="text"
              value={ans.answer}
              onChange={(e) => handleAnswerChange(i, e.target.value)}
              required
              style={{ marginRight: "10px" }}
            />
            <input
              type="radio"
              name="correct"
              checked={ans.correct}
              onChange={() => handleCorrectChange(i)}
              required
            /> 
            <span> Richtig</span>
          </div>
        ))}
        
        <button className="button button1" type="submit" style={{ cursor: "pointer", padding: "10px 20px",  }}>
          Frage absenden
        </button>
      </form>

      {savedQuestion && (
        <div style={{ marginTop: "20px", padding: "15px", background: "#333", borderLeft: "4px solid #4CAF50" }}>
          <h3>Zuletzt gespeicherte Frage:</h3>
          <p><strong>Frage:</strong> {savedQuestion.question}</p>
          <ul>
            {savedQuestion.answers.map((a, idx) => (
              <li key={idx} style={{ color: a.correct ? "#4CAF50" : "white" }}>
                {a.answer} {a.correct ? "(Korrekt)" : ""}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}