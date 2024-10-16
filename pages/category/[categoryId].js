// pages/category/[categoryId].js

import { useRouter } from "next/router";
import Link from "next/link";

const CategoryPage = () => {
  const router = useRouter();
  const { categoryId } = router.query;

  if (!categoryId) {
    return <p>Loading...</p>;
  }

  const categoryQuizzes = quizzes[categoryId] || [];

  return (
    <div>
      <h1>
        {categoryId.charAt(0).toUpperCase() + categoryId.slice(1)} Quizzes
      </h1>
      <ul>
        {categoryQuizzes.length > 0 ? (
          categoryQuizzes.map((quiz) => (
            <li key={quiz.id}>
              <h2>{quiz.name}</h2>
              <p>{quiz.description}</p>
              <Link href={`/quiz/${quiz.id}`}>
                <a>Start {quiz.name}</a>
              </Link>
            </li>
          ))
        ) : (
          <p>No quizzes available for this category.</p>
        )}
      </ul>
    </div>
  );
};

export default CategoryPage;
