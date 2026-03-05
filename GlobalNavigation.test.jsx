import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalNavigation from "../components/GlobalNavigation.jsx";
import { expect } from 'vitest';

//Testbeschreibung und GLobalNavigation Komponente  wird in BrwoserRouter  geladen dait im GUI angezeigt wird
describe("GlobalNavigation Komponenten Tests", () => {
    test("Sollte alle 11 Navigationslinks für die einzelne Pages richtig prüfen also der Text der  Navbar  prüfen", () => {
        render(
            <BrowserRouter>
                <GlobalNavigation />
            </BrowserRouter>
        );

        // Prüfen der geforderten Links also Entryoints tatsähclihc korrekt von der GLoabLnaviagiotsnleiste gerendert werden von der entsprehcenden komponente zugehörog
        expect(screen.getByRole('link', { name: /impressum/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /quiz/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /spielregeln/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /kategorien/i })).toBeInTheDocument();
        expect(screen.getByRole('link', {name: /frageliste/i})).toBeInTheDocument();
        
        expect(screen.getByRole('link', { name: /kategorie hinzufügen/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /kategorieliste/i })).toBeInTheDocument();

        expect(screen.getByRole('link',{name: /fragen/i})).toBeInTheDocument();
        expect(screen.getByRole('link',{name:/frage hinzufügen/i})).toBeInTheDocument();
        
        expect(screen.getByRole('link', { name: /auswertung/i })).toBeInTheDocument();
       



    });
});