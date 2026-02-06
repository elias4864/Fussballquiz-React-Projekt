
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auswertung() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Daten aus dem State holen (mit Fallback, falls jemand die Seite direkt aufruft)
  const { ergebnisse, score } = location.state || { ergebnisse: [], score: 0 };


  

  
  const alleFragen = [
    {
      id: 1,
      catId: 1, // Beispiel: Kategorie 'Schweizer Nationalspieler'
      question: "Welche Position spielt Yann Sommer?",
      answers: ["Verteidiger", "Mittelfeld", "Torwart", "Sturm"],
      correct_answer: "Torwart"
    },
    {
      id: 2,
      catId: 2, // Beispiel: Kategorie 'Legenden'
      question: "In welchem Jahr wurde Diego Maradona geboren?",
      answers: ["1955", "1960", "1965", "1970"],
      correct_answer: "1960"
    },
    {
      id: 3,
      catId: 1,
      question: "Für welche Nationalität spielt Kylian Mbappé?",
      answers: ["Portugal", "Spanien", "Frankreich", "Schweiz"],
      correct_answer: "Frankreich"
    },
    {
      id: 4,
      catId: 1,
      question: "Welcher dieser Spieler ist ein Verteidiger?",
      answers: ["Xherdan Shaqiri", "Manuel Akanji", "Breel Embolo", "Cristiano Ronaldo"],
      correct_answer: "Manuel Akanji"
    },
  
    { id:5, 
      catId: 1,
      question : "Welcher Spieler hat die EM 2008 und EM 2012 gewonnen?",
      answers: ["Iker Casillas", "Oliver Kahn","Christiano Ronaldo","Pelé"],
      correct_answer: "Iker Casillas"
  
    },
  
    { id: 6, catId: 1, question: "Wie viele Tore erzielte Kylian Mpappé im letzen Spiel?",
      answers: ["4 Tore", "2 Tore", "3 Tore", "1 Tor"],
      correct_answer: "4 Tore"
  
  
    },
  
   
    { id: 7, catId: 30, question : "Welche Position spielt Shaquiri?",
      answers: ["Mittelfeld","Sturm","Verteidiger","Torwart"],
      correct_answer:"Mittelfeld"
  
    },
  
  ];




  const QuestionDisplay = ({
    frage,
    statusBild,
    frageNummer,
    gesamtFragen,
    onAntwort
  }) => {
    // Sicherheits-Check: Falls 'frage' noch lädt oder undefined ist
    if (!frage) return <div>Lade Frage...</div>;
  
    return (
      <div className="quiz-container">
        <div className="session-header">
          <span>Frage: {frageNummer} / {gesamtFragen}</span>
        </div>
  
        <img src={statusBild} className="statusbild" alt="Status" />
  
        <p className="question-text">{frage.question}</p>
  
        <div className="buttons">
          {/* Wir nutzen den Index 'i' zur Sicherheit beim Key */}
          {frage.answers.map((antwort, i) => (
            <QuizButton
              key={`${frage.id}-${i}`} 
              text={antwort}
              // Achte darauf, ob dein QuizButton 'onKlick' oder 'onClick' erwartet!
              onKlick={() => onAntwort(antwort)} 
            />
          ))}
        </div>
      </div>

      







  
    );
  };
  
  
  







<button 
        className="kategorie" 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        onClick={() => navigate('/kategorien')}
      >
        Zurück zur Auswahl
      </button>
  

}



  




  // ✅ korrekt
  
