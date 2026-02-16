import React from 'react';
import Ball from '../assets/Ball.webp'; 

export default function Home() {
  return (
    <div className="home" style={{ textAlign: 'center', overflow: 'hidden' }}>
      <h2>Willkommen zum Fussballgame 2026!</h2>
      <p className="bounce2">
        Bist du bereit, dein Fussballwissen zu testen? 
        Wähle oben ein Thema aus der Navigationsleiste aus
      </p>

      {/* Das Spielfeld */}
      <div className="pitch" style={{ 
        width: '100%', 
        height: '220px', 
        position: 'relative', 
        marginTop: '30px',
        overflow: 'hidden',
        borderBottom: '2px solid rgba(255,255,255,0.3)' // Eine kleine Linie als Boden
      }}>
        
        <img 
          src={Ball} 
          alt="Rollender Fussball" 
          className="bouncing-ball"
          style={{ 
            width: '180px', 
            position: 'absolute',
            bottom: '10px',
            borderRadius: '70%', // Hier wird das Bild perfekt abgerundet
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)' // Ein kleiner Schatten für mehr Tiefe
          }} 
        />
      </div>

      {/* CSS für den Abprall-Effekt */}
      <style>
        {`
          .bouncing-ball {
            /* 'alternate' lässt den Ball wieder zurückrollen statt zu springen */
            animation: bounce-back 4s ease-in-out infinite alternate;
          }

          @keyframes bounce-back {
            0% {
              left: 0%;
              transform: rotate(0deg);
            }
            100% {
              /* Wir ziehen die Breite des Balls (180px) ab, damit er nicht aus dem Bild rollt */
              left: calc(102% - 210px); 
              transform: rotate(1440deg); /* Mehr Drehung für mehr Realismus */
            }
          }
        `}
      </style>
    </div>
  );
}