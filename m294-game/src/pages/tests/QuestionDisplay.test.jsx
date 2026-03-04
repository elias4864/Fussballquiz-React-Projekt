import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpielAnsicht from '../Spielansicht';
import '@testing-library/jest-dom';
import { describe, test, expect } from 'vitest';

describe('Question Komponenten Tests', () => {
  
  test('sollte das Quiz starten und alle Fragen nacheinander korrekt rendern', async () => {
    // 1. ARRANGE
    render(
      <MemoryRouter initialEntries={['/quiz?cat=35']}>
        <Routes>
          <Route path="/quiz" element={<SpielAnsicht />} />
        </Routes>
      </MemoryRouter>
    );

    // 2. ACT: Startbutton klicken
    const startButton = screen.getByRole('button', { name: /⇛ Fussballgame starten ⇚/i });
    fireEvent.click(startButton);

    // 3. ASSERT: Erste Frage (Mbappé Tore)
    // Wir nutzen findByText, da nach dem Klick oft asynchron geladen wird
    const mpappefrage = await screen.findByText(/Welcher dieser  vorgegebenen Spieler ist ein Verteidiger?/i);
    expect(mpappefrage).toBeInTheDocument();    
    expect(screen.getByRole('button', { name: /Xherdan Shaqiri/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Manuel Akanji/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: / Cristiano Ronaldo/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: / Breel Embolo/i })).toBeInTheDocument();


    // 4. ASSERT: Zweite Frage (Maradona)
    const maradonna = await screen.findByText(/In welchem Jahr wurde Diego Maradona geboren\?/i);
    expect(maradonna).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /1960/i })).toBeInTheDocument();

    // 5. ASSERT: Dritte Frage (Nationalität)
    const nationalitaet = await screen.findByText(/Für welche Nationalität spielt Kylian Mbappé\?/i);
    expect(nationalitaet).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Frankreich/i })).toBeInTheDocument();
  });
});