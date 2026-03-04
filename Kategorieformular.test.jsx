import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { vi, describe, it, expect, beforeEach } from "vitest";
import KategoryForm from "../components/KategoryForm";


//usesr spietl als würde  geüf twri dib nach dme Sep d rKatoeg er  zur Kateogrliste weitergeführt wird
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return { ...actual, useNavigate: () => mockNavigate };
});


//ANtwort des Srever im Response nachdem die Frage hinzugefügt wird wrid wird simuliert  
describe("KategoryForm Komponente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // 1. Fetch Mock
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ message: "Erfolgreich gespeichert" }),
      })
    );

    // 2. Window-Methoden Mocken (WICHTIG!)
    vi.spyOn(window, 'confirm').mockImplementation(() => true);
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it("sollte die Eingabefelder aktualisieren und das Formular absenden", async () => {
    render(
      <MemoryRouter>
        <KategoryForm />
      </MemoryRouter>
    );


    //Name der Inputfelder wird in der KOmpoente Kategorieformular erwartet
    const nameInput = screen.getByLabelText(/Kategoriename:/i);
    const idInput = screen.getByLabelText(/Kategorie-ID/i);
    const submitButton = screen.getByRole("button", { name: /Speichern/i });




    // 3. Eingaben simulieren (Die 'id' muss zum htmlFor/id der Komponente passen)
    fireEvent.change(nameInput, { target: { value: "Fussball" } });
    fireEvent.change(idInput, { target: { value: "10" } });

    // 4. Submit auslösen
    fireEvent.click(submitButton);


    //Fetch MEtd mit Beipsielwerte im BOdy werden an backen gesendet  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://localhost:8081/categories/createcategory",
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({ 
            id: "10", 
            category_name: "Fussball" 
          }),
        })
      );
    });

    // 6. Navigation prüfen (Pfad muss zum Code passen: /kategorieliste)
    expect(mockNavigate).toHaveBeenCalledWith("/kategorieliste");
  });
});