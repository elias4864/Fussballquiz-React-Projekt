import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Spielregeln from '../Spielregeln.jsx';// Da wir useNavigate testen wollen, mocken wir das Routing Modul
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
    
    const heading = screen.findByText(/Spielregeln: Fussballquiz 2026/);
    expect(heading).toBeDefined();
  });

  it('sollte die Komponente  der Spielreegeln rendern', () => {
    render(
      <BrowserRouter>
        <Spielregeln />
      </BrowserRouter>
    );


    //Textinhalte sollten in Spielregeln sollten in Spielregeln.test.jsx  vorkommen mit Assertions
    expect(screen.getByText(/Wähle bitte eine Kategorie aus der Kategorieliste aus um das Thema der Frage zu bestimmen/i)).toBeDefined();
    expect(screen.getByText(/Nur eine Antwort der 4 möglichen Antworten ist jeweils korrekt!/i)).toBeDefined();
    expect(screen.getByText(/Das Fussballquiz 2026 kann mehrmals gespielt werden/i)).toBeDefined();
  

    
  });


  //Act
  it('sollte beim Klick auf den Button zur Kategorien-Seite navigieren', () => {
    render(
      <BrowserRouter>
        <Spielregeln />
      </BrowserRouter>
    );

    const button = screen.getByRole('button', { name: /Kategorie wählen und Spiel Starten/i });
    
    // Simuliere den Klick
    fireEvent.click(button);

    const button2  = screen.getByRole('button', {name:/Eine neue Kategorie oder Frage wird hinzugefügt/i});
  
    fireEvent.click(button2);

    // Prüfe, ob navigate mit dem richtigen Pfad aufgerufen wurde mit Assart
    expect(mockNavigate).toHaveBeenCalledWith('/kategorien');
    expect(mockNavigate).toHaveBeenCalledWith('/new-category');
  });


  
});