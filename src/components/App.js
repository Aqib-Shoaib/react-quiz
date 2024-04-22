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
import { useQuiz } from "./QuizContext";

export default function App() {
  const { status } = useQuiz();

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "Ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progressbar />
            <Timer />
            <Question />

            <NextButton />
          </>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}
