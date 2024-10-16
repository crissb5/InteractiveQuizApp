import { useState } from "react";

const NewQuestionForm = () => {
  const [newQuestion, setNewQuestion] = useState({
    category: "",
    question: "",
    options: ["", "", ""],
    answer: "",
  });

  const [message, setMessage] = useState(""); // To show success or error messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...newQuestion.options];
    updatedOptions[index] = value;
    setNewQuestion({ ...newQuestion, options: updatedOptions });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure that all fields are filled before submitting
    if (!newQuestion.category || !newQuestion.question || !newQuestion.answer) {
      setMessage("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("/api/add-question", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });

      if (response.ok) {
        setMessage("Question added successfully!");
        // Reset the form after successful submission
        setNewQuestion({
          category: "",
          question: "",
          options: ["", "", ""],
          answer: "",
        });
      } else {
        setMessage("Failed to add question.");
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessage("There was an error.");
    }
  };

  return (
    <div className="mt-5">
      <h3>Add a New Question</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Category</label>
          <select
            className="form-control"
            name="category"
            value={newQuestion.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
          </select>
        </div>

        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            className="form-control"
            name="question"
            value={newQuestion.question}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Answer Options</label>
          {newQuestion.options.map((option, index) => (
            <input
              key={index}
              type="text"
              className="form-control my-2"
              value={option}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              required
            />
          ))}
        </div>

        <div className="form-group">
          <label>Correct Answer</label>
          <input
            type="text"
            className="form-control"
            name="answer"
            value={newQuestion.answer}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Add Question
        </button>
      </form>

      {message && <p className="mt-3">{message}</p>}
    </div>
  );
};

export default NewQuestionForm;
