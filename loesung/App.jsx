import './App.css';
import Button from './Button';

const buttonLabels = ["Alpha", "Bravo", "Charlie"];


function App() {

  const myfun = (event) => {
    console.log("Hello, "+event.target.innerHTML)
    const answer = event.target.innerHTML
    document.getElementById("feedback").innerHTML = answer
    answer==="Alpha" ? document.getElementById("smiley").src = "/img/kiss_smiley.png" : document.getElementById("smiley").src = "/img/sad_smiley.png"
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Willkommen beim WISS-Quiz</h1>
        <hr />
      </header>
      <h2>Welcher Begriff kommt im <a href="https://de.wikipedia.org/wiki/ICAO-Alphabet">ICAO-Buchstabieralphabet</a> zuerst?</h2>
      { /* hier könnte ein Smiley entstehen */ }
      <img id="smiley" src="/img/question_smiley.png" alt="" />
      <hr />
      <div className="buttonbar">
        {buttonLabels.map((label) => <Button label={label} onClick={myfun} key={label}/>)}
      </div>
      <hr />
      <div className="feedbackbar">
        { /*answer*/ }
        <div id="feedback">
        </div>
      </div>
    </div>
  );
}

export default App;
