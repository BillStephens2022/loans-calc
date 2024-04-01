import { useState } from "react";
import PageHeader from "../../components/layout/pageHeader";
import quizData from "../../lib/quizData";
import classes from "./quiz.module.css";
import Button from "../../components/ui/button";

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const currentQuestion = quizData.questions[currentQuestionIndex];
  const totalQuestions = quizData.questions.length;

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1); // advance to the next question in the array of question objects
    setIsAnswerSubmitted(false); // Reset answer submission status for the next question
    setSelectedAnswer(null); // Reset selected answer for the next question
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    setIsAnswerSubmitted(true);
  };

  // Check if all questions have been answered
  const isQuizFinished = currentQuestionIndex === totalQuestions;

  const handleRetakeQuiz = () => {
    setCurrentQuestionIndex(0); // Reset to the first question
    setScore(0); // Reset the score
    setSelectedAnswer(null); // Reset the selected answer
    setIsAnswerSubmitted(false); // Reset the answer submission status
  };

  return (
    <div className={classes.quizPage}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Quiz</h1>
      </PageHeader>
      <main className={classes.main}>
        {!isQuizFinished ? (
          <>
            <h2 className={classes.question}>{currentQuestion.question}</h2>
            <form className={classes.quizForm}>
              <div className={classes.choices}>
              {Object.keys(currentQuestion.answers).map((key) => (
                <div className={classes.choice} key={key}>
                  <input
                    className={classes.radioInput}
                    type="radio"
                    id={key}
                    name="answer"
                    value={key}
                    checked={selectedAnswer === key}
                    onChange={() => setSelectedAnswer(key)}
                  />
                  <label className={classes.label} htmlFor={key}>{currentQuestion.answers[key]}</label>
                </div>
              ))}
              </div>
            </form>
            {isAnswerSubmitted && (
              <div className={`${classes.resultDiv} ${selectedAnswer !== currentQuestion.correct_answer && classes.incorrectResult}`}>
                <p>
                  {selectedAnswer === currentQuestion.correct_answer
                    ? `Correct! ${score} of ${
                        currentQuestionIndex + 1
                      } correct.`
                    : `Incorrect! ${score} of ${
                        currentQuestionIndex + 1
                      } correct.`}
                  <p>{currentQuestion.explanation}</p>
                </p>
              </div>
            )}
            {!isAnswerSubmitted && (
              <Button className="m_1" onClick={handleSubmitAnswer}>
                Submit Answer
              </Button>
            )}
            {isAnswerSubmitted && (
              <Button className="m_1" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </>
        ) : (
          <div className={classes.finalMessage}>
            <p>
              Quiz Finished! Final Score: {score} of {totalQuestions} correct.
            </p>
            {score === 10 && <div className={classes.perfectScore}><p>Perfect Score!!</p></div>}
            <Button onClick={handleRetakeQuiz}>Retake Quiz</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
