import { useState } from 'react';
import Falsch from '../assets/Falsch.webp';
import Frage from '../assets/Frage.webp';
import Congratulations from '../assets/Congratulations.webp';
import Fussball from '../assets/Fussball.webp'; 
import { QuizButton } from './components/Buttons.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { alleFragen } from './components/QuestionDisplay.jsx'; 
import Spielregeln from './Spielregeln'; // Pfad eventuell anpassen

function SpielAnsicht() {
  const [statusBild, setStatusBild] = useState(Frage);
  const [quizGestartet, setQuizGestartet] = useState(false);
  const [frageIndex, setFrageIndex] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [btnColor, setButtonColor] = useState('red'); // Korrigiert: String statt Boolean
  const [clickedButtonText, setClickedButtonText] = useState(null); // Korrigiert: null statt 0

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

  const gefilterteFragen = (catId && !isNaN(catId))
    ? alleFragen.filter(f => Number(f.catId) === Number(catId))
    : alleFragen;

  const handleStartClick = () => {
    setIsBlue(true);
    setButtonColor('green'); // Visuelles Feedback
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
      startTime: new Date(), // Zeitmessung startet hier
      endTime: null
    });
  };

  const myHandler = (event) => {
    if (statusBild !== Frage) return;

    const gewaehlteAntwort = event.target.innerText.trim();
    const aktuelleFrage = gefilterteFragen[frageIndex];
    const istRichtig = gewaehlteAntwort === aktuelleFrage.correct_answer;

    setClickedButtonText(gewaehlteAntwort);

    if (istRichtig) {
      setStatusBild(Congratulations);
      alert("Korrekt! Die richtige Antwort ist: " + aktuelleFrage.correct_answer);

      setSession(prev => ({
        ...prev,                 // WICHTIG: Kopiert alte Werte (wie startTime)
        score: prev.score + 1,  // Score erhöhen
        richtig: prev.richtig + 1
      }));
    } else {
      setStatusBild(Falsch);
      alert("Falsch! Deine Antwort '" + gewaehlteAntwort + "' war leider nicht richtig.");

      setSession(prev => ({
        ...prev,  score: prev.score -1,             // WICHTIG: Kopiert alte Werte
        falsch: prev.falsch - 1  // Fehler hochzählen
      }));
    }

    setTimeout(() => {
      if (frageIndex < gefilterteFragen.length - 1) {
        setFrageIndex(prev => prev + 1);
        setStatusBild(Frage);
        setClickedButtonText(0);
      } else {
        // Zeitmessung beenden
        setSession(prev => ({ ...prev, endTime: new Date() }));
        setFrageIndex(gefilterteFragen.length);
      }
    }, 4000); // 7 Sekunden waren sehr lang, 2s sind meist besser für den Spielfluss
  };

  const berechneDauer = () => {
    if (!session.startTime || !session.endTime) return 0;
    // Differenz in Sekunden
    return Math.floor((session.endTime - session.startTime) / 1000);
  };

  return (
    <div className={`spiel-ansicht ${isBlue ? 'session-start-active' : ''}`}>
      {!quizGestartet ? (
        <div className="start-screen">
          <img src={Fussball} alt="Fussball" className="start-logo" />
          <h1 className="titel">Fussball-Quiz 2026</h1>
          <button 
            className={`startbutton ${btnColor === 'green' ? 'active-green' : 'default-red'}`} 
            onClick={handleStartClick}
          >
            Start des Quiz
          </button>
        </div>
      ) : frageIndex < gefilterteFragen.length ? (
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
        <div className="ergebnis-screen">
          <h1>Spielbericht</h1>
          <div className="stats">
            <p>Punkte: <strong>{session.score}</strong></p>
            <p>Richtige Antworten: {session.richtig} ✅</p>
            <p>Falsche Antworten: {session.falsch} ❌</p>
            <p>Beendet um: {session.endTime?.toLocaleTimeString()}</p>
            <p>Dauer: {berechneDauer()} Sekunden ⏱️</p>
          </div>
          <button onClick={() => navigate('/kategorien')}>Kategorien</button>
          <button onClick={() => setQuizGestartet(false)}>Nochmal spielen</button>
          <button onClick={()=> navigate('/fragen') }>Fragen</button>
        </div>
      )}
    </div>
  );
}

export default SpielAnsicht;