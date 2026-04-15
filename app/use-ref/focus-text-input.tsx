"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRef } from "react";

export default function FocusInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2">
      <Input ref={inputRef} />
      <Button onClick={handleClick}>Focus the input</Button>
    </div>
  );
}
