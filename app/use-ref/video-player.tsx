"use client";

import { Button } from "@/components/ui/button";
import { useState, useRef } from "react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ref = useRef<HTMLVideoElement | null>(null);

  function handleClick() {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    console.log("Value of `nextIsPlaying`:", nextIsPlaying);

    if (nextIsPlaying) {
      ref.current?.play();
      console.log("Value of `isPlaying` on `play()`:", isPlaying);
    } else {
      ref.current?.pause();
      console.log("Value of `isPlaying` on `pause()`:", isPlaying);
    }
  }

  return (
    <div className="space-y-2">
      <Button onClick={handleClick}>{isPlaying ? "Pause" : "Play"}</Button>
      <video
        ref={ref}
        width="250"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        className="rounded"
      >
        <source src="videos/flower.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
