import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpielAnsicht from '../Spielansicht';
import '@testing-library/jest-dom';
import { expect } from 'vitest';


//Arrange Mockup Test schreiben un
describe('Question Komponenten Tests', () => {
  test('sollte die erste Frage und alle Antwortmöglichkeiten korrekt rendern', ()  => {
    // Wir rendern die Komponente der Spielansicht  innerhalb eines Routers in den Specerreiut
    render(
      <MemoryRouter initialEntries={['/quiz?cat=35']}>
        <Routes>
          <Route path="/quiz" element={<SpielAnsicht />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Klicke auf den Start-Button, um das Quiz zu beginnen
    const startButton =  screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // 2. Prüfen, ob die Frage aus catId 20 angezeigt wird
    // Laut deinem Code: "Für welchen Klub spielt Yann Sommer aktuell?"
    //Überprüft ob Shaquiri  im MIttelfeld,Sturm uoder Verteidiger ist also in dies erPosition spielt durhc iene Frage
  
    // 3. Prüfen, ob eine der Antwortmöglichkeiten da ist mit Regex Symbol i
    expect(screen.getByText(/Was ist der Vorname des Spielers mit der Id 80?"/i)).toBeInTheDocument();
    expect(screen.getByText(/Wie sieht die Torbilanz von Manuel Akanji vom letzten Spiel aus?"/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Oliver/i })).toBeInTheDocument();
    
    expect( screen.getByRole('button', { name: /Manuel/i })).toBeInTheDocument();
     expect(screen.getByRole('button', { name: /Kylian/i })).toBeInTheDocument();
     expect(screen.getByRole('button', {name:/Ricardo/i})).toBeInTheDocument();
     expect(screen.getByRole('button', {name:/2 Tore/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:/2 Tore/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:/1 Tor/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:/kein Tor/i})).toBeInTheDocument();
    expect(screen.getByRole('button', {name:/1 Assists/i})).toBeInTheDocument();




     

    
  });
});