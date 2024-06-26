import { useQuiz } from "./QuizContext";

function Progressbar() {
  const { index, numQuestions, points, maxPoints, answer } = useQuiz();
  return (
    <div className="progress">
      <progress max={15} value={index + Number(answer !== null)}></progress>
      <p>
        Question {index + 1} / {numQuestions}
      </p>
      <p>
        Points {points}/ {maxPoints}
      </p>
    </div>
  );
}

export default Progressbar;
