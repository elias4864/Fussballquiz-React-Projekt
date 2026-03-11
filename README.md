# ⚽ Modul 294: Fussballquiz 2026 – Single-Player Game
Dieses Repository enthält eine interaktive Web-Applikation für ein Fussball-Quiz. Die Anwendung nutzt eine klassische 3-Schichten-Architektur, um ein nahtloses Spielerlebnis mit dynamischen Inhalten direkt aus einer Datenbank zu ermöglichen.

 #  Systemarchitektur-3 Schichten Architektur
Das Projekt ist modular aufgebaut in Unterordner /pages, /components und /tests, um eine saubere Trennung zwischen dem Spielabaluft und  der visuellen Darstellung(Gameboard) zu gewährleisten:

Frontend (/frontend): Eine moderne React-Applikation welcher auf dem  Viteserver auf dem Port: http://localhost:5173/  läuft , die für die Spiellogik, das User-Interface und die Visualisierung der Spielerstatistiken zuständig ist.

Backend (/backend): Eine Java Spring-Boot REST-API, welche die Geschäftslogik steuert und den Datenbankzugriff über CRUD-Befehle sicherstellt.

Datenbank: MySQL-Datenbank (fussball_quiz) auf Port 3306  mit allen Quizfragen und Modellklassen und den Antworten sowie der zugehörigen Kategorie, Fragen, Spieler, zugehöriges Team sowie Liga(nicht relevant für Frontend)
 Key Features
 # Game Experience & Feedback
Interaktive Steuerung: Beantwortung von Fragen zu Spielern, Positionen und Toren einfach per Mausklick.

Real-time Feedback: Sofortige Korrektur bei Fehlern durch Alert-Meldungen. Visuelle Statussymbole wie das "Congratulations-Bild" oder das "Rote Warnschild" geben direkt Rückmeldung.

Timeout:  Automatisierte Verzögerung von 2 Sekunden  zwischen den Fragen für einen flüssigen Spielablauf

Gamification: Ein fiktives Sterne-Ranking-System und farbliche Balkendiagramme visualisieren die individuelle Spielleistung

 # Verwaltung & Administration
CRUD-Schnittstellen: Dynamisches Anzeigen, Hinzufügen und Löschen von Fragen und Kategorien über Formulare .

User Management: Registrierungssystem für Spieleraccounts im Impressum.

API-Integration: Kommunikation via REST-Endpoints (z. B. /categories, /quiz, /questions) mittels asynchroner fetch-Aufrufe und useEffect-Hooks
User Management: Registrierungssystem für Spieleraccounts (im Bereich Impressum).

Testing (Jest Framework)
Um Usereingaben in Formularen zu simulieren in Inputfelder  oder dem korrekten Routing der Pages sicherzustellen , verfügt das Frontend über automatisierte Unit-Tests der wichtigsten Systemkomponenten der Applikation

 Test Ordner : /tests
 Unit Tests  automatisch ausführen: 
 -npm test 


# Docker Datenbankverbindung zu  DB  "fussball_quiz"


Du kannst die Datenbank entweder lokal  im Backend über die Konsole oder alle Abhängigkeiten direkt(Backend, Frotend) per Docker Dekstop deployen

Option A: Docker Desktop
Die Anwendung ist für den Betrieb in Containern vorbereitet. Mit Docker Desktop wird die gesamte Umgebung (DB, Backend, Frontend) automatisch vernetzt.


Im Hauptverzeichnis   "fussball_quiz" Dockerfile  deployenn:

Bash
docker-compose up --build 
Die Datenbank ist nun isoliert im Container erreichbar, während das Backend die Verbindung automatisch über den Service-Namen aufbaut.

Hier ist der spezifische Abschnitt für deine Option B, den du direkt in deine README unter den Bereich „Datenbankverbindung“ kopieren kannst. Ich habe die Port-Logik (intern 3307 / extern 3306) und deine Benutzerdaten integriert.

# Option B: Manuelle Datenbank-Verbindung (DDL Source Root)
Falls Sie die Datenbank manuell verwalten oder über eine IDE (z. B. IntelliJ IDEA, DataGrip) eine DDL Data Source anbinden möchten, nutzen Sie die folgende Konfiguration für den Zugriff auf den Docker-Container:

1. Port-Mapping & Zugriff
Die Datenbank ist so konfiguriert, dass sie intern im Docker-Netzwerk auf Port 3307 kommuniziert, aber nach aussen (Host-System) auf Port 3306 exposed ist

Externer Port (Host): 3305 Worbench Server mt  Connection udn User "root"  

Interner Port (Container): 3307 

Host: localhost

2. Verbindungsdaten
Um die Verbindung erfolgreich herzustellen, verwenden Sie diese Credentials:

Datenbank (Schema): fussball_quiz(gemäss MYSQL Datenabk auf Workbenc

Benutzer: fussball_elias(User "fussball_elias muss Berechtigung von DB erhalten udn erstellt sein)!

JDBC Connection String:  spring.datasource.url=jdbc:mysql://localhost:3307/fussball_quiz


3. Einrichtung einer DDL Data Source (IDE-spezifisch)
Klicken Sie in Ihrer IDE auf New Data Source -> MySQL.

Wählen Sie als DDL Source Root den Ordner in Ihrem Projekt aus, der die SQL-Skripte enthält.

Tragen Sie den User fussball_elias und den Port 3307 ein um eine Datenbankverbindung mit dem Container "fussball_db" zu erhalten 

Klicken Sie auf Test Connection, um die Erreichbarkeit des Docker-Containers zu prüfen.

Stelle sicher, dass eine MySQL Worrbench Server  auf localhost:3306 läuft mit der Connection "root" und exposed ist 

Führe die DDL-Skripte aus, um die Tabellen answer, category, league, player, question und team anzulegen.

# Voraussetzungen & Installation
Backend (Spring Boot)
Anforderung: JDK Version 17 oder höher.




Backend Applikation starten(Tomcat Server+Hibernate):
 Terminal (CMD/PD) im Projektordner öffnen:
C:\Users\elias\OneDrive - Kalaidos Bildungsgruppe AG\Documents\WISS\WISS-Module\Semester 3\Modul 295\Fussballquizapplikation> 
Befehle um Tomcat Server zu starten:
-./mvnw spring-boot:run 
-mvn spring:boot run
Frontend (React):

Anforderung: Node.js installiert.

Installation Frontend Applikation:
Neues Terminal PS/CMD im folgenden  React Projektordner 
C:\Users\elias\OneDrive - Kalaidos Bildungsgruppe AG\Documents\WISS\WISS-Module\Semester 3\294-Frontend einer interaktiven Webapplikation realisieren\NodejsServer\Fussballquiz React Projekt\m294-game\m294-game> öffnen:
Befehl um Frontend(Viteserver) zu starten:
-npm run dev




#   Architketursersionen in Node.js/IDE der

- mindestens Node Version 18.x oder 20.x empfohlen 
-  JDK Version  17 oder höher



