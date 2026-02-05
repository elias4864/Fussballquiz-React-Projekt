import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import SpielAnsicht from './pages/Spielansicht';
import '@testing-library/jest-dom';

describe('Question Komponenten Tests', () => {
  test('sollte die erste Frage und alle Antwortmöglichkeiten korrekt rendern', () => {
    // Wir rendern die Komponente innerhalb eines Routers
    render(
      <MemoryRouter initialEntries={['/quiz?cat=20']}>
        <Routes>
          <Route path="/quiz" element={<SpielAnsicht />} />
          <Route path="/spielregeln" element= {<Spielregeln />} />
        </Routes>
      </MemoryRouter>
    );

    // 1. Klicke auf den Start-Button, um das Quiz zu beginnen
    const startButton = screen.getByRole('button', { name: /start/i });
    fireEvent.click(startButton);

    // 2. Prüfen, ob die Frage aus catId 20 angezeigt wird
    // Laut deinem Code: "Für welchen Klub spielt Yann Sommer aktuell?"
    expect(screen.getByText(/Yann Sommer/i)).toBeInTheDocument();
    expect(screen.getByText(/Diego Maradonna/i)).toBeInTheDocument();

    // 3. Prüfen, ob eine der Antwortmöglichkeiten da ist mit Regex Symbol i
    expect(screen.getByRole('button', { name: /Inter Mailand/i })).toBeInTheDocument();
    
    expect(screen.getByRole('button', { name: /FC Zürich/i })).toBeInTheDocument();
     expect(screen.getByRole('button', { name: /FC Luzern/i })).toBeInTheDocument();
     

    
  });
});