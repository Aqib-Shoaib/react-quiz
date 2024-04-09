function StartScreen({ numQuestions }) {
  return (
    <div className="start">
      <h2>Welcome to The React Quiz</h2>
      <h3>{numQuestions} Questions to test your react mastery</h3>
      <button className="btn btn-ui">Let's Go</button>
    </div>
  );
}

export default StartScreen;
