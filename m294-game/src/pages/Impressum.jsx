
import fifaLogo from '../assets/fifa-web3.webp';//Das Impressum wird in einer Funktion definiert
import { useNavigate } from 'react-router-dom';


export default function Impressum() {

  const datum = new Date().toLocaleDateString('de-DE');
   const now = new Date();
     const navigate = useNavigate();


   const  name = "Elias Kaiser";
   const email = "elias.kaiser@fussballag.ch"
   const adresse = "Oerlikon, Zürich"

   const öffnungszeiten = "O"
  

const eventhandler = () => {
    const element = document.getElementById("fifa").innerHTML = "Fifa und vielen Ölscheichen!"
  
  };

  return (
    <div className="impressum">

      
      <h1 className="impressum1">Impressum</h1>
      <ol>Creator des   Fussballgame {name}</ol>
      
      <li><b><p>Stand:{datum}</p></b></li>
      <li><p>Kontakt: <a href={`mailto:${email}`}>{email}</a></p></li>
      <li><b><p>Stand: {datum}</p></b></li>
      <li><adress>{adresse}</adress></li>
      <a href="tel:+41 76 493 82 07">Bei Problemen bitte folgende Nummer anrufen: +41 76 493 82 07</a>


      




      <h1>Das Spiel  wurde am   {datum} herausgegeben</h1>

      
    <p id="fifa"></p>
   
   <button onClick={eventhandler}>
        Gesponsert von....
      </button>

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

          style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: 'black',  color: 'white', border: 'none', borderRadius: '10px' }}
>Zurück zur Startseite</button>



      

    

      


      
      
      
     



    </div>
  );
}