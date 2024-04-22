import { useQuiz } from "./QuizContext";

function FinishScreen() {
  const { points, maxPoints, highscore, dispatch } = useQuiz();
  return (
    <>
      <p className="result">
        You Got {points} out of {maxPoints} marks (X%)
      </p>
      <p className="highscore"> HighScore : {highscore}</p>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}

export default FinishScreen;
