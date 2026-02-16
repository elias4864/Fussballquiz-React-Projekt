import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import KategoryForm from "./KategoryForm"; // Pfad anpassen

// 1. Mock für useNavigate erstellen
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

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

  it("sollte die Eingabefelder aktualisieren und das Formular absenden", async () => {
    render(
      <MemoryRouter>
        <KategoryForm />
      </MemoryRouter>
    );

    // Felder identifizieren (wir nutzen die Labels aus deinem Code)
    const nameInput = screen.getByLabelText(/Kategoriename:/i);
    const idInput = screen.getByLabelText(/Kategorie ID:/i);
    const questionIdInput = screen.getByLabelText(/Frage ID:/i);
    const submitButton = screen.getByRole("button", { name: /Hinzufügen/i });

    // 3. Benutzereingaben simulieren
    fireEvent.change(nameInput, { target: { value: "Sport", name: "name" } });
    fireEvent.change(idInput, { target: { value: "1", name: "id" } });
    fireEvent.change(questionIdInput, { target: { value: "101", name: "question_id" } });

    // 4. Formular absenden
    fireEvent.click(submitButton);

    // 5. Überprüfen, ob fetch mit den richtigen Daten aufgerufen wurde
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