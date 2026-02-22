import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Spielregeln from './pages/Spielregeln';

// Da wir useNavigate testen wollen, mocken wir das Routing Modul
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Spielregeln Komponente', () => {
  


    //Browser Router wird gerendert 
  it('sollte die Überschrift korrekt anzeigen', () => {
    render(
      <BrowserRouter>
        <Spielregeln />
      </BrowserRouter>
    );
    
    const heading = screen.getByText(/Spielregeln: Fussballquiz 2026/i);
    expect(heading).toBeDefined();
  });

  it('sollte die Komponente  der Spielreegeln rendern', () => {
    render(
      <BrowserRouter>
        <Spielregeln />
      </BrowserRouter>
    );

    //Assert Arrange
    expect(screen.getByText(/Wähle eine Kategorie aus/i)).toBeDefined();
    expect(screen.getByText(/Nur eine Antwort ist jeweils korrekt/i)).toBeDefined();
    expect(screen.getByText(/Beantworte die Frage durch  Klicken auf die Antwort Buttons/i)).toBeDefined();
    expect(screen.getByRole(/Nur eine Antwort der 4 möglichen Antworten  ist jeweils korrekt/i)).toBeDefined();

    expect(screen.get)
    
  });


  //Act
  it('sollte beim Klick auf den Button zur Kategorien-Seite navigieren', () => {
    render(
      <BrowserRouter>
        <Spielregeln />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Kategorie wählen/i });
    
    // Simuliere den Klick
    fireEvent.click(button);

    // Prüfe, ob navigate mit dem richtigen Pfad aufgerufen wurde mit Assart
    expect(mockNavigate).toHaveBeenCalledWith('/kategorien');
  });


  i
});