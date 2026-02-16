import { useLocation, useNavigate } from 'react-router-dom';

export default function Auswertung() {
  const location = useLocation();
  const navigate = useNavigate();
  const name = "Elias";
  
  // Daten aus dem State holen
  const { ergebnisse, score, richtig, falsch } = location.state || { 
    ergebnisse: [], 
    score: 0, 
    richtig: 0, 
    falsch: 0 
  };

  return (

    //Name ersetzen 
    <div className="auswertung-container" style={{ textAlign: 'center', padding: '20px' }}>
      <h1>Spielerdashboard von:{name}</h1>
      
      {/* Das Bild wird über den Import angezeigt, nicht über den C-Pfad */}
      <div style={{ marginBottom: '20px' }}>
      </div>

      <div className="stats-summary" style={{ marginBottom: '30px', fontSize: '1.2rem' }}>
        <p>Gesamtpunkte: <strong>{score}</strong></p>
        <p>✅ Richtig: {richtig} | ❌ Falsch: {falsch}</p>
      </div>

      <div className="fragen-liste">
        <h3>Auswertung der Ergebnisse der Fragen</h3>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
          <thead>
            <tr style={{ backgroundColor: '#333', color: 'white' }}>
              <th style={{ padding: '10px' }}>Frage</th>
              <th style={{ padding: '10px' }}>Ergebnis</th>
            </tr>
          </thead>
          <tbody>
            {/* Hier mappen wir durch die Fragen, damit sie angezeigt werden */}
            {ergebnisse.length > 0 ? (
              ergebnisse.map((f, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #ccc' }}>
                  <td style={{ padding: '10px' }}>{f.question}</td>
                  <td style={{ padding: '10px' }}>
                    {f.userAnswer === f.correct_answer ? '✅ Korrekt' : `❌ Falsch (Richtig: ${f.correct_answer})`}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ padding: '20px' }}>Keine Daten vorhanden. Starte ein neues Quiz!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button 
        className="kategorie" 
        style={{ 
          marginTop: '30px', 
          padding: '15px 30px', 
          backgroundColor: '#27ae60', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer' 
        }}
        onClick={() => navigate('/kategorien')}
      >
        ⇚ Zurück zur Auswahl
      </button>
             <button 
        className="kategorie" 
        style={{ 
          marginTop: '30px', 
          padding: '15px 30px', 
          backgroundColor: '#27ae60', 
          color: 'white', 
          border: 'none', 
          borderRadius: '5px',
          cursor: 'pointer' 
        }}
        onClick={() => navigate('/quiz')}
      >
          Erneut Quiz beginnen
      </button>

    </div>
  );
}