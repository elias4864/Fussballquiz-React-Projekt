import React, { useState, useEffect } from 'react'; // useEffect hinzugefügt
import Ball from '../assets/Ball.webp'; 

export default function Home() {

  //Use State für jeder Sprache durch 2.paremter die Home.jsx Kompennet neu gerendert und der Text angepasst , Normalzstand ist standarmössig Deutsch  gesetzt
  const [language, setLanguage] = useState('de');
  const [dropdownOpen, setDropdownOpen] = useState(false);

//Use EEffekt wechselt dynamisch das Root Elemtn HTML auf lang="en" durch Variable lanugage dargestellt
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]); // Wird jedes Mal ausgeführt, wenn 'language' sich ändert


  //Drop Down Menu für 
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  // Funktion zum Sprachwechsel
  const selectLanguage = (lang) => {
    setLanguage(lang);
    setDropdownOpen(false); // Menü nach Auswahl schließen
  };

  return (
    <div className="home" style={{ textAlign: 'center', overflow: 'hidden' }}>
      <h2 className="willkommen">
        {language === 'en' && "Welcome to the  Football Game 2026!"}
        {language === 'fr' && "Bienvenue au jeu de foot 2026 !"}
        {language === 'it' && "Benvenuti al gioco del calcio 2026!"}
      </h2>
      
      <nav className="navbar" style={{ background: '#333', padding: '10px', display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <span style={{ color: 'white', alignSelf: 'center' }}>
          {language === 'de' ? 'Sprache auswählen:' : language === 'en' ? ' Choose Language:' : ' Langue:' ?  language=== 'it':  'Lingua' }
        </span>
    
        <div className="dropdown" style={{ position: 'relative' }}>
          <button 
            className="dropbtn" 
            onClick={toggleDropdown}
            style={{ cursor: 'pointer', background: '#555', color: 'white', border: 'none', padding: '5px 15px', borderRadius: '4px' }}
          >
            {language.toUpperCase()} ▼
          </button>

          {dropdownOpen && (
            <div className="dropdown-content" style={{
              position: 'absolute',
              backgroundColor: '#f9f9f9',
              minWidth: '120px',
              boxShadow: '0px 8px 16px rgba(0,0,0,0.2)',
              zIndex: 10,
              top: '100%',
              left: 0,
              display: 'flex',
              flexDirection: 'column'
            }}>
              <button onClick={() => selectLanguage('de')} style={dropItemStyle}>Deutsch</button>
              <button onClick={() => selectLanguage('en')} style={dropItemStyle}>English</button>
              <button onClick={() => selectLanguage('fr')} style={dropItemStyle}>Français</button>
              <button onClick={()=>selectLanguage('it')} style={dropItemStyle}>Italiano</button>
            </div>
          )}
        </div> 
      </nav>

   <p className="bounce2" style={{ marginTop: '20px' }}>
        {language === 'de' && "Bist du bereit, dein Fussballwissen zu testen?"}
        {language === 'en' && "Are you ready to test your football knowledge?"}
        {language === 'fr' && "Es-tu prêt à tester tes connaissances en football ?"}
        {language === 'it' && "Sei pronto a mettere alla prova le deine conoscenze calcistiche?"}
      </p>

      {/* Spielfeld bleibt gleich */}
      <div className="pitch" style={{ width: '100%', height: '220px', position: 'relative', marginTop: '30px', overflow: 'hidden', borderBottom: '2px solid rgba(255, 255, 255, 0.3)', }}>
        <img src={Ball} alt="Ball" className="bouncing-ball" style={{ width: '180px', position: 'absolute', bottom: '10px', borderRadius: '50%' }} />
      </div>

      <style>
        {`
          .bouncing-ball { animation: bounce-back 4s ease-in-out infinite alternate; }
          @keyframes bounce-back { 
            0% { left: 0%; transform: rotate(0deg); } 
            100% { left: calc(100% - 180px); transform: rotate(1240deg); } 
          }
        `}
      </style>
    </div>
  );
}



// Kleiner Helper-Style für die Buttons im Menü
const dropItemStyle = {
  padding: '10px',
  border: 'none',
  background: 'none',
  textAlign: 'left',
  color:"blue",
  cursor: 'pointer',
  width: '100%',
  fontSize: '14px'
};