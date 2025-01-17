import React, { useState, useEffect } from "react";
import "./App.css";

// Dynamically import all PNG images from the cards folder using import.meta.glob
const importAll = (globContext) => {
  return Object.keys(globContext).map((key) => globContext[key]());
};

// Function to get random cards
function getRandomCards(images, numberOfCards = 8) {
  const selectedCards = [];
  const availableImages = [...images];

  for (let i = 0; i < numberOfCards; i++) {
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    selectedCards.push(availableImages[randomIndex]);
    availableImages.splice(randomIndex, 1);
  }

  // Duplicate and shuffle cards
  return [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5);
}

function App() {
  const [cards, setCards] = useState([]); // Cards for the game
  const [flippedCards, setFlippedCards] = useState([]); // Indices of flipped cards
  const [matchedCards, setMatchedCards] = useState([]); // Indices of matched cards
  const [gameWon, setGameWon] = useState(false);
  const [allImages, setAllImages] = useState([]); // To store the resolved images
  const [timer, setTimer] = useState(0); // Timer state to track elapsed time
  const [timerRunning, setTimerRunning] = useState(false); // To control when the timer should run

  useEffect(() => {
    // Dynamically import all PNG images from the 'assets/cards' folder
    const images = importAll(import.meta.glob("./assets/*.png"));

    // Resolve all images and update the state
    Promise.all(images)
      .then((resolvedImages) => {
        setAllImages(resolvedImages.map((module) => module.default));
      })
      .catch((err) => {
        console.error("Error loading images:", err);
      });
  }, []);

  useEffect(() => {
    // Initialize cards once all images are loaded
    if (allImages.length > 0) {
      setCards(getRandomCards(allImages));
    }
  }, [allImages]);

  // Start the timer once the game starts
  useEffect(() => {
    if (timerRunning) {
      const interval = setInterval(() => {
        setTimer((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(interval); // Cleanup the interval on unmount or when timerRunning is false
    }
  }, [timerRunning]);

  // Handle card click
  const handleCardClick = (index) => {
    if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
      if (!timerRunning) setTimerRunning(true); // Start timer when the first card is clicked
      setFlippedCards((prev) => [...prev, index]);
    }
  };

  // Check for match
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstIndex, secondIndex] = flippedCards;
      if (cards[firstIndex] === cards[secondIndex]) {
        setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
        setFlippedCards([]);
      } else {
        setTimeout(() => setFlippedCards([]), 1000); // Flip back after delay
      }
    }
  }, [flippedCards, cards]);

  // Check for game win
  useEffect(() => {
    if (matchedCards.length === cards.length && cards.length > 0) {
      setGameWon(true);
      setTimerRunning(false); // Stop the timer when the game is won
    }
  }, [matchedCards, cards]);

  // Reset game
  const resetGame = () => {
    setCards(getRandomCards(allImages));
    setFlippedCards([]);
    setMatchedCards([]);
    setGameWon(false);
    setTimer(0); // Reset the timer
    setTimerRunning(false); // Stop the timer
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-800">Memory Game</h1>

      {/* Timer Display */}
      <div className="mb-6 text-xl font-semibold text-gray-700">
        Time: {timer}s
      </div>

      <div className="grid grid-cols-4 gap-4">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`relative w-24 h-24 border-2 rounded-lg ${flippedCards.includes(index) || matchedCards.includes(index) ? "bg-white" : "bg-black"} transition duration-300`}
            onClick={() => handleCardClick(index)}
          >
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Only show the image if the card is flipped */}
              {flippedCards.includes(index) || matchedCards.includes(index) ? (
                <img
                  src={card} // Use the image path directly
                  alt="Card"
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="w-full h-full bg-black rounded-lg"></div> // Empty black card
              )}
            </div>
          </div>
        ))}
      </div>

      {gameWon && (
        <div className="mt-6 text-center">
          <h2 className="text-2xl font-bold text-green-600">You Win!</h2>
          <button
            onClick={resetGame}
            className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
