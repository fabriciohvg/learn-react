"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ref, useRef } from "react";

/* ComponentProps

if `MyInput` is essentially a pass-through to `Input`, 
inherit its props so callers can pass `placeholder`, 
`value`, etc.:

import { ComponentProps } from "react";

function MyInput(props: ComponentProps<typeof Input>) {
  return <Input {...props} />;
}

*/

type MyInputProps = {
  ref: Ref<HTMLInputElement>;
};

function MyInput({ ref }: MyInputProps) {
  return <Input ref={ref} />;
}

export default function ParentRef() {
  const inputRef = useRef<HTMLInputElement | null>(null);

  function handleClick() {
    inputRef.current?.focus();
  }

  return (
    <div className="flex items-center gap-2">
      <MyInput ref={inputRef} />
      <Button onClick={handleClick}>Focus the input</Button>
    </div>
  );
}
