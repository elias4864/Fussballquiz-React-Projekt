import './App.css';
import Button from './Button';

function App() {

  const question = {
    question: "Was ist 2 * 4",
    answers: [
      3, 5, 8
    ],
    correct_answer: 8
  }

  const myfun = (event) => {
    console.log("Hello, "+event.target.innerHTML)
    const answer = event.target.innerHTML
    document.getElementById("feedback").innerHTML = answer
    answer==question.correct_answer ? document.getElementById("smiley").src = "/img/kiss_smiley.png" : document.getElementById("smiley").src = "/img/sad_smiley.png"
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Willkommen beim WISS-Quiz</h1>
        <hr />
      </header>
      <h2>question.question</h2>
      { /* hier könnte ein Smiley entstehen */ }
      <img id="smiley" src="/img/question_smiley.png" alt="" />
      <hr />
      <div className="buttonbar">
        {question.answers.map((label) => <Button label={label} onClick={myfun} key={label}/>)}
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
