  import { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";

  export default function Frageliste() {
    const [questions, setQuestions] = useState([]);
    const [newQuestionName, setNewQuestionName] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const navigate = useNavigate(); // Fehler behoben

    const fetchQuestions = () => {
      fetch("http://localhost:8081/questions/allquestions")
        .then((res) => res.json())
        .then((data) => setQuestions(data))
        .catch((err) => console.error("Ladefehler:", err));
    };

    useEffect(() => {
      fetchQuestions();
    }, []);

    // ... (deleteQuestion und createQuestion Logik bleibt gleich)

    return (
      <div style={{ padding: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <h2>Fragenliste</h2>

        {/* ZENTRIERTER EINGABEBEREICH */}
        <div style={{ 
          marginBottom: "30px", 
          border: "1px solid #ccc", 
          padding: "20px", 
          borderRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px",
          backgroundColor: "#f9f9f9",
          width: "100%",
          maxWidth: "500px"
        }}>
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label>Neue Frage: </label>
            <input
              type="text"
              value={newQuestionName}
              onChange={(e) => setNewQuestionName(e.target.value)}
            />
            <button onClick={createQuestion} style={{ backgroundColor: "lightgreen" }}>Hinzufügen</button>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <label>Löschen (ID): </label>
            <input
              type="number"
              value={deleteId}
              onChange={(e) => setDeleteId(e.target.value)}
            />
            <button onClick={() => deleteQuestion(deleteId)} style={{ backgroundColor: "salmon" }}>Löschen</button>
          </div>
        </div>

        {/* TABELLE */}
        <table border="1" style={{ width: "90%", textAlign: "center", borderCollapse: "collapse", backgroundColor: "gold" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Kategorie</th>
              <th>Name</th>
              <th>Aktion</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((q) => (
              <tr key={q.id}>
                <td>{q.id}</td>
                <td>{q.kategorieId}</td>
                <td>{q.name}</td>
                <td>
                  <button onClick={() => deleteQuestion(q.id)}>Löschen</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }