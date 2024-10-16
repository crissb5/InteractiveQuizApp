import { useRouter } from "next/router";
import Link from "next/link";

const Results = () => {
  const router = useRouter();
  const { score, correct, total } = router.query; // Get score, correct answers, and total questions from query parameters

  // Create an encouraging message based on the score
  let message;
  const percentage = (correct / total) * 100;

  if (percentage === 100) {
    message = "Perfect score! You're a quiz master!";
  } else if (percentage >= 75) {
    message = "Great job! You really know your stuff!";
  } else if (percentage >= 50) {
    message = "Not bad! Keep studying and you'll improve even more!";
  } else {
    message = "Don't worry! Keep practicing, and you'll get better!";
  }

  return (
    <div className="container mt-5 p-5 text-center">
      <h1>Quiz Completed!</h1>
      <h2>Your Final Score: {score} points</h2>
      <h3>
        Correct Answers: {correct} out of {total}
      </h3>
      <p>{message}</p>
      <Link href="/">
        <button className="btn btn-primary mt-4">Return to Categories</button>
      </Link>
    </div>
  );
};

export default Results;
