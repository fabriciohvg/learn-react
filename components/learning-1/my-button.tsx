"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="border rounded-md border-blue-500">
      <Button onClick={handleClick}>Clicked {count} times</Button>
    </div>
  );
}
