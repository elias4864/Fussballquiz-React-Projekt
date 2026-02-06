import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpielAnsicht from '../Spielansicht';
import '@testing-library/jest-dom';
import { expect } from 'vitest';


//Arrange Mockup Test schreiben
describe('Question Komponenten Tests', () => {
  test('sollte die erste Frage und alle Antwortmöglichkeiten korrekt rendern', ()  => {
    // Wir rendern die Komponente innerhalb eines Routers
    render(
      <MemoryRouter initialEntries={['/quiz?cat=14']}>
        <Routes>
          <Route path="/quiz" element={<SpielAnsicht />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Klicke auf den Start-Button, um das Quiz zu beginnen
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // 2. Prüfen, ob die Frage aus catId 20 angezeigt wird
    // Laut deinem Code: "Für welchen Klub spielt Yann Sommer aktuell?"
    //Überprüft ob Shaquiri  im MIttelfeld,Sturm uoder Verteidiger ist also in dies erPosition spielt durhc iene Frage
  
    expect(screen.findByRole("Welche Position spielt Shaqiri?")).toBeInTheDocument();
    // 3. Prüfen, ob eine der Antwortmöglichkeiten da ist mit Regex Symbol i
    expect(screen.findByRole('button', { name: /Mittelfeld/i })).toBeInTheDocument();
    
    expect(screen.findByRole('button', { name: /Sturm/i })).toBeInTheDocument();
     expect(screen.findByRole('button', { name: /Verteidiger/i })).toBeInTheDocument();
     
     

    
  });
});