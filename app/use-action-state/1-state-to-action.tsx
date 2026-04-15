"use client";

import { useActionState, startTransition } from "react";
import { addToCart, removeFromCart } from "./api";
import FormatTotal from "./total-formatter";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

export default function StateToAction() {
  const [count, dispatchAction, isPending] = useActionState(
    async (prevCount: number) => {
      return await addToCart(prevCount);
    },
    0,
  );

  function handleClick() {
    startTransition(() => {
      dispatchAction();
    });
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="text-lg tracking-tighter font-semibold">
        Adding state to action
      </h2>
      <div className="flex gap-4">
        <span className="">Tickets to show</span>{" "}
        <Separator orientation="vertical" />{" "}
        <span className="">Quantity: {count}</span>
      </div>
      <div className="">
        <Button className="" onClick={handleClick}>
          Add to cart {isPending && <Spinner className="ml-2" />}
        </Button>
      </div>
      <Separator />
      <FormatTotal quantity={count} isPending={isPending} />
    </div>
  );
}
