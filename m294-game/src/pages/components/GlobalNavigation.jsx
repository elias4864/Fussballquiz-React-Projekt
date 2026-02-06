import { Link } from 'react-router-dom';

export default function GlobalNavigation() {
  return (
    
    <nav className="global-nav">
      <Link to="/">Home</Link>
      <Link to="/quiz">Quiz</Link>
      <Link to="/spielregeln">Spielregeln</Link>
      <Link to="/about">Impressum</Link>
      <Link to="/kategorien">Kategorien</Link>
      <Link to="/auswertung">Auswertung</Link>
      <Link to="/fragen">Fragen</Link>
      
    </nav>
  );
}