import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import Header from "./Header";
import Main from "./Main";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progressbar from "./Progressbar";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  totalSeconds: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "Ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "Start":
      return {
        ...state,
        status: "active",
        totalSeconds: SECS_PER_QUESTION * state.questions.length,
      };
    case "newAnswer":
      const correct = state.questions.at(state.index).correctOption;
      const pts = state.questions.at(state.index).points;
      return {
        ...state,
        answer: action.payload,
        points: action.payload === correct ? state.points + pts : state.points,
      };
    case "newQuestion":
      return {
        ...state,
        answer: null,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        status: "Ready",
      };
    case "tick":
      return {
        ...state,
        totalSeconds: state.totalSeconds--,
      };
    default:
      throw new Error("Action Unknown");
  }
}

export default function App() {
  const [
    { questions, status, index, answer, points, highscore, totalSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPoints = questions.reduce((prev, curr) => prev + curr.points, 0);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataRecieved", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "Ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progressbar
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPoints={maxPoints}
              answer={answer}
            />
            <Timer totalSeconds={totalSeconds} dispatch={dispatch} />
            <Question
              question={questions.at(index)}
              dispatch={dispatch}
              answer={answer}
            />

            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPoints={maxPoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}
