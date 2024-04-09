function Options({ question, answer, dispatch }) {
  const hasAnswered = answer !== null;
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            hasAnswered
              ? index === question.correctOption
                ? "answer correct "
                : "wrong"
              : null
          } `}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          key={option}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;
