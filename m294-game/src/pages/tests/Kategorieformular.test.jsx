import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import KategoryForm from "../components/KategoryForm"; // Pfad anpassen

// 1. Mock für useNavigate erstellen
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});




//Arrange Kateogirformular mut Button di angelick twerden   Firevent simuliert 

describe("KategoryForm Komponente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // 2. Mock für fetch erstellen
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Erfolg" }),
      })
    );
  });

  // Hinnavigieren des Brwoser zum Endpoint /new-category wird simuliet  indem Komponetn eingebudne in Memoryroute

  it("sollte die Eingabefelder aktualisieren und das Formular absenden", async () => {
    render(
      <MemoryRouter>
        <KategoryForm />
      </MemoryRouter>
    );

    // Felder identifizieren (wir nutzen die Labels aus deinem Code)
    const nameInput = screen.getByLabelText(/Kategoriename:/i);
    const idInput = screen.getByLabelText(/Kategorieid:/i);
    const questionIdInput = screen.getByLabelText(/Frage ID:/i);
   
    const submitButton = screen.getByRole("button", { name: /Hinzufügen/i });
    

    // 3. Benutzereingaben simulieren und einzelen Kategorien werden validiert 
    fireEvent.change(nameInput, { target: { value: "Sport", name: "name" } });
    
    fireEvent.change(idInput, { target: { value: "1", name: "id" } });
  
    
    
    fireEvent.change(questionIdInput, { target: { value: "101", name: "question_id" } });

//Absesnden des Kategoriebuttons  wird geklickt
    fireEvent.click(submitButton);

    // 5. Überprüfen, ob fetch mit den richtigen Daten aufgerufen wurde, asynchron auf Backend Server warten  bis er Objekt aus Datenbank holt(fetcht)
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8081/categories",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            name: "Sport",
            id: "1",
            question_id: "101",
          }),
        })
      );
    });

    // 6. Überprüfen, ob die Navigation zur richtigen URL erfolgte
    expect(mockNavigate).toHaveBeenCalledWith("/kategorien");
  });
});