import React, { useState, useEffect } from "react";
import mole from '../assets/whackamole/mole.png';
import Navbar from "./navbar";
export const WhackAMole = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeMole, setActiveMole] = useState(null);
  const [isStart,setIsStart]=useState(false);
  const gridSize = 36; 

  // Randomly activate a mole every second
  useEffect(() => {
    if (timeLeft > 0 && isStart) {
      const interval = setInterval(() => {
        const randomMole = Math.floor(Math.random() * gridSize);
        setActiveMole(randomMole);
      }, 500);
      return () => clearInterval(interval);
    }
  }, [timeLeft,isStart]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && isStart) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft,isStart]);

  // Handle mole click
  const whackMole = (index) => {
    if (index === activeMole) {
      setScore((prevScore) => prevScore + 1);
      setActiveMole(null); // Deactivate the mole
    }
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col items-center justify-center p-4 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Whack-a-Mole</h1>
      <div className="flex justify-between w-72 mb-4 ">
        <div className="text-xl font-medium">Time: {timeLeft}s</div>
        {!isStart?<div  className="px-6  bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={()=>setIsStart(true)}>Start</div>:""}
        <div className="text-xl font-medium">Score: {score}</div>
      </div>

      <div className="grid grid-cols-6 gap-3 ">
        {Array.from({ length: gridSize }).map((_, index) => (
          <div
            key={index}
            onClick={() => whackMole(index)}
            className={`w-14 h-14 rounded-lg flex items-center justify-center cursor-pointer shadow-md
              ${index === activeMole && timeLeft !==0 ? "bg-red-500" : "bg-gray-300"} 
              transition-colors duration-300`}
          >
            {index === activeMole && timeLeft !==0 && (
              <img src={mole} alt="angry pumpkin" className="w-8 h-8 rounded-full" />
            )}
          </div>
        ))}
      </div>

      {timeLeft === 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">Game Over!</h2>
          <button
            onClick={() => {
              setScore(0);
              setTimeLeft(30);
              setActiveMole(null);
              setIsStart(false)
            }}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Play Again
          </button>
        </div>
      )}
    </div>
    </>
  );
};


