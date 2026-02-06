import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

// Deine Komponenten-Imports
import GlobalNavigation from './pages/components/GlobalNavigation';
import Spielansicht from './pages/Spielansicht';
import Spielregeln from './pages/Spielregeln';
import { alleFragen } from "./pages/components/QuestionDisplay";
import QuestionDisplay from './pages/components/QuestionDisplay';
import Impressum from './pages/Impressum';
import Kategorieauswahl from './pages/components/Kategorieauswahl';
import Auswertung from './pages/components/Auswertung';
import Fussball from '../assets/giphy.gif'

// 1. Das Layout bestimmt, wo die Navigation und der Inhalt (Outlet) erscheint
function Layout() {
  return (
    <div className="App">
      <div className="content">
        <header className="App-header">
          <marquee><h1 className="start">Willkommen zum Fussballquiz</h1></marquee>
          {/* Hier gehört die Navigation hin */}
          <GlobalNavigation />
          <hr />
          {/* Hier wird die jeweilige Seite (Spielansicht, etc.) reingeladen also die Ansicht der Seit die wechselt  */}
          <Outlet /> 
          <hr />
        </header>
      </div>

          <footer><b>© Ein React Projekt von Elias Kaiser</b></footer>

    </div>

    
  );
}



//Wenn Seite nicht gefunden wurde zeigt Error Code an  404
function NotFound() {
  return <h2>404 - Seite nicht gefunden!</h2>;
}
//Main App mit Routing in einzelne Paths  der Spilkomponenten
function App() {


  
  return (


    //Der Browser Router ladet die Komponenten und Unterlinks wie quiz und /spielregen  hoch.
    
    <BrowserRouter>
      <Routes>
        {/* Alle Routen befinden sich  im Layout, welches ein Verbidnugn zum Outlet macht und er GlobalNavigation Komponente  */}
        <Route path="/" element={<Layout />}>
          <Route index element={<h2>Willkommen zum Quiz. Wähle oben ein Menü.</h2> } />
          
          <Route path="quiz" element={<Spielansicht />} />
          <Route path="spielregeln" element={<Spielregeln />} />
          <Route path="about" element={<Impressum />} />
          <Route path="auswertung" element={<Auswertung />} />
          <Route path="fragen" element = {<QuestionDisplay />} />
          <Route path="kategorien" element={<Kategorieauswahl />} />
          
          <Route path="*" element={<NotFound />} />
          
        </Route>
      </Routes>
      </BrowserRouter>
  );
}

export default App;