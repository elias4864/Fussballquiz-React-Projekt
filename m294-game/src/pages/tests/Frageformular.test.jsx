import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Frageform from "./Frageform";

// Mock für fetch erstellen
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ message: "Frage gespeichert" }),
  })
);

// Mock für alert erstellen, da window.alert in JSDOM nicht existiert
global.alert = jest.fn();

//Assert Frageformulat mir SUbmit Button getestet
describe("Frageformular wird getestet mit Benutereingaben", () => {
  beforeEach(() => {
    fetch.mockClear();
    alert.mockClear();
  });


  //Act  die Fragekomponente wird gemockt
  test("sollte das Formular ausfüllen und den korrekten Payload senden", async () => {
    render(<Frageform />);

    //Act Benutzereingab für die neu Frage wird hinzugeüfgt
    const questionInput = screen.getByPlaceholderText(/z.B. SQL steht für/i);
    fireEvent.change(questionInput, { target: { value: "Was ist React?" } });

    // 2. Antworten eingeben
    const answerInputs = screen.getAllByRole("textbox");
    // Der erste TextBox-Input ist die Frage, danach kommen die Antworten
    fireEvent.change(answerInputs[1], { target: { value: "Eine Bibliothek" } });
    fireEvent.change(answerInputs[2], { target: { value: "Ein Framework" } });

    // 3. Die erste Antwort als korrekt markieren (Radio Button)
    const radioButtons = screen.getAllByRole("radio");
    fireEvent.click(radioButtons[0]);

    // 4. Formular abschicken und eingeben Daten werden validiert und ans backend gesendet mit Post-Methode
    const submitButton = screen.getByRole("button", { name: /Frage hinzufügen/i });
    fireEvent.click(submitButton);

    //Act einzelne  Fragen werden simuliert/gemockt mit  der Call  KOnstante und 
    await waitFor(() => {
      // Prüfen, ob fetch aufgerufen wurde
      expect(fetch).toHaveBeenCalledTimes(1);
      
      // Den gesendeten Body analysieren
      const callArgs = JSON.parse(fetch.mock.calls[0][1].body);
      
      expect(callArgs.question).toBe("Was ist React?");
      expect(callArgs.answers[0].answer).toBe("Eine Bibliothek");
      expect(callArgs.answers[0].correct).toBe(true);
      expect(callArgs.answers[1].correct).toBe(false);
      
      expect(callArgs.answers[0].correct).toBe(false);
    });

    // Prüfen, ob die Erfolgsmeldung kam die Frage wurde am Server gepscierht
    expect(global.alert).toHaveBeenCalledWith("Frage wurde am Server gespeichert!");
  });
});