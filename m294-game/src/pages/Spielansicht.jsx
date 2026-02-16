import { useState } from 'react';
import Falsch from '../assets/Falsch.webp';
import Frage from '../assets/Frage.webp';
import Congratulations from '../assets/Congratulations.webp';
import Fussball from '../assets/Fussball.webp'; 
import { QuizButton } from './components/Buttons.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { alleFragen } from './components/QuestionDisplay.jsx'; 
// Das Bild für den Mouseover
import Fussballbild from '../assets/Fussballbild.webp';

function SpielAnsicht() {
  const [statusBild, setStatusBild] = useState(Frage);
  const [quizGestartet, setQuizGestartet] = useState(false);
  const [frageIndex, setFrageIndex] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [btnColor, setButtonColor] = useState('red');
  const [clickedButtonText, setClickedButtonText] = useState(null);

  // --- NEU: State für das Hintergrundbild (Mouseover) ---
  // Wir starten mit einem leeren String oder einer Standardfarbe
  const [bgImage, setBgImage] = useState('');

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

  // --- NEU: Handler Funktionen für das Bild ---
  const handleMouseEnter = () => {
    setBgImage(Fussballbild); // Setzt das Fussballbild beim Betreten
  };

  const handleMouseLeave = () => {
    setBgImage(''); // Entfernt das Bild beim Verlassen (Hintergrund wird wieder normal)
  };

  const handleStartClick = () => {
    setIsBlue(true);
    setButtonColor('green');
    setTimeout(() => {
      startQuiz();
      setIsBlue(false);
      setButtonColor('orange');
    }, 600);
  };

  const startQuiz = () => {
    setQuizGestartet(true);
    setFrageIndex(0);
    setStatusBild(Frage);
    setSession({
      score: 0, richtig: 0, falsch: 0,
      startTime: new Date(), endTime: null
    });
  };

  const myHandler = (event) => {
    if (statusBild !== Frage) return;
    const gewaehlteAntwort = event.target.innerText.trim();
    const aktuelleFrage = gefilterteFragen[frageIndex];
    if (!aktuelleFrage) return;

    const istRichtig = gewaehlteAntwort === aktuelleFrage.correct_answer;
    setClickedButtonText(gewaehlteAntwort);

    if (istRichtig) {
      setStatusBild(Congratulations);
      alert("Die Frage wurde korrekt beantwortet"+"Richtige Antwort ist:"+aktuelleFrage.correct_answer);
      setSession(prev => ({ ...prev, score: prev.score + 1, richtig: prev.richtig + 1 }));
    } else {
      setStatusBild(Falsch);
      alert("Deine Antwort"+gewaehlteAntwort+"ist leider falsch");
      setSession(prev => ({ ...prev,  score: prev.score-1, falsch: prev.falsch +1 }));
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
    }, 2000); 
  };

  const berechneDauer = () => {
    if (!session.startTime || !session.endTime) return 0;
    return Math.floor((session.endTime - session.startTime) / 1000);
  };

  return (
    <div 
      // Verbindung der Events mit dem Haupt-Container
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`spiel-ansicht ${isBlue ? 'session-start-active' : ''}`}
      style={{
        // Dynamisches Hintergrundbild
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out', // Sanfter Übergang
        minHeight: '100vh'
      }}
    >
      {!quizGestartet ? (
        <div className="start-screen">
          <h1 className="bounce-titel">Das Ultimative Fussball-Quiz 2026</h1>
          <button 
            className={`startbutton ${btnColor === 'green' ? 'active-green' : 'default-red'}`} 
            onClick={handleStartClick}
          >
            ⇛ Fussballgame starten ⇚
          </button>
        </div>
      ) : frageIndex < gefilterteFragen.length ? (
        <div className="quiz-container">
          <div className="session-header">
            <h1><span>Frage: {frageIndex + 1} / {gefilterteFragen.length}</span></h1>
          </div>
          <div className="image-container">
            <img src={statusBild} className="statusbild" alt="Status" />
          </div>
          <br></br>
        <p className="question-text">{gefilterteFragen[frageIndex].question}</p>
        
          <div className="buttons"><b>
              <h1>
            {gefilterteFragen[frageIndex].answers.map((antwort) => (
              <QuizButton 
                key={antwort} 
                text={clickedButtonText === antwort ? "Ausgewählt!" : antwort} 
                onKlick={myHandler} 
                disabled={statusBild !== Frage}
                
              />
            
          
            ))}
            </h1></b>
          </div>
          <h1><span>Aktueller Score:{session.score}</span></h1>

        </div>
        
      ) : (
        <div className="ergebnis-screen">
          <h1><ins>Spielbericht</ins></h1>
          <div className="stats-table-container">
            <table className="ergebnis-tabelle">
              <thead>
                <tr>
                  <th>Kategorie</th>
                  <th>Ergebnis</th>
                  <th>Spiel gewonnen?</th>
                </tr>
              </thead>
              <tbody>
                <tr className='richtig'><td>Richtige Antworten</td><td>{session.richtig}</td></tr>
                <tr className='falsch'><td>Falsche Antworten</td><td>{session.falsch}</td></tr>
                <tr><td>Differenz zwischen falschen und richtigen Antworten:</td><td>{session.richtig-session.falsch}</td></tr>
                <tr><td>Abschluss des Quiz um:</td><td>{session.endTime?.toLocaleTimeString()} Uhr</td></tr>
                <tr><td>Benötigte Zeit</td><td>{berechneDauer()} Sekunden</td></tr>
                <tr className='gesamtpunkte'><td><strong>Gesamtpunkte</strong></td><td><strong>{session.score}</strong></td></tr>
              </tbody>
            </table>
          </div>
          <div className="result-actions">
            <button className="nav-btn" onClick={() => navigate('/kategorien')}>Zu den Kategorien</button>
            <button className="retry-btn" onClick={() => setQuizGestartet(false)}>Quiz erneut starten</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SpielAnsicht;