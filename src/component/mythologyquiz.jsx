import axios from "axios";
import { useEffect, useState } from "react";

export function MythologyQuiz() {
    const [mythologyQuestions, setMythologyQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(30);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score, setScore] = useState(0);

    // Fetch the quiz questions
    const fetchMythologyQuestions = async () => {
        try {
            const response = await axios.get(
                "https://opentdb.com/api.php?amount=5&category=20&difficulty=easy&type=multiple"
            );
            setMythologyQuestions(response.data.results);
        } catch (err) {
            console.error("Error fetching questions:", err);
        }
    };

    // Start the timer
    useEffect(() => {
        if (timer === 0) {
            nextQuestion(); // Move to next question when timer ends
        } else if (timer > 0) {
            const timerInterval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(timerInterval); // Clear timer on cleanup
        }
    }, [timer]);

    // Fetch questions when the component mounts
    useEffect(() => {
        fetchMythologyQuestions();
    }, []);

    // Handle the selection of an answer
    const handleAnswerSelection = (selectedOption) => {
        setSelectedAnswer(selectedOption);
        setIsDisabled(true); // Disable the options after selection
        checkAnswer(selectedOption);
    };

    // Check if the answer is correct
    const checkAnswer = (selectedOption) => {
        const currentQuestion = mythologyQuestions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct_answer) {
            setScore((prevScore) => prevScore + 1); // Increment score if correct
        }
    };

    // Move to the next question
    const nextQuestion = () => {
        setSelectedAnswer(null);
        setIsDisabled(false);
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setTimer(30); // Reset timer for next question
    };

    // Display loading message until questions are fetched
    if (mythologyQuestions.length === 0) {
        return <div>Loading questions...</div>;
    }

    // Get the current question and options
    const currentQuestion = mythologyQuestions[currentQuestionIndex];
    const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
    // Shuffle options to randomize their order
    const shuffledOptions = options.sort(() => Math.random() - 0.5);

    return (
        <div>
            <h1>Mythology Quiz</h1>
            <div>
                <p>Time left: {timer} seconds</p>
                <p>{currentQuestion.question}</p>
                <div>
                    {shuffledOptions.map((option, index) => (
                        <button
                            key={index}
                            disabled={isDisabled}
                            onClick={() => handleAnswerSelection(option)}
                            style={{
                                backgroundColor:
                                    selectedAnswer === option
                                        ? option === currentQuestion.correct_answer
                                            ? "green"
                                            : "red"
                                        : "",
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {selectedAnswer && (
                <div>
                    <button onClick={nextQuestion}>Next Question</button>
                </div>
            )}

            {currentQuestionIndex >= mythologyQuestions.length && (
                <div>
                    <h2>Quiz Over!</h2>
                    <p>Your final score: {score}</p>
                </div>
            )}
        </div>
    );
}
