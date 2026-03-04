import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpielAnsicht from '../Spielansicht'; // Deine Container-Komponente
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';

describe('Question Komponenten Tests', () => {
  
  test('sollte das Quiz mit Kategorie 35 starten und die richtigen Fragen nacheinander rendern', async () => {
    // 1. ARRANGE: Wir simulieren den Aufruf der Kategorie SPieler mti der ID 35
    render(
      <MemoryRouter initialEntries={['/quiz?cat=35']}>
        <Routes>
          <Route path="/quiz" element={<SpielAnsicht />} />
        </Routes>
      </MemoryRouter>
    );

    // 2. ACT: Den Startknopf drücken
    const startButton = screen.getByRole('button', { name: /⇛ Fussballgame starten ⇚/i });
    fireEvent.click(startButton);

    // 3. ASSERT: Erste Frage (ID 4 im Array, da catId 35)
    // Beachte: Wir nutzen einen funktionalen Matcher, um die doppelten Leerzeichen im Array abzufangen
    const frage1 = await screen.findByText((content) => 
      content.replace(/\s+/g, ' ').includes("Welcher dieser vorgegebenen Spieler ist ein Verteidiger?")
    );
    expect(frage1).toBeInTheDocument();
    
    // ACT: Antwort anklicken, um weiterzugehen
    const antwort1 = screen.getByRole('button', { name: /Manuel Akanji/i });
    fireEvent.click(antwort1);

    // 4. ASSERT: Zweite Frage der Kategorie 35 (ID 5 im Array)
    const frage2 = await screen.findByText(/Welcher Spieler hat die EM 2008 und EM 2012 gewonnen\?/i);
    expect(frage2).toBeInTheDocument();


    
      const frage3 = await screen.findByText(/Welcher dieser  Fussballspieler   hat den VOrnamen eines legendären Torhüters\?/i);
    expect(frage3).toBeInTheDocument();
    // ACT: Korrekte Antwort klicken
    const antwort2 = screen.getByRole('button', { name: /Iker Casillas/i });
    fireEvent.click(antwort2);

    // 5. ASSERT: Nach der letzten Frage der Kategorie sollte die Auswertung/Endseite kommen
    // (Je nachdem, was deine SpielAnsicht nach der letzten Frage macht)
    const auswertung = await screen.findByText(/Quiz beendet/i || /Dein Ergebnis/i);
    expect(auswertung).toBeInTheDocument();
    

  
  });
});