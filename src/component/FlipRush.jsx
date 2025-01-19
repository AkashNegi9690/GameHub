import { useEffect, useState } from "react";
import "../App.css";
import Navbar from "./navbar";

const importAll = (globContext) => {
  return Object.keys(globContext).map((key) => globContext[key]());
}
// generate 16 cards
function getRandomCards(images, numberofCards = 8) {
  const selectedCards = [];
  const availableImages = [...images];
  for (let i = 0; i < numberofCards; i++) {
    const randomIndex = Math.floor(Math.random() * availableImages.length);
    selectedCards.push(availableImages[randomIndex]);
    availableImages.splice(randomIndex, 1);
  }
  return [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5);
}

export function FlipRush(){
    const [allImages, setAllImages] = useState([]);
    const [cards, setCards] = useState([]);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timer, setTimer] = useState(0);
    const [flippedCards, setFlippedCards] = useState([]); // Indices of flipped cards
    const [matchedCards, setMatchedCards] = useState([]);
    const [gameWon, setGameWon] = useState(false);

    // loading all cards
    useEffect(() => {
      const images = importAll(import.meta.glob("../assets/fliprush/*.png"));
  
      Promise.all(images)
        .then((resolvedImages) => {
          setAllImages(resolvedImages.map((module) => module.default));
        })
        .catch((err) => {
          console.log("error loading images", err);
        })
    }, []);
  
    // loading 16 cards once for each game 
    useEffect(() => {
      if (allImages.length > 0) {
        setCards(getRandomCards(allImages));
      }
    }, [allImages]);
  
    // total time
    useEffect(() => {
      if (timerRunning) {
        const interval = setInterval(() => {
          setTimer((prev) => prev + 1);
        }, 1000);
        return () => clearInterval(interval);
      }
  
    }, [timerRunning]);
  
    // setting  flipped cards
    function handleCardClick(index) {
      if (flippedCards.length < 2 && !flippedCards.includes(index) && !matchedCards.includes(index)) {
        if (!timerRunning) setTimerRunning(true);
        setFlippedCards((prev) => [...prev, index]);
      }
    }

    // checking for match
    useEffect(() => {
      if (flippedCards.length === 2) {
        const [firstIndex, secondIndex] = flippedCards;
        if (cards[firstIndex] === cards[secondIndex]) {
          setMatchedCards((prev) => [...prev, firstIndex, secondIndex]);
          setFlippedCards([]);
        }
        else {
          setTimeout(() => setFlippedCards([]), 500);
        }
      }
    }, [flippedCards])
  
    // game finish
    useEffect(() => {
      if (matchedCards.length === cards.length && cards.length > 0) {
        setGameWon(true);
        setTimerRunning(false);
      }
    }, [matchedCards])
  
    // reset game
    function resetGame() {
      setCards(getRandomCards(allImages));
      setMatchedCards([]);
      setFlippedCards([]);
      setGameWon(false);
      setTimerRunning(false);
      setTimer(0);
    };
    return <>
    <Navbar site="FlipRush"/>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 ">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">
          Memory Game
        </h1>
        <div className="mb-6 text-xl font-semibold text-gray-700">
          Time :{timer}
        </div>
        <div className="grid grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`relative w-24 h-24 border-2 rounded-lg ${flippedCards.includes(index) || matchedCards.includes(index) ? "bg-white" : "bg-black"}  duration-500 `}
              onClick={() => handleCardClick(index)}
            >
              <div className="absolute inset-0 flex justify-center items-center">
                {flippedCards.includes(index) || matchedCards.includes(index) ? (
                  <img
                    src={card}
                    alt="card"
                    className="w-full h-full object-cover rounded-lg" />
                ) : (
                  <div className="w-full h-full bg-black rounded-lg"></div>
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
    </>
}