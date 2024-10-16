import Link from "next/link";
import categories from "../data/categories";
import NewQuestionForm from "@/components/NewQuestionForm";

const Home = () => {
  return (
    <div className="container card mt-5 p-5">
      <h1 className="text-center">Quiz App</h1>
      <p className="text-center">
        To get started you must first select a category
      </p>
      <div className="d-flex justify-content-center flex-column align-items-center">
        {/* Displaying categories */}
        {categories.map((category) => (
          <Link key={category.id} href={`/quiz/${category.name.toLowerCase()}`}>
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>

      {/* Add the New Question Form Below */}
      <NewQuestionForm />
    </div>
  );
};

export default Home;
