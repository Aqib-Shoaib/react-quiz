import { useEffect } from "react";

function Timer({ dispatch, totalSeconds }) {
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
