
import { useLocation, useNavigate } from 'react-router-dom';

export default function Auswertung() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Daten aus dem State holen (mit Fallback, falls jemand die Seite direkt aufruft)
  const { ergebnisse, score } = location.state || { ergebnisse: [], score: 0 };


  
  
  return (
    <div className="auswertung-container">
      <h1>Deine Auswertung </h1>
      <h2>Gesamtpunkte: {score}</h2>

      <div className="ergebnis-liste">
        {ergebnisse.map((item, index) => (
          <div key={index} className={`ergebnis-item ${item.istRichtig ? 'richtig' : 'falsch'}`}>
            <p><strong>Frage:</strong> {item.frage}</p>
            <p>Deine Antwort: <span style={{color: item.istRichtig ? 'green' : 'red'}}>{item.gewaehlt}</span></p>
            {!item.istRichtig && <p>Richtige Lösung: {item.korrekt}</p>}
            <hr />
          </div>
        ))}
      </div>

      

<button 
        className="kategorie" 
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer' }}
        onClick={() => navigate('/kategorien')}
      >
        Zurück zur Auswahl
      </button>
    </div>
  );



  



  

}