"use client";

import { useState } from "react";
import { Button } from "../ui/button";

function MyButton({ count, onClick }: { count: number; onClick: () => void }) {
  return (
    <div className="border rounded-md border-blue-500">
      <Button onClick={onClick}>Clicked {count} times</Button>
    </div>
  );
}

export function MyButtonState() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
  }

  return (
    <div className="border rounded-md border-blue-500">
      <MyButton count={count} onClick={handleClick} />
      <MyButton count={count} onClick={handleClick} />
    </div>
  );
}
