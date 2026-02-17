import { useState } from "react";

export default function Frageform() {
  const [questionText, setQuestionText] = useState("");
  const [answers, setAnswers] = useState([
    { answer:  "", correct: false },
    { answer: "", correct: false },
    { answer: "", correct: false }
  ]);

  const handleAnswerChange = (index, value) => {
    const newAnswers = [...answers];
    newAnswers[index].answer = value;
    setAnswers(newAnswers);
  };

  const handleCorrectChange = (index) => {
    const newAnswers = answers.map((ans, i) => ({
      ...ans,
      correct: i === index
    }));
    setAnswers(newAnswers);
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      question: questionText,
      answers: answers
    };

    try {
      const response = await fetch("http://localhost:8081/questions/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Frage wurde am Server gespeichert!");
      }
    } catch (error) {
      console.error("Fehler:", error);
    }
  };

  return (
    <div style={{ background: "#222", color: "white", padding: "20px", borderRadius: "8px" }}>
      <h2>Neue Frage hinzufügen</h2>
      <form onSubmit={submit}>
        <label>Fragetext </label>
        <input 
          type="text" 
          value={questionText} 
          onChange={(e) => setQuestionText(e.target.value)} 
          placeholder="z.B. SQL steht für"
          required 
        />
        
        {answers.map((ans, i) => (
          <div key={i} style={{ margin: "10px 0" }}>
            <label>Antwort {i + 1} </label>
            <input 
              type="text" 
              value={ans.answer} 
              onChange={(e) => handleAnswerChange(i, e.target.value)} 
              required 
            />
            <input 
              type="radio" 
              name="correct" 
              checked={ans.correct} 
              onChange={() => handleCorrectChange(i)} 
            /> Richtig
          </div>
        ))}
        <button type="submit">Frage hinzufügen</button>
      </form>
    </div>
  );
}