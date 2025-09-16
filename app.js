"use client";

import { useState, useEffect } from 'react';

// A simple panda SVG component with different states for animation
const Panda = ({ state }) => {
  const getPandaSVG = (state) => {
    switch (state) {
      case 'thinking':
        return (
          <svg className="w-full h-auto animate-pulse" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="100" cy="100" r="80" fill="#fcfcfc" />
              <circle cx="100" cy="100" r="80" fill="#fff" />
              <path d="M50,90 C40,70 30,70 30,80 S40,110 50,110 C60,110 70,110 70,100 S60,80 50,80 Z" fill="#2d2d2d" />
              <path d="M150,90 C160,70 170,70 170,80 S160,110 150,110 C140,110 130,110 130,100 S140,80 150,80 Z" fill="#2d2d2d" />
              <ellipse cx="100" cy="120" rx="30" ry="20" fill="#2d2d2d" />
              <path d="M90,120 A10,10 0 0,0 110,120" fill="none" stroke="#fff" strokeWidth="5" />
            </g>
          </svg>
        );
      case 'happy':
        return (
          <svg className="w-full h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="100" cy="100" r="80" fill="#fcfcfc" />
              <circle cx="100" cy="100" r="80" fill="#fff" />
              <path d="M50,90 C40,70 30,70 30,80 S40,110 50,110 C60,110 70,110 70,100 S60,80 50,80 Z" fill="#2d2d2d" />
              <path d="M150,90 C160,70 170,70 170,80 S160,110 150,110 C140,110 130,110 130,100 S140,80 150,80 Z" fill="#2d2d2d" />
              <ellipse cx="100" cy="120" rx="30" ry="20" fill="#2d2d2d" />
              <path d="M70,130 Q100,150 130,130" stroke="#fff" strokeWidth="5" fill="none" />
            </g>
          </svg>
        );
      case 'idle':
      default:
        return (
          <svg className="w-full h-auto" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            <g>
              <circle cx="100" cy="100" r="80" fill="#fcfcfc" />
              <circle cx="100" cy="100" r="80" fill="#fff" />
              <path d="M50,90 C40,70 30,70 30,80 S40,110 50,110 C60,110 70,110 70,100 S60,80 50,80 Z" fill="#2d2d2d" />
              <path d="M150,90 C160,70 170,70 170,80 S160,110 150,110 C140,110 130,110 130,100 S140,80 150,80 Z" fill="#2d2d2d" />
              <ellipse cx="100" cy="120" rx="30" ry="20" fill="#2d2d2d" />
              <circle cx="90" cy="110" r="5" fill="#2d2d2d" />
              <circle cx="110" cy="110" r="5" fill="#2d2d2d" />
            </g>
          </svg>
        );
    }
  };

  return <div className="p-4">{getPandaSVG(state)}</div>;
};

const PeekingPanda = () => (
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
    <path d="M250,50 A100,100 0 0,0 150,150 A100,100 0 0,0 250,250 A100,100 0 0,0 350,150 A100,100 0 0,0 250,50 Z" fill="#fcfcfc" />
    <path d="M150,100 C130,80 110,80 110,90 S130,120 150,120 C170,120 190,120 190,110 S170,90 150,90 Z" fill="#2d2d2d" />
    <path d="M350,100 C370,80 390,80 390,90 S370,120 350,120 C330,120 310,120 310,110 S330,90 350,90 Z" fill="#2d2d2d" />
    <ellipse cx="250" cy="180" rx="40" ry="25" fill="#2d2d2d" />
    <path d="M210,175 A15,15 0 0,0 290,175" fill="none" stroke="#fff" strokeWidth="6" />
  </svg>
);


