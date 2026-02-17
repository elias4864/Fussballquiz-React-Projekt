import { Link } from 'react-router-dom';

export default function GlobalNavigation() {
  return (
    


    //Routing der Komponenten
    <nav className="global-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/spielregeln">Spielregeln</Link>
      <Link to="/about">Impressum</Link>
      <Link to="/kategorien">Kategorien</Link>
      <Link to="new-category">Kategorie Hinzufügen</Link>
      <Link to="/auswertung">Auswertung</Link>
      <Link to="/fragen">Fragen</Link>
      <Link to="/kategorilste">Kategorien</Link>
      <Link to="/frageliste">Frageliste</Link>
      <Link to="/new-question">Frage hinzufügen</Link>
    

      
      
    </nav>
  );
}