import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const newQuestion = req.body;

    const filePath = path.join(process.cwd(), "data", "questions.json");
    const fileData = fs.readFileSync(filePath);
    const questions = JSON.parse(fileData);

    // Add the new question to the respective category
    const category = newQuestion.category.toLowerCase();
    const categoryQuestions = questions[category] || [];

    // Create a new ID for the question
    const newId = `q${categoryQuestions.length + 1}`;
    const questionData = {
      id: newId,
      question: newQuestion.question,
      options: newQuestion.options,
      answer: newQuestion.answer,
    };

    categoryQuestions.push(questionData);
    questions[category] = categoryQuestions;

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(questions, null, 2));

    res.status(200).json({ message: "Question added successfully" });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
