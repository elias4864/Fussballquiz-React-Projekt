import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import QuestionForm from '../components/QuestionForm'; 

// 1. Mock für die Navigation (useNavigate)
const mockedUsedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Frageformular  mit Spion der Alet Meldung verfolgt', () => {
  
  beforeEach(() => {
    // Alle Mocks vor jedem Test zurücksetzen
    vi.clearAllMocks();

    // 2. Den Spion für window.confirm einrichten (Gibt immer OK zurück)
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    
    // 3. Den Spion für window.alert einrichten
    vi.spyOn(window, 'alert').mockImplementation(() => {});
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 1, question: 'Erfolg!' }),
      })
    );
  });

  it('sollte alle Felder ausfüllen und das Formular erfolgreich absenden', async () => {
    render(
      <BrowserRouter>
        <QuestionForm />
      </BrowserRouter>
    );

    // 5. Alle Textfelder finden (Array: 0=Frage, 1=Richtig, 2=Falsch1, 3=Falsch2, 4=Falsch3)
    const allInputs = screen.getAllByRole('textbox');
    expect(allInputs).toHaveLength(5);

    // 6. Felder befüllen
    fireEvent.change(allInputs[0], { target: { value: 'Welches Land gewann die WM 2022?' } });
    fireEvent.change(allInputs[1], { target: { value: 'Argentinien' } });
    fireEvent.change(allInputs[2], { target: { value: 'Frankreich' } });
    fireEvent.change(allInputs[3], { target: { value: 'Kroatien' } });
    fireEvent.change(allInputs[4], { target: { value: 'Marokko' } });

    // 7. Absenden klicken
    const submitBtn = screen.getByRole('button', { name: /Frage absenden/i });
    fireEvent.click(submitBtn);


    //Überüf ob Dialgofenster mit Möchsten sie die Fag wirklc hinzfgüen erscheint
    expect(window.confirm).toHaveBeenCalled();
    
      //Wiederilbar test welceh vershciedne Eingabe eingut und mehrfach POst-Emtode aufrft und damit FEthc MEthode simuliert wird , mindestens 1 mal
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(1);
    });
    
    // Wurde eine Erfolgsmeldung per Alert gezeigt das Frage vom Server also Post-Emtod funktioenti hat
    expect(window.alert).toHaveBeenCalledWith("Erfolgreich gespeichert!");
  });

  it('sollte zur Frageliste navigieren, wenn der Zurück-Button geklickt wird', () => {
    render(
      <BrowserRouter>
        <QuestionForm />
      </BrowserRouter>
    );

    const listBtn = screen.getByRole('button', { name: /Zur Frageliste/i });
    fireEvent.click(listBtn);

    // Prüfen, ob navigate aufgerufen wurde
    expect(mockedUsedNavigate).toHaveBeenCalledWith("/frageliste");
  });
});