


//Das Impressum wird in einer Funktion definiert
export default function Impressum() {

  const datum = new Date().toLocaleDateString('de-DE');

  return (
    <div>
      <h1>Impressum</h1>
      <p>Verantwortlich für dieses Quiz: [Elias]</p>
      <b><p>Stand:{datum}</p></b>
      
      
      
     



    </div>
  );
}