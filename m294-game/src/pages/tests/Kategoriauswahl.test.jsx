import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
//Vi muss importiert werden 
import { describe, test, expect, vi, beforeEach } from "vitest"; // Vitest Funktionen importieren
import Kategorieauswahl from '../components/Kategorieauswahl';

//Used State Navigate




const mockedUsedNavigate = vi.fn();

// 2. Den Mock registrieren mit vi.mock
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedUsedNavigate,
  };
});

describe('Kategorieauswahl Komponente', () => {
  
  beforeEach(() => {
    mockedUsedNavigate.mockClear();
  });

  //Browser rendert zur Komponente Kategorieauswahl mit der Kategorieliste
  test('navigiert zur richtigen URL, wenn eine Kategorie geklickt wird', () => {
    render(
      <BrowserRouter>
        <Kategorieauswahl />
      </BrowserRouter>
    );



    //Verein Bztton wird mit Benutzereingabe simuliert
    const vereinButton = screen.getByText('Verein');
    fireEvent.click(vereinButton);






   //Buttons für Navigationsleiste  
    const PositionButton = screen.getByText('Position');
    fireEvent.click(PositionButton);


    //Geburtstagsdatum Button wird simuliert
    const GeburtsdatumButton = screen.getByText('Geburtsdatum');
    fireEvent.click(GeburtsdatumButton);


    const Legendebutton = screen.getByText('Team');
    fireEvent.click(Legendebutton);






    // Hier ebenfalls vi verwenden
    expect(mockedUsedNavigate).toHaveBeenCalledWith('/quiz?cat=20');
  })});