// Main App component
export default function App() {
  const [showDeviceOptions, setShowDeviceOptions] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [passwordTried, setPasswordTried] = useState(false);
  const [loadingDevices, setLoadingDevices] = useState(false);
  const [loadingTimeLeft, setLoadingTimeLeft] = useState(0);
  const [currentDeviceName, setCurrentDeviceName] = useState("Watch");
  const [emotionData, setEmotionData] = useState(null);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [readingTimeLeft, setReadingTimeLeft] = useState(0);

  // Function to generate random emotion data
  const generateRandomParameters = () => {
    return {
      "Stress": Math.floor(Math.random() * 101),
      "Fear": Math.floor(Math.random() * 101),
      "Anxious": Math.floor(Math.random() * 101),
      "Surprise": Math.floor(Math.random() * 101),
    };
  };

  // Simulate loading devices with a delay and timer
  const handleDeviceSelection = (deviceName) => {
    setLoadingDevices(true);
    setCurrentDeviceName(deviceName);
    setShowPassword(false);
    setPasswordTried(false);
    setLoadingTimeLeft(5);

    const timer = setInterval(() => {
      setLoadingTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setLoadingDevices(false);
          setShowPassword(true); // Pop up password after device list loads
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Simulate reading emotion data with a delay and timer
  const handleReadEmotion = () => {
    setIsLoadingData(true);
    setReadingTimeLeft(30);

    const timer = setInterval(() => {
      setReadingTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          const data = generateRandomParameters();
          setEmotionData(data);
          setIsLoadingData(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  
  // Run initial data load once authenticated
  useEffect(() => {
    if (authenticated && !emotionData) {
      handleReadEmotion();
    }
  }, [authenticated, emotionData]);
  
  // Determine panda's state
  const pandaState = loadingDevices || isLoadingData ? 'thinking' : authenticated ? 'happy' : 'idle';

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col font-sans relative">
      <style>
        {`
        body {
          margin: 0;
          padding: 0;
          overflow-x: hidden;
        }
        .stButton {
            position: relative;
            overflow: hidden;
            border-radius: 5px;
            padding: 1rem 2rem;
            text-align: center;
            font-size: 1rem;
            font-weight: bold;
            color: white;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .stButton.blue-btn {
            background-color: #0078D7;
            background-image: linear-gradient(45deg, #0078D7, #005A9E);
            box-shadow: 0 4px 15px rgba(0, 120, 215, 0.4);
        }
        .stButton.blue-btn:hover {
            box-shadow: 0 6px 20px rgba(0, 120, 215, 0.6);
            transform: translateY(-2px);
        }
        .metric-card {
          background-color: #f0f2f6;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 15px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
          width: 100%;
          text-align: center;
        }
        .copyright-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 12px;
            z-index: 10;
        }
        .peeking-panda {
            position: absolute;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 250px;
            height: auto;
            z-index: 100;
        }
        .loading-animation-container {
            position: relative;
            width: 150px;
            height: 150px;
            margin: 0 auto;
        }
        .loading-circle {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            border: 8px solid #f3f3f3;
            border-top: 8px solid #3498db;
            animation: spin 2s linear infinite;
        }
        .loading-timer {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            font-weight: bold;
            color: #3498db;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .popup-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.2);
            z-index: 101;
        }
        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 100;
        }
        .password-panda {
            width: 150px;
            height: auto;
            position: absolute;
            top: -75px;
            left: 50%;
            transform: translateX(-50%);
        }
      `}
      </style>
      
      {/* Main Peeking Panda SVG */}
      <div className="peeking-panda">
        <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
          <path d="M250,50 A100,100 0 0,0 150,150 A100,100 0 0,0 250,250 A100,100 0 0,0 350,150 A100,100 0 0,0 250,50 Z" fill="#fcfcfc" />
          <path d="M150,100 C130,80 110,80 110,90 S130,120 150,120 C170,120 190,120 190,110 S170,90 150,90 Z" fill="#2d2d2d" />
          <path d="M350,100 C370,80 390,80 390,90 S370,120 350,120 C330,120 310,120 310,110 S330,90 350,90 Z" fill="#2d2d2d" />
          <ellipse cx="250" cy="180" rx="40" ry="25" fill="#2d2d2d" />
          <path d="M210,175 A15,15 0 0,0 290,175" fill="none" stroke="#fff" strokeWidth="6" />
        </svg>
      </div>

      <main className="flex flex-col items-center p-8 max-w-5xl mx-auto mt-24">
        <h1 className="text-4xl font-bold text-center text-blue-800 mb-2">Emotion and State Reader 🧠</h1>
        <p className="text-center text-gray-600 mb-8">Connect to your device to view real-time emotion and state data.</p>
        
        {!authenticated ? (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Connect to a Device</h2>
            {!showDeviceOptions && (
              <button 
                className="stButton blue-btn w-full" 
                onClick={() => setShowDeviceOptions(true)}
              >
                Select your Device
              </button>
            )}

            {showDeviceOptions && !loadingDevices && (
              <div className="mt-6 space-y-4">
                <p className="font-semibold text-center">Choose your device:</p>
                <div className="flex flex-col space-y-4">
                  <button 
                    className="stButton blue-btn"
                    onClick={() => handleDeviceSelection("Watch")}
                  >
                    Watch (192.0.0.17)
                  </button>
                  <button 
                    className="stButton blue-btn"
                    onClick={() => handleDeviceSelection("Card")}
                  >
                    Card (168.0.0.12)
                  </button>
                </div>
              </div>
            )}
            
            {loadingDevices && (
              <div className="mt-4 loading-animation-container">
                <div className="loading-circle"></div>
                <div className="loading-timer">{loadingTimeLeft}s</div>
              </div>
            )}
            
            {showPassword && (
              <>
                <div className="overlay" onClick={() => setShowPassword(false)}></div>
                <div className="popup-modal">
                    <div className="password-panda">
                      <PeekingPanda />
                    </div>
                  <h3 className="text-xl font-semibold mb-4 text-center">Enter Password</h3>
                  <p className="text-sm text-gray-500 mb-4 text-center">Connecting to {currentDeviceName}...</p>
                  <input
                    type="password"
                    placeholder="Enter password"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        if (e.target.value === "Root") {
                          setAuthenticated(true);
                          setShowPassword(false);
                        } else {
                          setPasswordTried(true);
                        }
                      }
                    }}
                  />
                  <button
                    className="stButton blue-btn w-full mt-4"
                    onClick={() => {
                      const password = document.querySelector('input[type="password"]').value;
                      if (password === "Root") {
                        setAuthenticated(true);
                        setShowPassword(false);
                      } else {
                        setPasswordTried(true);
                      }
                    }}
                  >
                    Connect
                  </button>
                  {passwordTried && !authenticated && (
                    <p className="text-red-500 text-center mt-2">Incorrect password. Please try again.</p>
                  )}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg w-full">
            <h2 className="text-2xl font-semibold mb-4 text-center">Live Emotion and State Data</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="metric-card">
                <p className="text-xl font-medium text-gray-500">Stress</p>
                <p className="text-3xl font-bold text-blue-700">{emotionData ? `${emotionData.Stress}%` : '---'}</p>
              </div>
              <div className="metric-card">
                <p className="text-xl font-medium text-gray-500">Fear</p>
                <p className="text-3xl font-bold text-red-700">{emotionData ? `${emotionData.Fear}%` : '---'}</p>
              </div>
              <div className="metric-card">
                <p className="text-xl font-medium text-gray-500">Anxious</p>
                <p className="text-3xl font-bold text-yellow-700">{emotionData ? `${emotionData.Anxious}%` : '---'}</p>
              </div>
              <div className="metric-card">
                <p className="text-xl font-medium text-gray-500">Surprise</p>
                <p className="text-3xl font-bold text-green-700">{emotionData ? `${emotionData.Surprise}%` : '---'}</p>
              </div>
            </div>
            <div className="mt-6">
              <button 
                className="stButton blue-btn"
                onClick={handleReadEmotion}
                disabled={isLoadingData}
              >
                {isLoadingData ? 'Reading...' : 'Read Emotion and State'}
              </button>
              {isLoadingData && (
                <div className="mt-4 loading-animation-container">
                  <div className="loading-circle"></div>
                  <div className="loading-timer">{readingTimeLeft}s</div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      
      <footer className="copyright-bar">
        © 2023 Emotion and State Reader. All Rights Reserved.
      </footer>
    </div>
  );
}
