import { useState } from 'react';
import fifaLogo from '../assets/fifa-web3.webp';
import { useNavigate } from 'react-router-dom';

export default function Impressum() {
  const datum = new Date().toLocaleDateString('de-DE');
  const navigate = useNavigate();
  

  // States für das Formular und die Texte
  const [showForm, setShowForm] = useState(false);
  const [fifaText, setFifaText] = useState("");
  const [spielHerkunft, setSpielHerkunft] = useState("");
  const [auszeichnung, setAuszeichnung] = useState("");
  





  // Formular-Daten State mit Propertys name, nachname, email number, password
const [formData, setFormData] = useState({ 
    name: 'Elias', 
    nachname: 'Kaiser', 
    email: 'elias.kaiser@gmx.ch', 
    number: '076 492 83 05', 
    
  }); 
  const name = "Elias Kaiser";
  const email = "elias.kaiser@fussballag.ch";
  const adresse = "Oerlikon, Zürich";
  const öffnungszeiten = "Montag bis Samstag: 8 - 19 Uhr";

  // Handlers mit State statt getElementById
  const eventhandler = () => setFifaText("Fifa und vielen Ölscheichen!");
  const eventhandler1 = () => setSpielHerkunft("Das Spiel wird zu 100% in der Schweiz produziert und die Daten stammen aus dem Backend.");
  const fussballhandler = () => setAuszeichnung("..Gewinnerspiel 2026! Ausgezeichnet mit dem schönsten Layout und den spannendsten Fragen.");

  const toggleForm = () => setShowForm(!showForm);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Danke ${formData.name}! Deine Daten wurden (simuliert) gespeichert.`);
    setShowForm(false);
  };

  return (
    <div className="impressum" style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 className="impressum1">Impressum</h1>
      <p className="bounce"><strong>➡Creator des Fussballgame: {name}⬅</strong></p>
      
      <ul style={{ listStyleType: 'disc', textAlign: 'left', display: 'inline-block' }}>
        <li><strong>Stand: {datum}</strong></li>
        <li>Kontakt: <a href={`mailto:${email}`}>{email}</a></li>
        <li>Adresse: {adresse}</li>
        <li>Öffnungszeiten: {öffnungszeiten}</li>
      </ul>

      <br />
      <a href="tel:+41764938207">Kundensupport: +41 76 493 82 07</a>

      <div style={{ marginTop: '20px' }}>
        <button onClick={eventhandler}>Gesponsert von....</button>
        <button onClick={eventhandler1}>Spielherkunft</button>
        <button  className= "auszeichnungne" onClick={fussballhandler}>Auszeichnungen</button>
        <button onClick={toggleForm} style={{ backgroundColor: 'gold' }}>
          {showForm ? " Spielerdaten eingeben " : "Melde dich an"}
        </button>
      </div>

      {/* Die dynamischen Texte */}
      <p><strong>{fifaText}</strong></p>
      <p>{spielHerkunft}</p>
      <p><i>{auszeichnung}</i></p>

      {/* --- DAS NEUE FORMULAR --- */}
      {showForm && (
        <div style={{ border: '2px solid black', padding: '20px', margin: '20px 0', borderRadius: '10px', backgroundColor: '#cf1717' }}>
          <h3>Spieler-Registrierung</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '10px' }}>
              <label>Name: </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <label>E-Mail: </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>


             <div style={{ marginBottom: '10px' }}>
              <label>Telefonnummer:</label>
              <input 
                type="number" 
                name="number" 
                value={formData.number} 
                onChange={handleInputChange} 
                required 
              />
            </div>
             <div style={{ marginBottom: '10px' }}>
              <label>Password:</label>
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={handleInputChange} 
                required= {"Gib bitte dein Password ein?"}
              />
            </div>


             <div style={{ marginBottom: '10px' }}>
              <label>Nachname: </label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleInputChange} 
                required 
              />
            </div>


            

            <button type="submit" style={{ backgroundColor: 'green', color: 'white' }}>Spielerdaten erfassen</button>
          </form>
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <img src={fifaLogo} alt="FIFA Logo" style={{ width: '200px' }} />
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '20px', justifyContent: 'center' }}>
        <button onClick={() => navigate('/')} style={{ backgroundColor: 'black', color: 'red', borderRadius: '20px' }}>Zur Startsteite</button>
        <button onClick={() => navigate('/quiz')} style={{ backgroundColor: 'black', color: 'red', borderRadius: '10px' }}>Quiz</button>
        <button onClick={() => navigate('/kategorien')} style={{ backgroundColor: 'black', color: 'red', borderRadius: '10px' }}>Kategorien</button>
      </div>
    </div>
  );
}