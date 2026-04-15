"use client";

import { Input } from "@/components/ui/input";
import { useRef, useState, useEffect } from "react";

export default function CurrencyFormatter() {
  const [value, setValue] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="border font-sans border-amber-400 rounded-md p-4 my-4 space-y-4">
      <h2 className="text-lg tracking-tighter font-semibold">
        Using <code className="font-normal px-1">Intl.NumberFormat</code> for
        currency formatting
      </h2>
      <div className="flex items-center gap-2">
        <span className="">Price:</span>
        <span className="font-mono">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(value / 100)}
        </span>
      </div>
      <div className="">
        <Input
          ref={inputRef}
          type="number"
          className="w-32"
          value={value}
          onChange={(e) => setValue(parseFloat(e.target.value) || 0)}
        />
      </div>
    </div>
  );
}
