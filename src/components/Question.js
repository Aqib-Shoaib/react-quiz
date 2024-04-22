import Options from "./Options";
import { useQuiz } from "./QuizContext";

function Question() {
  const { questions, dispatch, answer, index } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h2>{question.question}</h2>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}

export default Question;
