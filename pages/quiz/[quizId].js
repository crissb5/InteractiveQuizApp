import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Quiz = ({ quizId, quizQuestions }) => {
  const router = useRouter();
  const { question: questionIndex = 1 } = router.query; // Track the current question number, default to 1
  const currentQuestionIndex = parseInt(questionIndex, 10) - 1; // Adjust to start from 0 for array indexing

  // State to track selected answers, points, and correct answers
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // New state to track correct answers

  const currentQuestion = quizQuestions[currentQuestionIndex];

  const handleAnswerSelect = (selectedOption) => {
    const correctAnswer = currentQuestion.answer;
    if (selectedOption === correctAnswer) {
      setFeedbackMessage("Correct!");
      setScore(score + 5); // Add 5 points for a correct answer
      setCorrectAnswersCount(correctAnswersCount + 1); // Increment correct answers count
    } else {
      setFeedbackMessage("Wrong answer!");
    }
    setSelectedAnswer(selectedOption); // Disable answer buttons after selection
  };

  const handleNextQuestion = () => {
    const nextQuestionIndex = currentQuestionIndex + 2; // Move to the next question (add 2 to match URL index)
    if (nextQuestionIndex <= quizQuestions.length) {
      // Move to the next question, making sure to use the correct dynamic route format
      router.push({
        pathname: `/quiz/${quizId}`, // This is the correct route for the quiz
        query: { question: nextQuestionIndex }, // Add the next question index as a query parameter
      });

      // Reset for the next question
      setSelectedAnswer(null);
      setFeedbackMessage("");
    } else {
      // If it's the last question, go to the result page with the score and correct answers
      router.push(
        `/results?score=${score}&correct=${correctAnswersCount}&total=${quizQuestions.length}`
      );
    }
  };

  if (!currentQuestion) {
    return <div>No questions available for this category.</div>;
  }

  return (
    <div className="container mt-5 p-5">
      <h2 className="text-center">
        {quizId.charAt(0).toUpperCase() + quizId.slice(1)} - Question{" "}
        {currentQuestionIndex + 1}
      </h2>

      <div className="mb-3">
        <h5>{currentQuestion.question}</h5>
        <ul>
          {currentQuestion.options.map((option) => (
            <li key={option}>
              <button
                className="btn"
                onClick={() => handleAnswerSelect(option)}
                disabled={!!selectedAnswer} // Disable buttons after selecting an answer
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {selectedAnswer && (
        <p
          className={`mt-2 ${
            feedbackMessage === "Correct!" ? "text-success" : "text-danger"
          }`}
        >
          {feedbackMessage}
        </p>
      )}

      {/* Always show the "Next Question" button after the user selects an answer */}
      {selectedAnswer && (
        <button className="btn btn-success mt-3" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}

      <p className="mt-3">Current Score: {score}</p>

      <Link href="/">
        <button className="btn btn-primary mt-4">Return to Categories</button>
      </Link>
    </div>
  );
};

// getServerSideProps function for SSR
export const getServerSideProps = async (context) => {
  // Extract quizId from the context (URL parameters)
  const { quizId } = context.params;
  const { question = 1 } = context.query; // Get the current question index from query parameters, default to 1

  // Import the questions data (this will be run on the server)
  const questions = (await import("../../data/questions.json")).default;

  // Get the questions for the specified quizId category
  const quizQuestions = questions[quizId] || null;

  // If no questions are found for the category, return a 404 error
  if (!quizQuestions) {
    return {
      notFound: true,
    };
  }

  // Pass quizId, quizQuestions, and the current question index as props to the component
  return {
    props: {
      quizId,
      quizQuestions,
      question: parseInt(question, 10),
    },
  };
};

export default Quiz;
