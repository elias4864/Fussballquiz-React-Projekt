import { useState, useEffect } from "react";

export default function Frageliste() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/questions/allquestions")
      .then(res => res.json())
      .then(data => setQuestions(data))
      .catch(err => console.error("Fehler beim Laden:", err));
  }, []);

  const deleteQuestion = async (id) => {
    try {
      const response = await fetch(`http://localhost:8081/questions/delete/${id}`, {
        method: "DELETE"
      });

      if (response.ok) {
        // Löschen im DOM (State aktualisieren)
        setQuestions(prev => prev.filter(q => q.id !== id));
      }
    } catch (error) {
      console.error("Fehler beim Löschen:", error);
    }
  };

  return (
    <div>
      <h2>Fragenliste</h2>
      <table border="1" style={{ width: "100%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Frage</th>
            <th>Bearbeiten</th> {/* Spalte laut Aufgabe */}
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id}>
              <td>{q.id}</td>
              <td>{q.question}</td>
              <td>
                <button onClick={() => deleteQuestion(q.id)} style={{ color: "red" }}>
                  Löschen
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}