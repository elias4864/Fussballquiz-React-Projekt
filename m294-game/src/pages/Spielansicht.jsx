import { useState } from 'react';
import Falsch from '../assets/Falsch.webp';
import Frage from '../assets/Frage.webp';
import Congratulations from '../assets/Congratulations.webp';
import Fussball from '../assets/Fussball.webp'; 
import { QuizButton } from './components/Buttons.jsx';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { alleFragen } from './components/QuestionDisplay.jsx'; 
import Fussballbild from '../assets/Fussballbild.webp';
import  Gamegewonnen from '../assets/Spielgewonnen.gif';
function SpielAnsicht() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const catId = searchParams.get('cat');

  const [lösungshinweis, setLösungshinweis] = useState("");

  // 1. Zuerst die Fragen filtern
  const gefilterteFragen = (catId && !isNaN(catId))
    ? alleFragen.filter(f => Number(f.catId) === Number(catId))
    : alleFragen;

  // 2. Alle States definieren
  const [statusBild, setStatusBild] = useState(Frage);
  const [quizGestartet, setQuizGestartet] = useState(false);
  const [frageIndex, setFrageIndex] = useState(0);
  const [isBlue, setIsBlue] = useState(false);
  const [btnColor, setButtonColor] = useState('red');
  const [clickedButtonText, setClickedButtonText] = useState(null);
  const [bgImage, setBgImage] = useState('');


  <p id="ronaldo"></p>
