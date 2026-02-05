import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import GlobalNavigation from "./pages/components/GlobalNavigation.jsx";
describe("GlobalNavigation Komponenten Tests", () => {
    test("Sollte alle vier Navigations-Links enthalten (Aufgabe 5)", () => {
        render(
            <BrowserRouter>
                <GlobalNavigation />
            </BrowserRouter>
        );

        // Prüfen der geforderten Links wie 
        expect(screen.getByRole('link', { name: /impressum/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /quiz/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /regeln/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /kategorien/i })).toBeInTheDocument();
        expect(screen.getByRole('link',{name: /fragen/i})).toBeInTheDocument();

        
        expect(screen.getByRole('link', { name: /auswertung/i })).toBeInTheDocument();
       



    });
});