import React, { useState, useCallback } from "react";
import Question from "./Question";
import quiz from "../data/quiz";

function App() {
  const [questions, setQuestions] = useState(quiz);
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);

  // get the current question based on the currentQuestionId
  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  const handleQuestionAnswered = useCallback(
    (correct) => {
      if (currentQuestionId < questions.length) {
        setCurrentQuestionId((prevId) => prevId + 1);
      } else {
        // End the game if no more questions
        setCurrentQuestionId(null); 
      }
      if (correct) {
        setScore((prevScore) => prevScore + 1);
      }
    },
    [currentQuestionId, questions.length]
  );

  if (questions.length === 0) {
    return <h1>No questions available</h1>;
  }

  return (
    <main>
      <section>
        {currentQuestion ? (
          <Question
            question={currentQuestion}
            onAnswered={handleQuestionAnswered}
          />
        ) : (
          <>
            <h1>Game Over</h1>
            <h2>Total Correct: {score}</h2>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
