function FinishScreen({ points, maxPoints, highscore, dispatch }) {
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
