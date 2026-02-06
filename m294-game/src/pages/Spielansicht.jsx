import { useState } from 'react';
import Falsch from '../assets/Falsch.webp';
import Frage from '../assets/Frage.webp';
import Congratulations from '../assets/Congratulations.webp';
import Fussball from '../assets/Fussball.webp'; 
import { QuizButton } from './components/Buttons.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { alleFragen } from './components/QuestionDisplay.jsx'; 

function SpielAnsicht() {
  const [statusBild, setStatusBild] = useState(Frage);
  const [quizGestartet, setQuizGestartet] = useState(false);
  const [frageIndex, setFrageIndex] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [btnColor, setButtonColor] = useState('red');
  const [clickedButtonText, setClickedButtonText] = useState(null);

  const [session, setSession] = useState({
    score: 0,
    richtig: 0,
    falsch: 0,
    startTime: null,
    endTime: null,
  });

  const [searchParams] = useSearchParams();
  const catId = searchParams.get('cat');
  const navigate = useNavigate();

  // Filter-Logik: Vergleicht die ID aus der URL mit der ID in der Fragen-Liste
  const gefilterteFragen = (catId && !isNaN(catId))
    ? alleFragen.filter(f => Number(f.catId) === Number(catId))
    : alleFragen;

  const handleStartClick = () => {
    setIsBlue(true);
    setButtonColor('green');
    setTimeout(() => {
      startQuiz();
      setIsBlue(false);
    }, 600);
  };

  const startQuiz = () => {
    setQuizGestartet(true);
    setFrageIndex(0);
    setStatusBild(Frage);
    setSession({
      score: 0,
      richtig: 0,
      falsch: 0,
      startTime: new Date(),
      endTime: null
    });
  };

  const myHandler = (event) => {
    if (statusBild !== Frage) return;

    const gewaehlteAntwort = event.target.innerText.trim();
    const aktuelleFrage = gefilterteFragen[frageIndex];
    
    // Falls keine Fragen zur Kategorie gefunden wurden, abbrechen
    if (!aktuelleFrage) return;

    //Konstant welche pro Frag edi eirchit antwoert ausliese
    const istRichtig = gewaehlteAntwort === aktuelleFrage.correct_answer;
    setClickedButtonText(gewaehlteAntwort);

    if (istRichtig) {
      setStatusBild(Congratulations);
      alert("Diese gewählte Antwort ist richtig:"+aktuelleFrage.correct_answer);
      setSession(prev => ({
        ...prev,
        score: prev.score + 1,
        richtig: prev.richtig + 1
      }));
    } else {
      setStatusBild(Falsch);
      alert("Die gewählte Antwort ist falsch"+gewaehlteAntwort);
      setSession(prev => ({
        ...prev,
        score: prev.score - 1,
        falsch: prev.falsch - 1 // Hier stand vorher -1, korrigiert auf +1
      }));
    }

    setTimeout(() => {
      if (frageIndex < gefilterteFragen.length - 1) {
        setFrageIndex(prev => prev + 1);
        setStatusBild(Frage);
        setClickedButtonText(null);
      } else {
        setSession(prev => ({ ...prev, endTime: new Date() }));
        setFrageIndex(gefilterteFragen.length);
      }
    }, 4000); // 2 Sekunden Pause ist angenehmer
  };

  const berechneDauer = () => {
    if (!session.startTime || !session.endTime) return 0;
    return Math.floor((session.endTime - session.startTime) / 1000);
  };

  return (
    <div className={`spiel-ansicht ${isBlue ? 'session-start-active' : ''}`}>
      {!quizGestartet ? (
        /* STARTBILDSCHIRM */
        <div className="start-screen">
          <img src={Fussball} alt="Fussball" className="start-logo" />
          <h1 className="titel">Fussball-Quiz 2026</h1>
          <button 
            className={`startbutton ${btnColor === 'green' ? 'active-green' : 'default-red'}`} 
            onClick={handleStartClick}
          >
           ⇛ Start des Quiz ⇚
          </button>
        </div>
      ) : frageIndex < gefilterteFragen.length ? (
        /* QUIZ LÄUFT */
        <div className="quiz-container">
          <div className="session-header">
            <span>Frage: {frageIndex + 1} / {gefilterteFragen.length}</span>
            <span> Aktueller Score: {session.score}</span>
          </div>
          <img src={statusBild} className="statusbild" alt="Status" />
          <p className="question-text">{gefilterteFragen[frageIndex].question}</p>
          <div className="buttons">
            {gefilterteFragen[frageIndex].answers.map((antwort) => (
              <QuizButton 
                key={antwort} 
                text={clickedButtonText === antwort ? "Ausgewählt!" : antwort} 
                onKlick={myHandler} 
              />
            ))}
          </div>
        </div>
      ) : (
        /* ERGEBNISSE */
        <div className="ergebnis-screen">
          <h1><ins>Spielbericht</ins></h1>
          <div className="stats">
            <p>Punkte: <strong>{session.score}</strong></p>
            <p>Richtige Antworten: {session.richtig} </p>
            <p>Falsche Antworten: {session.falsch} </p>
            <p>Beendet um: {session.endTime?.toLocaleTimeString()}</p>
            <p>Dauer: {berechneDauer()} Sekunden </p>
          </div>
          <button onClick={() => navigate('/kategorien')}>Zurück zur Auswahl</button>
          <button onClick={() => setQuizGestartet(false)}>Nochmal spielen</button>
        </div>
      )}
    </div>
  );
}

export default SpielAnsicht;