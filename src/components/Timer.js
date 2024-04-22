import { useEffect } from "react";
import { useQuiz } from "./QuizContext";

function Timer() {
  const { dispatch, totalSeconds } = useQuiz();
  if (totalSeconds < 0) dispatch({ type: "finish" });

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );
  if (totalSeconds > 0) {
    const mins = Math.ceil(totalSeconds / 60);
    const secs = totalSeconds % 60;

    return (
      <button className="btn">
        {mins < 10 ? "0" : ""}
        {mins}:{secs < 10 ? "0" : ""}
        {secs}
      </button>
    );
  }
}

export default Timer;
