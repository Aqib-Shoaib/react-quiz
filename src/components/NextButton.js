function NextButton({ dispatch, answer }) {
  console.log(answer);
  if (answer === null) return null;
  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "newQuestion" })}
    >
      Next
    </button>
  );
}

export default NextButton;
