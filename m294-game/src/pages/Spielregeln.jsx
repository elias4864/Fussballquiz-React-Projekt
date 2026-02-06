import { useNavigate } from 'react-router-dom';

export default function Spielregeln() {
  const navigate = useNavigate();

  return (
    <div className="spielregeln" style={{ padding: '20px', color: 'black' }}>
      <h1><ins>Spielregeln: Fussballquiz 2026</ins></h1>
      
      <section style={{ textAlign: 'left', marginBottom: '20px' }}>
        <ul>
          <li>Wähle eine Kategorie aus.</li>
          <li>Beantworte die Fragen durch Klicken auf die Antwort-Buttons.</li>
          <li>Nur eine Antwort ist jeweils korrekt!</li>
          
        </ul>
      </section>

      {/* Button zur Kategorieauswahl ist sicherer als direkt zum Quiz */}
      <button 
        className="kategorie" 
        onClick={() => navigate('/kategorien')}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#b30cc6', color: 'white', border: 'none', borderRadius: '10px' }}
      >
        Kategorie wählen und Spiel Starten  Starten
      </button>
    </div>
  );
}