import { createContext, useContext, useEffect, useReducer } from "react";

const Context = createContext();

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

function QuizCont({ children }) {
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
    <Context.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        totalSeconds,
        numQuestions,
        maxPoints,

        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
}

function useQuiz() {
  const contxt = useContext(Context);
  //   console.log(contxt);
  if (contxt === undefined)
    throw new Error("Context was used outside its scope!");
  return contxt;
}
export { QuizCont, useQuiz };
