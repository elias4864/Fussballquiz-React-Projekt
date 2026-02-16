import { QuizButton } from './Buttons.jsx';

import React, { useState } from 'react';
export const alleFragen = [
  {
    id: 1,
    catId: 30, // Beispiel: Kategorie 'Schweizer Nationalspieler'
    question: "Welche Position spielt Yann Sommer?",
    answers: ["Verteidiger", "Mittelfeld", "Torwart", "Sturm"],
    correct_answer: "Torwart"
  },
  {
    id: 2,
    catId: 55, // Beispiel: Kategorie 'Legenden'
    question: "In welchem Jahr wurde Diego Maradona geboren?",
    answers: ["1955", "1960", "1965", "1970"],
    correct_answer: "1960"
  },
  {
    id: 3,
    catId: 10,
    question: "Für welche Nationalität spielt Kylian Mbappé?",
    answers: ["Portugal", "Spanien", "Frankreich", "Schweiz"],
    correct_answer: "Frankreich"
  },
  {
    id: 4,
    catId: 35,
    question: "Welcher dieser  vorgegebenen Spieler ist ein Verteidiger?",
    answers: ["Xherdan Shaqiri", "Manuel Akanji", "Breel Embolo", "Cristiano Ronaldo"],
    correct_answer: "Manuel Akanji"
  },

  { id:5, 
    catId: 35,
    question : "Welcher Spieler hat die EM 2008 und EM 2012 gewonnen?",
    answers: ["Manuel  Akanji", "Iker Casillas","Christiano Ronaldo","Pelé"],
    correct_answer: "Iker Casillas",

  },

  { id: 6, catId: 38, question: "Wie viele Tore erzielte Kylian Mpappé im letzen Spiel?",
    answers: ["4 Tore", "2 Tore", "3 Tore", "1 Tor"],
    correct_answer: "4 Tore"


  },


  { id: 7, catId: 38, question: "Wie viele Tore erzielte Kylian Mpappé im letzen Spiel?",
    answers: ["4 Tore", "2 Tore", "3 Tore", "1 Tor"],
    correct_answer: "4 Tore"


  },

 

  { id: 8, catId: 80, question : "Was ist der Vorname des Spielers mit der Id 80?",
    answers: ["Oliver","Manuel","Kylian","Ricardo"],
    correct_answer:"Oliver"

  },


  { id:9,  catId: 10, question: "Von welchem Land kommt Diego Maradona?", 
  answers: ['Argentinien', 'Brasilien', 'Kolumbien', 'Honduras'],
  correct_answer: "Argentinien"
  },
];
 





const QuestionDisplay = ({
  frage,
  alleFragenArray, // Das gesamte Array für den Join
  statusBild,
  frageNummer,
  gesamtFragen,
  onAntwort
}) => {




  if (!frage) return <div>Lade Frage...</div>;

  // --- JOIN LOGIK ---
  // Hier werden alle Fragentexte aus dem Array mit einem Trenner verbunden
  const alleFragenTexteGesejoined = alleFragenArray
    ? alleFragenArray.map((f) => f.question).join(' +++ ')
    : "Keine Liste verfügbar";

  return (
    <div className="quiz-page-wrapper" style={{ fontFamily: 'sans-serif', padding: '20px' }}>
      
      {/* 1. DER QUIZ BEREICH (Einzelfrage) */}
      <div className="quiz-container" style={{ border: '2px solid #333', padding: '20px', borderRadius: '10px' }}>
        <div className="session-header">
          <strong>Frage: {frageNummer} / {gesamtFragen}</strong>
        </div>

        {statusBild && <img src={statusBild} className="statusbild" alt="Status" style={{ width: '80px' }} />}

        <p className="question-text" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
          {frage.question}
        </p>

        <div className="buttons" style={{ display: 'grid', gap: '10px' }}>
          {frage.answers.map((antwort, i) => (
            <QuizButton
              key={`${frage.id}-${i}`}
              text={antwort}
              onKlick={() => onAntwort(antwort)}
            />
          ))}
        </div>
      </div>

      <hr style={{ margin: '40px 0' }} />

      {/* 2. DER JOIN BEREICH (Alle Fragen kombiniert) */}
      <div className="joins-output" style={{ background: '#f0f0f0', padding: '15px', borderRadius: '5px' }}>
        <h3>Alle Fragen im Überblick (Joined):</h3>
        <p style={{ fontStyle: 'italic', color: '#555' }}>
          {alleFragenTexteGesejoined}
        </p>
      </div>

    </div>
  );
};

export default QuestionDisplay;