const eventhandler = () => {
    const element = document.getElementById("ronaldo").innerHTML = "..der  absolute Fussballgott  und bis Europameister 2026!"
  };


  const [session, setSession] = useState({
    score: 0,
    richtig: 0,
    falsch: 0,
    startTime: null,
    endTime: null,
  });

  // 3. Logik-Variablen (Müssen NACH session und gefilterteFragen stehen!)
  const Spielgewonnen = session.richtig === gefilterteFragen.length && gefilterteFragen.length > 0;
  const istNegativ = session.score < 0;

  // --- Handler Funktionen ---
  const handleMouseEnter = () => setBgImage(Fussballbild);

  const handleStartClick = () => {
    setIsBlue(true);
    setButtonColor('green');
    setTimeout(() => {
      startQuiz();
      setIsBlue(false);
      setClickedButtonText(null);
      setButtonColor('orange');
      setLoesungsHinweis(""); // Hinweis für nächste Frage löschen
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


  const handleQuizEnd = () => {
  navigate('/auswertung', { 
    state: { 
      ergebnisse: alleFragenAntworten, // Array mit Fragen und Antworten
      score: aktuellerScore, 
      richtig: anzahlRichtig, 
      falsch: anzahlFalsch 
    } 
  });
};

 const getBewertung = () => {
    const quote = session.richtig / gefilterteFragen.length;
    if (quote === 1) return { sterne: "⭐⭐⭐⭐⭐", text: "Weltklasse! Du bist der absolute Quizkönig und Europasieger!" };
    if (quote >= 0.8) return { sterne: "⭐⭐⭐⭐", text: "Ausgezeichnete Leistung-fast so gut wie Ronalod  " };
    if (quote >= 0.5) return { sterne: "⭐⭐⭐", text: "Solide Mittelklasse-Du kannst dich noch steigern bis zum Spitzen" };
    if (quote > 0) return { sterne: "⭐⭐", text: "Da ist noch Luft nach oben – Ab ins Quiztraining!" };
    return { sterne: "⭐", text: "Amateur Fussball-Trainiere dein Allgemeinwissem über Fussball  täglich häufiger!." };
  };

  const bewertung = getBewertung();



  const myHandler = (event) => {
    if (statusBild !== Frage) return;
    const gewaehlteAntwort = event.target.innerText.trim();
    const aktuelleFrage = gefilterteFragen[frageIndex];
    if (!aktuelleFrage) return;

    const istRichtig = gewaehlteAntwort === aktuelleFrage.correct_answer;
    setClickedButtonText(gewaehlteAntwort);

    if (istRichtig) {
      setStatusBild(Congratulations);
      alert("Die ausgewählte Antwort ist korrekt:"+aktuelleFrage.correct_answer);
      setSession(prev => ({ ...prev, score: prev.score + 1, richtig: prev.richtig + 1 }));
    } else {
      setStatusBild(Falsch);
      alert("Deine Antwort:"+gewaehlteAntwort+""+"ist leider falsch");
      alert("Die Richtige Antwort ist"+aktuelleFrage.correct_answer);
      
      setSession(prev => ({ ...prev, score: prev.score - 1, falsch: prev.falsch + 1 }));
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
      onMouseEnter={handleMouseEnter}
      className={`spiel-ansicht ${isBlue ? 'session-start-active' : ''}`}
      style={{
        backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        transition: 'background-image 1s ease-in-out',
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
          <p className="question-text">{gefilterteFragen[frageIndex].question}</p>
          
          
          <div className="buttons">

            
            
            
            
            
            {gefilterteFragen[frageIndex].answers.map((antwort) => (
              <QuizButton 
                key={antwort} 
                text={clickedButtonText === antwort ? "Ausgewählt!" : antwort} 
                onKlick={myHandler} 
                disabled={statusBild !== Frage}
              />
            ))}
          </div>
          <h1 className="score"><span>Aktueller Score: {session.score}</span></h1>
        </div>
      ) : (
        <div className="ergebnis-screen">
          <h1><ins>Spielbericht</ins></h1>
        
        
          {istNegativ && (
    <div className="game-over-container">
      <img src={Falsch} alt="Game Over" style={{ width: '200px', height:'300px', borderRadius: '10px' }} />
      <h2 className="gameover">❌ GAME OVER(negativer Punktestand)</h2>
    </div>
  )}

  {Spielgewonnen && (
    <div className="win-container">
       <img src={Gamegewonnen} alt="Winner" style={{ width: '400px' , height:'400px'}} />
       <h2 style={{color: 'gold'}}> Du hast das Spiel erfolgreich geschafft und alle Fragen korrekt beantwortet!  ....</h2>
       <button onClick={eventhandler}>Du bist der... </button>
    </div>
  )}
          

          
          <div className="stats-table-container">
            <table className="ergebnis-tabelle">
              <thead>
                <tr>
                  <th>Kategorie</th>
                  <th>Ergebnis</th>
                </tr>
              </thead>
              <tbody>
                <tr className='richtig'><td>Richtige Antworten</td><td>{session.richtig}</td></tr>
                 <tr className='falsch'><td>Falsche Antworten</td><td>{session.falsch}</td></tr>

                <tr className='differenz'><td>Differenz Richtig/Falschen Antworten</td><td>{session.richtig-session.falsch}</td></tr>
                <tr className='time'><td> Benötigte Zeit:</td> {berechneDauer()} Sekunden</tr>
                <tr className='gesamtpunkte'>
                  <td><strong>Gesamtpunkte</strong></td>
                  <td><strong>{session.score}</strong></td>
                </tr>
                <tr>
                  <td>Endergebnis:</td>
                  <td className="endergebnis">
                    {Spielgewonnen ? "🥇 CHAMPION!!" : istNegativ ? "💀 Spiel verloren!" : "🏁 Beendet"}
                  </td>
                </tr>
                <tr style={{ backgroundColor: '#f0f8ff' }}>
                  <td><strong>Spielleistung</strong></td>
                  <td>
                    <div style={{ fontSize: '50px' }}>{bewertung.sterne}</div>
                    <div style={{ fontStyle: 'italic', fontSize: '14px' }}>{bewertung.text}</div>
                  </td>
                </tr>

              </tbody>
               {Spielgewonnen && <h2 style={{color: 'gold'}}>🏆 SPIEL GEWONNEN! (Alle Antworten  korrekt!)</h2>}
               

          
          <div className="stats-table-container"></div>
            </table>


          </div>
          <div className="result-actions">
            <button className="nav-btn" onClick={() => navigate('/kategorien')}>Zu den Kategorien</button>
            <button className="retry-btn" onClick={() => setQuizGestartet(false)}>Erneut versuchen</button>
            <button className="retry-btn" onClick={() => navigate('/spielregeln')}>Konsultiere nochmals die SPielregeln um deien Spielleistung zu verbesesrn</button>
            
            
          </div>
        </div>
      )}
    </div>
  );
}

export default SpielAnsicht;