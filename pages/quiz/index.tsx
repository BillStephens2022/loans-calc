import React, { useState } from "react";
import PageHeader from "../../components/layout/pageHeader";
import { quizData, Question } from "../../lib/quizData";
import classes from "./quiz.module.css";
import Button from "../../components/ui/button";

interface QuizState {
  // state to keep track of the index of the current question in the quizData array. Starts at zero (1st index).
  currentQuestionIndex: number;  
  // state to keep track of the score (i.e. # of correct answers). Starts at zero.
  score: number;
  // state to keep track of the selected answer in multiple choice list so that answer can be checked against the correct answer.
  selectedAnswer: string | null;
  // state to keep track of when answer has been submitted (via button click)
  isAnswerSubmitted: boolean;
}

// page route: /quiz
// Quiz page summary - Interactive multiple choice quiz (from "quizData" imported above). User answers quiz questions,
// gets feedback on each answer (i.e. correct or incorrect with explanation of correct answer) and goes on to next question.  
// Score is tracked and updated throughout quiz and final score shown at end of quiz.  

const Quiz: React.FC = () => {

  // establish state variables (see Interface for QuizState above for descriptions of each state variable)
  const [state, setState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isAnswerSubmitted: false,
  });

  // destructure state variables
  const { currentQuestionIndex, score, selectedAnswer, isAnswerSubmitted } = state;
  
  // gets the current question from the quizData array based on the index
  const currentQuestion: Question = quizData.questions[currentQuestionIndex];
  // gets the # of total questions based on the length of the quizData questions array
  const totalQuestions: number = quizData.questions.length;

  // handle "Next" button click to advance to next questions - increment current question index by 1 to get
  // the next question.  Reset state for isAnswerSubmitted to false and selectedAnswer to null - until user submits their answer.
  const handleNextQuestion = () => {
    setState(prevState => ({
      ...prevState,
      currentQuestionIndex: prevState.currentQuestionIndex + 1,
      isAnswerSubmitted: false,
      selectedAnswer: null
    }));
  };
  

  // handle when user selects their answer and submits.  If answer is correct, increment the score by 1.
  // update isAnswerSubmitted to true.
  const handleSubmitAnswer = () => {
    setState(prevState => {
      const isCorrectAnswer = selectedAnswer === currentQuestion.correct_answer;
      return {
        ...prevState,
        score: isCorrectAnswer ? prevState.score + 1 : prevState.score,
        isAnswerSubmitted: true
      };
    });
  };
  

  // Check if all questions have been answered
  const isQuizFinished: boolean = currentQuestionIndex === totalQuestions;

  // When user clicks button to retake the quiz, reset state to initial values to restart the quiz
  const handleRetakeQuiz = () => {
    setState({
      currentQuestionIndex: 0,  // Reset to the first question
      score: 0, // Reset the score
      selectedAnswer: null, // Reset the selected answer
      isAnswerSubmitted: false, // Reset the answer submission status
    });
  };

  return (
    <div className={classes.quizPage}>
      <PageHeader>
        <h1 className={classes.pageHeader}>Quiz</h1>
      </PageHeader>
      <main className={classes.main}>
        {/* show the below while the quiz is still ongoing - 
            renders the current questions and choices and buttons for submitting and advancing the quiz */}
        {!isQuizFinished ? (
          <>
          {/* show current quiz question */}
            <h2 className={classes.question}>{currentQuestion.question}</h2>
            <form className={classes.quizForm}>
              <div className={classes.choices}>
                 {/* render answer choices for the current quesion using radio inputs */}
              {Object.keys(currentQuestion.answers).map((key) => (
                <div className={classes.choice} key={key}>
                  <input
                    className={classes.radioInput}
                    type="radio"
                    id={key}
                    name="answer"
                    value={key}
                    checked={selectedAnswer === key}
                    onChange={() => setState({...state, selectedAnswer: key })}
                  />
                  <label className={classes.label} htmlFor={key}>{currentQuestion.answers[key]}</label>
                </div>
              ))}
              </div>
            </form>
            {/* After answer is submitted show feedback about answer (correct or incorrect with explanation for correct answer) */}
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
            {/* render button for submitted answer if answer not submitted yet */}
            {!isAnswerSubmitted && (
              <Button className="m_1" onClick={handleSubmitAnswer}>
                Submit Answer
              </Button>
            )}
            {/* If answer has been submitted, show Next button to advance to the next question */}
            {isAnswerSubmitted && (
              <Button className="m_1" onClick={handleNextQuestion}>
                Next
              </Button>
            )}
          </>
        ) : (
          // if quiz is finished, render the final message with score
          <div className={classes.finalMessage}>
            <p>
              Quiz Finished! Final Score: {score} of {totalQuestions} correct.
            </p>
            {/* render message if perfect score */}
            {score === 10 && <div className={classes.perfectScore}><p>Perfect Score!!</p></div>}
            <Button onClick={handleRetakeQuiz}>Retake Quiz</Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Quiz;
