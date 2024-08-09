import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(() => {
    // Function to handle the countdown
    const countdown = () => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          //to notify parent component
          onAnswered(false); 
          //next question timer reset
          return 10; 
        }
        return prevTime  -1;
      });
    };

    // countdown interval set up
    const timerId = setInterval(countdown, 1000);

    // Cleanup function for clearing the interval when the component unmounts or timer changes
    return () => clearInterval(timerId);
  }, [onAnswered]);

  function handleAnswer(isCorrect) {
    // Reset timer when an answer is selected
    setTimeRemaining(10); 
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button
            key={answer}
            onClick={() => handleAnswer(isCorrect)}
            aria-label={`Answer choice ${index + 1}: ${answer}`}
          >
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
