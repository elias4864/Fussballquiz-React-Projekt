
import fifaLogo from '../assets/fifa-web3.webp';//Das Impressum wird in einer Funktion definiert
export default function Impressum() {

  const datum = new Date().toLocaleDateString('de-DE');
   const now = new Date();

   const  name = "Elias Kaiser";
   const email = "elias.kaiser@gmx.ch"
   const adresse = "Oerlikon, Zürich"
  

const eventhandler = () => {
    const element = document.getElementById("fifa").innerHTML = "Fifa und vielen Ölscheichen!"
  
  };

  return (
    <div className="impressum">

      
      <h1 className="impressum1">Impressum</h1>
      <p>Creator des   Fussballgame {name}</p>
      <b><p>Stand:{datum}</p></b>
      <p>Kontakt: <a href={`mailto:${email}`}>{email}</a></p>
      <b><p>Stand: {datum}</p></b>
      <adress>{adresse}</adress>




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

      

    

    <footer>


    </footer>
      


      
      
      
     



    </div>
  );
}