import { useEffect, useState } from "react";

export default function Questions() {
  // Initialize state to hold questions
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetch questions data from the local file using useEffect
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate fetching data from a local file
        const response = await fetch("/data/questions.json");
        const data = await response.json();
        setQuestions(data); // Set the fetched data into state
        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        console.error("Error fetching the questions:", error);
        setLoading(false);
      }
    };

    fetchData(); // Invoke fetch data when component mounts
  }, []);

  // Render a loading indicator while the data is being fetched
  if (loading) {
    return <p>Loading questions...</p>;
  }

  // Render if questions are available
  return (
    <div>
      <h1>Questions</h1>
      {questions ? (
        Object.keys(questions).map((category) => (
          <div key={category}>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <ul>
              {questions[category].map((q) => (
                <li key={q.id}>
                  <strong>{q.question}</strong>
                  <ul>
                    {q.options.map((option, index) => (
                      <li key={index}>{option}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No questions found.</p>
      )}
    </div>
  );
}
