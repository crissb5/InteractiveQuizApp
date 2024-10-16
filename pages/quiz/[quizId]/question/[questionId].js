/* Afișează întrebarea curentă și opțiunile de răspuns.
Permite utilizatorului să selecteze un răspuns.*/

import { useRouter } from "next/router";

const Question = () => {
  const router = useRouter();
  const { quizId, questionId } = router.query;

  // Ensure quizId and questionId are valid before accessing data
  if (!quizId || !questionId) {
    return <div>Loading...</div>;
  }

  const quiz = quizzes[quizId];
  const question = quiz.questions[questionId];

  if (!question) {
    return <div>Question not found!</div>;
  }

  return (
    <div>
      <h2>{question.question}</h2>
      <ul>
        {question.options.map((option) => (
          <li key={option}>
            <button
              onClick={() => {
                /* handle answer selection */
              }}
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
