import { useNavigate } from 'react-router-dom'; // WICHTIG: Import hinzugefügt

export default function Kategorieauswahl() {
  const navigate = useNavigate();

  const kategorien = [
    { id: 10, name: "Nationalität" },
    { id: 20, name: "Verein" },
    { id: 30, name: "Position" },
    { id: 40, name: "Karriere" },
    { id: 50, name: "Spielerstatus" },
    { id: 55, name: "Geburtsdatum" },
    { id: 14, name: "Legenden" },
    { id: 21, name: "Aktive Spieler" },
    { id: 35, name: "Spieler" },
    {id: 45, name:"Team"},
    
  
  ];

  const waehleKategorie = (id) => {
    // Navigiert zur Quiz-Seite mit der ID als URL-Parameter
    navigate(`/quiz?cat=${id}`);
  };

  return (
    <div className="kategorie-box">
      <h2>Wähle bitte eine Kategorie aus:</h2>
      <div className="kategorie-grid">
        {kategorien.map((kat) => (
          <div 
            key={kat.id} 
            className="kategorie-item"
            onClick={() => waehleKategorie(kat.id)}
            style={{ 
              cursor: 'pointer', 
              border: '1px solid #b30cc6', 
              padding: '10px', 
              margin: '5px',
              borderRadius: '8px',
              display: 'inline-block' 
            }}
          >
            {kat.name}
          </div>
        ))}
      </div>
    </div>
  );
}
//