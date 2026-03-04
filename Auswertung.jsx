import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// Fortschrittsbalken-Komponente (wie besprochen)
const ProgressBar = ({ richtig, gesamt }) => {
  const prozent = gesamt > 0 ? Math.round((richtig / gesamt) * 100) : 0;
  const getFarbe = (p) => {
    if (p < 50) return '#e74c3c'; // Rot
    if (p < 80) return '#f1c40f';
    if(p<120) return 'blue';// Gelb
    if(p==100 )return '#2ecc71'; 
    
  };

  return (
    <div style={{ margin: '20px 0', width: '100%' }}>
      <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Trefferquote: {prozent}%</div>
      <div style={{ width: '100%', backgroundColor: '#ddd', borderRadius: '10px', height: '20px', overflow: 'hidden' }}>
        <div style={{ 
          width: `${prozent}%`, 
          backgroundColor: getFarbe(prozent), 
          height: '100%', 
          transition: 'width 1s ease-in-out' 
        }} />
      </div>
    </div>
  );
};

export default function Auswertung() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  // --- BEISPIELDATEN (Mock Data) ---


  const alleFragen = [
    {
      id: 1,
      catId: 30, // Beispiel: Kategorie 'Schweizer Nationalspieler'
      question: "Welche Position spielt Yann Sommer?",
      answers: ["Verteidiger", "Mittelfeld", "Torwart", "Sturm"],
      correct_answer: "Torwart"
    },
    {
      id: 2,
      catId: 55, // Beispiel: Kategorie 'Legenden'
      question: "In welchem Jahr wurde Diego Maradona geboren?",
      answers: ["1955", "1960", "1965", "1970"],
      correct_answer: "1960"
    },
    {
      id: 3,
      catId: 10,
      question: "Für welche Nationalität spielt Kylian Mbappé?",
      answers: ["Portugal", "Spanien", "Frankreich", "Schweiz"],
      correct_answer: "Frankreich"
    },
    {
      id: 4,
      catId: 35,
      question: "Welcher dieser  vorgegebenen Spieler ist ein Verteidiger?",
      answers: ["Xherdan Shaqiri", "Manuel Akanji", "Breel Embolo", "Cristiano Ronaldo"],
      correct_answer: "Manuel Akanji"
    },

    { id:5, 
      catId: 35,
      question : "Welcher Spieler hat die EM 2008 und EM 2012 gewonnen?",
      answers: ["Manuel  Akanji", "Iker Casillas","Christiano Ronaldo","Pelé"],
      correct_answer: "Iker Casillas",

    },

    { id: 6, catId: 38, question: "Wie viele Tore erzielte Kylian Mpappé im letzen Spiel?",
      answers: ["4 Tore", "2 Tore", "3 Tore", "1 Tor"],
      correct_answer: "4 Tore"


    },


    { id: 7, catId: 38, question: "Wie viele Tore erzielte Kylian Mpappé im letzen Spiel?",
      answers: ["4 Tore", "2 Tore", "3 Tore", "1 Tor"],
      correct_answer: "4 Tore"


    },

  

    { id: 8, catId: 80, question : "Was ist der Vorname des Spielers mit der Id 80?",
      answers: ["Oliver","Manuel","Kylian","Ricardo"],
      correct_answer:"Oliver"

    },


    { id:9,  catId: 10, question: "Von welchem Land kommt Diego Maradona?", 
    answers: ['Argentinien', 'Brasilien', 'Kolumbien', 'Honduras'],
    correct_answer: "Argentinien"
    },

   


  ];
  

  // Daten abrufen oder Beispieldaten setzen
  const quizDaten = location.state || {
    ergebnisse: alleFragen,
    score:9,
    richtig: 9,
    falsch: 0
  };

  const { ergebnisse, score, richtig, falsch } = quizDaten;
  const gesamtFragen = ergebnisse.length;
  const name = "Elias Kaiser";
  const heute = new Date().toLocaleDateString('de-DE');

  return (
    <div className="auswertung-container" style={{ 
      textAlign: 'center', padding: '30px', backgroundColor: '#37ca12',  color: 'blue', minHeight: '100vh', fontFamily: 'sans-serif' 
    }}>
      <h2 style={{ color: '#b9260f', fontSize: '70px' }}><ins>🏆 Spielerdashboard von: {name}</ins></h2>
      
      <div className="stats-summary" style={{ 
        marginBottom: '30px', padding: '25px', backgroundColor: 'white', 
        borderRadius: '15px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        display: 'inline-block', minWidth: '400px'
      }}>
        <p style={{ fontSize: '2.5rem', margin: '10px 0', fontWeight: 'bold', color: 'red'  }}>
          Dein Score: <span style={{ color: '#27ae60' }}>{score}</span>
        </p>

        {/* Integration der Progress Bar */}
        <ProgressBar richtig={richtig} gesamt={gesamtFragen} />

        <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: '1.2rem', marginTop: '10px' }}>
          <div style={{ padding: '10px', backgroundColor: '#f1fcf1', borderRadius: '10px' }}>
            <span style={{ color: '#27ae60', fontWeight: 'bold' }}> Richtig: {richtig}</span>
          </div>
          <div style={{ padding: '10px', backgroundColor: '#fdf2f2', borderRadius: '10px' }}>
            <span style={{ color: '#e74c3c', fontWeight: 'bold' }}> Falsch: {falsch}</span>
          </div>
        </div>
        <p style={{ color: '#15cade', marginTop: '15px', fontSize: '1.7rem' }}>Matchday: {heute}</p>
      </div>

      {/* Sterne-Bewertung */}
      <div className="review-box" style={{ 
        backgroundColor: '#1a1a1a', color: 'white', padding: '25px', borderRadius: '15px', margin: '20px auto', maxWidth: '500px'
      }}>
        <h3 style={{ margin: '0 0 10px 0' }}>Wie gefällt dir das Quiz?</h3>
        <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <span key={starValue} style={{ cursor: 'pointer', color: starValue <= (hover || rating) ? '#ffc107' : '#444' }}
                onClick={() => setRating(starValue)}
                onMouseEnter={() => setHover(starValue)}
                onMouseLeave={() => setHover(0)}
              > ★ </span>
            );
          })}
        </div>
        {rating > 0 && <p style={{ color: '#0ecedc' }}>Vielen Dank für deine {rating}-Sterne Bewertung! Wir werden  unser Fussballquiz stetig mit neuen Features verbesesrn</p>}
      </div>

      {/* Detaillierte Tabelle */}
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}>
          <thead>
            <tr style={{ backgroundColor: '#2c3e50', color: '' }}>
              <th style={{ padding: '18px', textAlign: 'left' }}>Frage</th>
              <th style={{ padding: '18px',textAlign:'left' }}>Ergebnis</th>
            </tr>
          </thead>
          <tbody>
            {ergebnisse.map((f, index) => {
              const istKorrekt = f.userAnswer === f.correct_answer;
              return (
                <tr key={index} style={{ borderBottom: '1px solid #eee', backgroundColor: istKorrekt ? '#f9fff9' : '#fff9f9' }}>
                  <td style={{ padding: '15px', textAlign: 'left' }}>
                    <span style={{ fontWeight: 'bold', marginRight: '10px' }}>{index + 1}.</span> {f.question} <br/>
                    <small style={{ color: '#666' }}>Deine Wahl: <span style={{ color: istKorrekt ? '#27ae60' : '#e74c3c' }}>{f.userAnswer}</span></small>
                  </td>
                  <td style={{ padding: '15px', textAlign: 'center' }}>
                    {istKorrekt ? (
                      <span style={{ color: '#27ae60', fontSize: '1.2rem' }}>✔</span>
                    ) : (
                      <div style={{ color: '#e74c3c', fontSize: '0.85rem' }}>
                        ✖ <br/> 
                        <span style={{ color: '#2c3e50' }}> Korrekte Lösung: {f.correct_answer}</span>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Navigations-Buttons */}
      <div style={{ paddingBottom: '60px', display: 'flex', justifyContent: 'center', gap: '25px' }}>
        <button style={navButtonStyle('#3498db')} onClick={() => navigate('/kategorien')}> Neue Kategorie hinzufügen</button>
        <button style={navButtonStyle('#502c44')} onClick={() => navigate('/quiz')}>Quiz erneut spielen </button>
      </div>
    </div>
  );
}

const navButtonStyle = (color) => ({
  padding: '15px 35px', backgroundColor: color, color: 'black', backgroundColor: 'cyan',border: 'none', borderRadius: '12px', cursor: 'pointer', fontSize: '1rem', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', transition: 'transform 0.2s'
});