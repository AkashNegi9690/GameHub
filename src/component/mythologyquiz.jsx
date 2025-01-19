import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./navbar";

export function MythologyQuiz() {
    const [mythologyQuestions, setMythologyQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timer, setTimer] = useState(10);
    const [isDisabled, setIsDisabled] = useState(false);
    const [score, setScore] = useState(0);
    const [shuffledOptions, setShuffledOptions] = useState([]); // Store shuffled options

    // Fetch the quiz questions
    const fetchMythologyQuestions = async () => {
        try {
            const response = await axios.get(
                "https://opentdb.com/api.php?amount=11&category=20&difficulty=easy&type=multiple"
            );
            setMythologyQuestions(response.data.results);
        } catch (err) {
            console.error("Error fetching questions:", err);
        }
    };

    // Shuffle the options and set them to state
    const shuffleOptions = (options) => {
        return options.sort(() => Math.random() - 0.5);
    };

    // Handle the loading of the question and shuffle options
    useEffect(() => {
        if (mythologyQuestions.length > 0) {
            const currentQuestion = mythologyQuestions[currentQuestionIndex];
            const options = [...currentQuestion.incorrect_answers, currentQuestion.correct_answer];
            const shuffled = shuffleOptions(options);
            setShuffledOptions(shuffled); // Set shuffled options in state
        }
    }, [currentQuestionIndex, mythologyQuestions]);

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
        setTimer(10); // Reset timer for next question
    };
    const reset=()=>{
        setSelectedAnswer(null);
        setIsDisabled(false);
        setCurrentQuestionIndex(0);
        setTimer(10);
    }

    // Display loading message until questions are fetched
    if (mythologyQuestions.length === 0) {
        return <div className="text-center py-4">Loading questions...</div>;
    }

    // Get the current question
    const currentQuestion = mythologyQuestions[currentQuestionIndex];

    return (
        <>
        <Navbar site="Quizio"/>
            {currentQuestionIndex < mythologyQuestions.length - 1 && (
                <div className="max-w-96 mx-auto p-4 bg-white rounded-lg shadow-lg mt-20 ">
                    <h1 className="text-3xl font-bold text-center mb-4">Mythology Quiz</h1>
                    <div className="mb-4">
                        <p className="text-xl font-semibold text-center">Time left: {timer} seconds</p>
                        <p className="text-lg mt-2 text-center">{currentQuestionIndex}.{currentQuestion.question}</p>
                    </div>
                    <div className="space-y-2">
                        {shuffledOptions.map((option, index) => (
                            <button
                                key={index}
                                disabled={isDisabled}
                                onClick={() => handleAnswerSelection(option)}
                                className={`w-full py-2 text-lg rounded-lg ${selectedAnswer === option
                                    ? option === currentQuestion.correct_answer
                                        ? "bg-green-500 text-white"
                                        : "bg-red-500 text-white"
                                    : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                            >
                                {option}
                            </button>
                        ))}
                    </div>

                    {selectedAnswer && (
                        <div className="mt-4 text-center">
                            <button
                                onClick={nextQuestion}
                                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                            >
                                Next Question
                            </button>
                        </div>
                    )}
                </div>
            )}

            {currentQuestionIndex >= mythologyQuestions.length - 1 && (
                <div className="mt-6 text-center">
                    <h2 className="text-2xl font-semibold">Quiz Over!</h2>
                    <p className="text-xl mt-2">Your final score: {score}</p>
                    <button onClick={reset}  className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Play Again</button>
                </div>
            )}
        </>
    );
}
