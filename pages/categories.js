// pages/categories.js

import Link from "next/link";

const Categories = () => {
  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {Object.entries(quizzes).map(([key, quiz]) => (
          <li key={key}>
            <Link href={`/quiz/${key}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
