import { useNavigate } from 'react-router-dom';

export default function Spielregeln() {
  const navigate = useNavigate();

  return (
    <div className="spielregeln" style={{ padding: '20px', color: 'black' }}>
      <h1><ins>Spielregeln Fussballquiz 2026</ins></h1>
      
      <section style={{ textAlign: 'left', marginBottom: '30px', fontSize: '30px' }}>
        <ul>
          <li>Wähle  bitte eine Kategorie aus der Kategorieliste aus um das Thema der Frage zu bestimmen</li>
          <li>Beantworte die Fragen durch Klicken auf die Antwort-Buttons.</li>
          <li>Pro Frage hast du nur eine Chance  um die korrekte Antwort herauszufinden, danach erscheint die nächste Frage/Runde</li>
          <li>Nur eine Antwort der 4 möglichen Antworten  ist jeweils korrekt!</li>
          <li>Bei einer falschen Antwort wird der Score um 1 kleiner, bei der Beantwortung der richtigen Frage gibt erhöht sich der Score um 1</li>
          <h2><ins>Spielerweiterung:</ins></h2>Um das Spiel etwas spannender zu machen kann eine  zusätzliche Frage und dementsprechen eine Kateogrie hinzugefügt werden un das Schwierigkeitslevel der Fragen belibig erweitert werden vom User
         <h2 className="spielregeln"><b>Ziel des Spiels: Du hast das Fussballspiel gewonnen falls du alle 8 Antworten korrekt beantwortet hast und verloren falls dein Socer negativ ist</b></h2>
         </ul>
     
      </section>
  
      
      <button 
        className="kategorie" 
        onClick={() => navigate('/kategorien')}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#b30cc6', color: 'white', border: 'none', borderRadius: '10px' }}
      >
        Kategorie wählen und Spiel Starten 
      </button>
      <button 
        className="kategorie" 
        onClick={() => navigate('/new-category')}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#e6810f', color: 'white', border: 'none', borderRadius: '10px' }}
      >
        Eine neue Kategorie oder Frage wird hinzugefügt 
      </button>
      
    </div>
  );
}