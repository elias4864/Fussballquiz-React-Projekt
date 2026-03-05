export function QuizButton({ text, onKlick }) {
  return (
    <button className="button2" onClick={onKlick}>
      {text}
    </button>
  );
}
