import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Falls du Komponenten mocken möchst, um Seiteneffekte zu vermeiden:
jest.mock('./Question', () => () => <div data-testid="question-page">Frage-Seite</div>);
//Eigentlicher test
describe('App Routing', () => {
  test('rendert die Startseite standardmäßig', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Hier ein Element suchen, das nur auf dem Home-Screen existiert
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  test('navigiert zur Question-Route korrekt', () => {
    render(
      <MemoryRouter initialEntries={['/question']}>
        <App />
      </MemoryRouter>
    );
    // Prüfen, ob die gemockte Question-Komponente geladen wurde
    expect(screen.getByTestId('question-page')).toBeInTheDocument();
  });


  test('navigiert zum Kategorien Entrypoint', () => {
    render(
      <MemoryRouter initialEntries={['/kategorien']}>
        <App />
      </MemoryRouter>
    );

  });

  

  test('zeigt 404 Seite bei unbekannter Route', () => {
    render(
      <MemoryRouter initialEntries={['/irgendwas-unbekanntes']}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/nicht gefunden/i)).toBeInTheDocument();
  });
});