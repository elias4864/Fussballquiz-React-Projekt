import { useNavigate } from 'react-router-dom';

export default function Spielregeln() {
  const navigate = useNavigate();

  return (
    <div className="spielregeln">
      <h2 className='regeln'>Spielregeln Fussballquiz 2026</h2>
      
      <section style={{ textAlign: 'left', marginBottom: '30px', fontSize: '30px',   }}>

        <ul>
          <li>Wähle  bitte eine Kategorie aus der Kategorieliste aus um das Thema der Frage zu bestimmen</li>
          <li>Der Name der Kategorie,Frage oder der "Kategorie-ID" darf nicht leer sein bevor sie ans Backend geschickt werden und hinzugefügt/gelöscht  werden zum Quiz</li>
          <li>Beantworte die Fragen durch <b>Anlicken</b> auf die Antwort-Buttons-</li>
          <li>Vor dem Absenden des Buttons "Hinzufügen/Löschen" bzw der des "Speichern" Buttons wird der User explixit auffgefordert und gewarnt ob er die Kategoire mit den Properties (Id,  question udn cat_id)  tatsächlich entfernen/zu Listes hinzufügen möchte und die Daten ans Backend  gesendent werden und gefetcht und zurückgessndet werden an dne Browser</li>  
          <li>Pro Frage hast du nur eine Chance  um die korrekte Antwort herauszufinden, danach erscheint die nächste Frage/Runde</li>
          <li><b>Wichtig:</b>Die Frage wird erst  dann vom System validiert wenn der Button gedrückt wurde ein Darüberfahren ist ungültig und die gewählte Antwort wird nocht ausgewertet</li>
          <li>Nur eine Antwort der 4 möglichen Antworten  ist jeweils korrekt!</li>
          <li>Für das Spiel ist es ausdrücklick verboten die  <strong>MySQL Datenbank  zu konsultieren</strong>:erlaubt ist nur ein Blatt Papier um die Antwort vor dem voreiligen Anklicken des Buttons gut zu überlegen und sich die seine  potentielle Antwort zu notieren </li> 
          <li>Das Fussballquiz 2026  kann mehrmals gespielt werden</li>
          <li>Der Spieler erhält am Ende des Spiels eine Darstellung seiner Spielleistung durch Anzahl Sterne- Die schlechteste Auswertung mit 1-nem Stern erhält ein Spieler mit 0 richtig beantworteten Fragen die Bestnote und so weite je höher di Leistung desto mehr Sterne.Die Bestnote wird mit 5 Sternen erteilt wenn alle Fragen korrekt beantwortet wurden!</li>
          <li>Bei einer falschen Antwort wird der Score um 1 kleiner, bei der Beantwortung der richtigen Frage gibt erhöht sich der Score um 1</li>
          <li>Das Fussbalquiz ist ein Single Player Game</li>
          <li>Wähle bitte eine  der 4 Sprachen  in der Startseite aus(Deutsch, Englisch, Französisch oder Holländisch)</li>
          <li>Es wird nur eine Kategorie wellche welche zu einem Thema der Frag past und  muss mindestens 3 Zeichen lang sein im Katgorieformular</li>
          <li>Die Länge der Frage die der Spieler hinzufügt zum Quiz muss mindestens 3 Buchstaben lang sein damit sie vom System validiert wird, sowie das Kategoriefomular bentötigt die Id der  Kategorie sowei der Name der Kategorie damit sie im backend hinzugefüt wird zu der Kategorieliste</li>
          <h2><ins>Spielerweiterung:</ins></h2><li>Um das Spiel  spannender zu machen kann eine  zusätzliche Frage mit einer Id  und dementsprechen eine Kateogrie  hinzugefügt werden entweder im Formular oder auch über Postman auf dem  entsprechenden Endpoint  im Body mit den Attributen   wie auch vom User gelöscht werden</li>
          <h2>Um eine neue Frage/Kateogri ins Quiz zu integrieren muss sei im Array alleFragen hinzugefügt werden und somit auch in der Spielansich die neu Frage erscheint ,bzw im Objekt kateogrien  wo sie wie in eienr Bibliothekt abgespeichert werden  </h2> 
         <h2 className="spielregeln"><b><ins>Ziel des Spiels:</ins> Du hast das Fussballspiel gewonnen falls du alle 8 Antworten korrekt beantwortet hast und verloren falls dein Score  negativ ist</b></h2>
         </ul>
     
      </section>
  
      
      <button 
        className="kategorie" 
        onClick={() => navigate('/kategorien')}
        style={{ padding: '10px 20px', cursor: 'pointer', backgroundColor: '#b30cc6', color: 'white', border: 'none', borderRadius: '10px' }}
      >
        Kategorie wählen und Spiel Starten 
      </button>
      <button 
        className="kategorie" 
        onClick={() => navigate('/new-category')}
        style={{ padding: '30px 20px', cursor: 'pointer', backgroundColor: '#e6810f', color: 'white', border: 'none', borderRadius: '10px' }}
      >
        Eine neue Kategorie oder Frage wird hinzugefügt 
      </button>

       






      
      
      
    </div>
  );
}