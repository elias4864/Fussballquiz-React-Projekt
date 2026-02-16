
import fifaLogo from '../assets/fifa-web3.webp';//Das Impressum wird in einer Funktion definiert
import { useNavigate } from 'react-router-dom';


export default function Impressum() {

  const datum = new Date().toLocaleDateString('de-DE');
   const now = new Date();
     const navigate = useNavigate();


   const  name = "Elias Kaiser";
   const email = "elias.kaiser@fussballag.ch"
   const adresse = "Oerlikon, Zürich"


   
   const öffnungszeiten = "Montag bis Samstag: 8 -19 Uhr"


   

  

const eventhandler = () => {
    const element = document.getElementById("fifa").innerHTML = "Fifa und vielen Ölscheichen!"
  };



  
const eventhandler3 = () => {
    const element = document.getElementById("datenschutz").innerHTML = "Bitte gib dein Name und deine E-Mail ein "
  };

  const eventhandler1 = () => {
    const element = document.getElementById("email").innerHTML = "Das Spiel wird huntertprozentig   in Schweiz produziert udn die Daten stammen aus dem Backend"
  };

    

    const fussballhandler = () => {
    const element = document.getElementById("spiel").innerHTML = "..Gewinnerspiel 2026 ausgezeichnet mit dem schönsten Layout und  den spanenstend Frage und erhiellt zahleriche Auszeichnungen wie den Awart  Spiel Nr.1 für Fussballfreaks!"
  };

    
  

  return (
    <div className="impressum">

      
      <h1 className="impressum1">Impressum</h1>
      <ol><strong>Creator des   Fussballgame :{name}</strong></ol>
      <ul style={{ listStyleType: 'disc', textAlign:'center', paddingLeft: '20px' }}>
      <li><strong>Stand:{datum}</strong></li>
      <li>Kontakt: <a href={`mailto:${email}`}>{email}</a></li>
      <li></li>
      <li><adress>Adresse des Creators:{adresse}</adress></li>
      <li><address> Öffnungszeiten:{öffnungszeiten}</address></li>
      
    
      </ul>
      

      

      <a href="tel:+41 76 493 82 07">Bei Fragen zum Kundensupport  bitte folgende Nummer anrufen: +41 76 493 82 07</a>


      


      <h1>Das Spiel  wurde am   {datum} herausgegeben</h1>

      
    <p id="fifa"></p>
    <p id="email"></p>
    <p id="spiel"></p>
    <p id="datenschutz"></p>
   
   <button onClick={eventhandler}>
        Gesponsert von....
      </button>

      <button onClick={eventhandler1}>
        Spielherkunft: 

      </button>


      <button onClick={eventhandler3}>

      </button>



      <button onClick ={fussballhandler}>
        Das Fussballquiz wurde mit der Auszeichnung...</button>

      <div style={{ marginTop: '20px' }}>
        <img 
          src={fifaLogo} 
          alt="FIFA Web3 Logo"    
          style={{ width: '400px', height: '400px' }} 
        />
      </div>
      

    <section>
        <h2>Projektbeschreibung</h2>
        
        <p>Dieses Quiz wurde mit <strong>React</strong> und <strong>Vite</strong> erstellt.</p>
        
      </section>


      <button className="home"      
          onClick={() => navigate('/')}

          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'black',  color: 'red', border: 'none', borderRadius: '10px' }}
>Zurück zur Startseite</button>




    
      <button     
          onClick={() => navigate('/quiz')}

          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'black',  color: 'red', border: 'none', borderRadius: '10px' }}
>Zurück zum Quiz</button>


      <button     
          onClick={() => navigate('/kategorien')}

          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'black',  color: 'red', border: 'none', borderRadius: '10px' }}
>Wähle eine Kategorie aus und starte das Spiel!</button>


   



    </div>
  );
}