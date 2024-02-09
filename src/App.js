// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [text, setText] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [timer, setTimer] = useState(0);
  const [typingStarted, setTypingStarted] = useState(false);
  const [testFinished, setTestFinished] = useState(false);
  const [startAgain, setStartAgain] = useState(false);

  // Function to update word count
  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(Boolean);
    setWordCount(words.length);
  }, [text]);

  // Function to update timer
  useEffect(() => {
    let interval;
    if (typingStarted && !testFinished) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [typingStarted, testFinished]);

  // Function to handle typing start
  const handleTypingStart = () => {
    setTypingStarted(true);
  };

  // Function to handle finishing the test
  const handleFinishTest = () => {
    setTestFinished(true);
    setStartAgain(true);
  };

  // Function to handle starting the test again
  const handleStartAgain = () => {
    setTimer(0);
    setTypingStarted(false);
    setTestFinished(false);
    setStartAgain(false);
    setText(''); // Clear the text box
  };

  // Format the timer into minutes and seconds
  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes > 0 ? minutes + ' minute' + (minutes > 1 ? 's ' : ' ') : ''}${seconds} second${seconds !== 1 ? 's' : ''}`;
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between bg-gray-800 text-white p-4">
        <div className="flex items-center space-x-4">
          {/* Profile Icon (Replace 'avatar.jpg' with your actual profile image) */}
          <img src="https://i.ibb.co/wLwH6jC/profile-pic.png" alt="Profile" className="w-8 h-8 rounded-full" />

          {/* Time Counter */}

        </div>
        <p className="flex-1 text-center"><FontAwesomeIcon icon={faClock} /> {formatTime(timer)}</p>
        <div className="flex items-center space-x-4">
          {startAgain ? (
            <button
              onClick={handleStartAgain}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Start Again
            </button>
          ) : (
            <button
              onClick={handleFinishTest}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Finish Test
            </button>
          )}

          {/* Help Button */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Help
          </button>

          {/* Hide Button */}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Hide
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="relative w-96">
          <textarea
            className="w-full h-80 p-4 border border-gray-300 resize"
            placeholder=""
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTypingStart();
            }}
            disabled={testFinished} // Disable typing when test is finished
          ></textarea>
          <div className="absolute left-0 ml-2 mb-2">
            <p>Word Count: {wordCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
