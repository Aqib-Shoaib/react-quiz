import { useEffect } from "react";

function Timer({ dispatch, totalSeconds }) {
  const mins = Math.ceil(totalSeconds / 60);
  const secs = totalSeconds % 60;

  useEffect(
    function () {
      const id = setInterval(function () {
        dispatch({ type: "tick" });
      }, 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  return (
    <button className="btn">
      {mins < 10 ? "0" : ""}
      {mins}:{secs < 10 ? "0" : ""}
      {secs}
    </button>
  );
}

export default Timer;
