import { QuizButton } from './Buttons.jsx';

export const alleFragen = [
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

];
// ✅ korrekt
const QuestionDisplay = ({
  frage,
  statusBild,
  frageNummer,
  gesamtFragen,
  onAntwort
}) => {

  //Return Block der angezeigt wird 
  return (
    <div className="quiz-container">
      <div className="session-header">
        
        <span>Frage: {frageNummer} / {gesamtFragen}</span>
      </div>

      <img src={statusBild} className="statusbild" alt="Status" />

      <p className="question-text">{frage.question}</p>

      <div className="buttons">
        {frage.answers.map((antwort) => (
          <QuizButton
            key={antwort}
            text={antwort}
            onKlick={() => onAntwort(antwort)}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionDisplay;
