import { useNavigate } from 'react-router-dom'; // WICHTIG: Import hinzugefügt

export default function Kategorieauswahl() {
  const navigate = useNavigate();

  const kategorien = [
    { id: 10, name: "Nationalität" },
    { id: 20, name: "Verein" },
    {  id:30, name: "Position" },
    { id: 40, name: "Karriere" },
    { id: 50, name: "Spielerstatus" },
    {id: 55, name: "Geburtsdatum" },
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
              border: '1px solid #0923ba', 
              padding: '10px', 
              margin: '5px', 
              borderRadius: '25px',
              display: 'inline-block' 
              
            }}
          >
            {kat.name}
          </div>
        ))}
      </div>

    
      <button className="newcategory"      
          onClick={() => navigate('/new-category')}

          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'black', border: 'none', borderRadius: '10px', textShadow:' 5px 10px red', textAlign:' center' }}
>Zum Kategorieformular</button>





       <button className="newcategory"      
          onClick={() => navigate('/quiz')}
          

          style={{ padding: '10px 20px', cursor: 'pointer', border: 'none', borderRadius: '10px', textAlign:' center' , backgroundColor:"red"}}
>Zum Fussballquiz</button>

    </div>


  );
}
//