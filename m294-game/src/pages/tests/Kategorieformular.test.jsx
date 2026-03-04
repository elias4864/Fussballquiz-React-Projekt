import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import KategoryForm from "../components/KategoryForm";

// 1. Mock für useNavigate
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
    // 2. Globaler Fetch Mock (Wichtig: Muss im beforeEach stehen)
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

    // Felder identifizieren
    const nameInput = screen.getByLabelText(/Kategoriename:/i);
    const idInput = screen.getByLabelText(/Kategorie-ID/i);
    const submitButton = screen.getByRole("button", { name: /Speichern/i });
    const submitButton2 = screen.getByRole("button", {name:/Abbrechen/i});

    // 3. Benutzereingaben simulieren
    // Achte darauf, dass der 'name' im target zum State deiner Komponente passt
    fireEvent.change(idInput, { target: { value: "10", name: "category_id" } });
    fireEvent.change(nameInput, { target: { value: "Fussball", name: "category_name" } });

    // 4. NUR den Speichern-Button klicken
    // Wenn du beide klickst, wird der Prozess unterbrochen!
    fireEvent.click(submitButton);
    fireEvent.click(submitButton2);
    // 5. Überprüfen, ob fetch aufgerufen wurde
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8081/categories/createcategory",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            category_name: "Fussball",
            category_id: "10", // Achte auf exakte Keys wie im Backend/State
          }),
        })
      );
    });

    // 6. Überprüfen der Navigation
    expect(mockNavigate).toHaveBeenCalledWith("/kategorien");
  });
});