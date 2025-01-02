"use client";

import { useState, useEffect } from 'react';

interface Time {
  hours: string;
  minutes: string;
  seconds: string;
}

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<number>(24 * 60 * 60);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isRunning, timeLeft]);

  const formatTime = (seconds: number): Time => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return {
      hours: hours.toString().padStart(2, '0'),
      minutes: minutes.toString().padStart(2, '0'),
      seconds: secs.toString().padStart(2, '0'),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        24 Hour Countdown
      </h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <TimeBlock label="Hours" value={hours} />
        <TimeBlock label="Minutes" value={minutes} />
        <TimeBlock label="Seconds" value={seconds} />
      </div>

      <div className="flex justify-center space-x-4">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`px-6 py-2 rounded-lg text-white font-medium transition-colors ${
            isRunning ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTimeLeft(24 * 60 * 60);
          }}
          className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function TimeBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-gray-100 rounded-lg p-4 text-center">
      <div className="text-4xl font-bold text-blue-600">{value}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  );
}