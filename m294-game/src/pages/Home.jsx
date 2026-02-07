
import React from 'react';
import Fussball from '../assets/giphy.gif'; // Dein importierter Gif



export default function Home() {
  return (
    <div className="home" style={{ 
  textAlign: 'center', 
  padding: '20px', 
  backgroundColor: '#2ecc71', // Ein schönes Grün
  minHeight: '100vh',        // Sorgt dafür, dass die Farbe den ganzen Bildschirm füllt
  color: 'white'              // Macht den Text weiß, damit er auf Grün besser lesbar ist
}}>
      <h2>Willkommen zum Fussballgame 2026!</h2>
      <p>Bist du bereit, dein Fussballwissen zu testen? Wähle oben ein  Thema aus der Navigationsleiste aus</p>
      

      <img 
        src={Fussball} 
        alt="Fussball Animation" 
        style={{ width: '300px', borderRadius: '10px', marginTop: '20px' }} 
      />
    </div>
  );
}