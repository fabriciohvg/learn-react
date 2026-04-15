"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

export default function StopWatch() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [now, setNow] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // added to clean up the interval when the component unmounts
  useEffect(() => {
    return () => {
      console.log("useEffect running before the `if` statement.");
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        console.log("useEffect running before the `if` statement.");
      }
    };
  }, []);

  function handleStart() {
    setStartTime(Date.now());
    setNow(Date.now());

    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      console.log("The `handleStart` function cleared the timer.");
    }

    intervalRef.current = setInterval(() => {
      setNow(Date.now());
    }, 10);
  }

  function handleStop() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  let secondsPassed = 0;
  if (startTime != null && now != null) {
    secondsPassed = (now - startTime) / 1000;
  }

  return (
    <div>
      <h2 className="font-semibold tracking-tight text-xl">
        Time passed: {secondsPassed.toFixed(3)}
      </h2>
      <Button size="sm" onClick={handleStart}>
        Start
      </Button>
      <Button size="sm" onClick={handleStop}>
        Stop
      </Button>
    </div>
  );
}
