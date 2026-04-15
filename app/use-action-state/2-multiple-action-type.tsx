"use client";

import { useActionState, startTransition, useState } from "react";
import { addToCart, removeFromCart } from "./api";
import FormatTotal from "./total-formatter";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MultipleActionTypes() {
  const [isMin, setIsMin] = useState(false);
  const [count, dispatchAction, isPending] = useActionState(
    updateCartAction,
    0,
  );

  if (count === 0 && !isMin) {
    setIsMin(true);
  } else if (count > 0 && isMin) {
    setIsMin(false);
  }

  function handleAdd() {
    startTransition(() => {
      dispatchAction({ type: "ADD" });
    });
  }

  function handleRemove() {
    startTransition(() => {
      dispatchAction({ type: "REMOVE" });
    });
  }

  return (
    <div className="border rounded-md p-4 space-y-4">
      <h2 className="text-lg tracking-tighter font-semibold">
        Using multiple action types
      </h2>
      <div className="flex items-center gap-2">
        <span className="">Tickets to show</span>{" "}
        <Separator orientation="vertical" />{" "}
        <span className="flex items-center gap-4">
          <span>Quantity: </span>
          <span className="w-6 text-center tabular-nums">
            {isPending ? (
              <Skeleton className="h-5 w-6 bg-muted-foreground/20" />
            ) : (
              count
            )}
          </span>
        </span>
        <div className="flex items-center">
          <Button size="icon-xs" className="" onClick={handleAdd}>
            <ArrowUpIcon />
          </Button>
          <Button
            size="icon-xs"
            className={cn(
              isMin &&
                "disabled:pointer-events-auto disabled:cursor-not-allowed",
            )} // TODO: When waiting the queue to update, the button should be disabled and show a loading state, but it doesn't work because of the pending state is shared between both actions. We need to have a way to track pending state for each action type separately.
            onClick={handleRemove}
            disabled={count === 0}
          >
            <ArrowDownIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col items-center"></div>
      <Separator />
      <FormatTotal quantity={count} isPending={isPending} />
    </div>
  );
}

async function updateCartAction(
  prevCount: number,
  actionPayload: { type: "ADD" | "REMOVE" },
) {
  switch (actionPayload.type) {
    case "ADD": {
      return await addToCart(prevCount);
    }
    case "REMOVE": {
      return await removeFromCart(prevCount);
    }
  }
}
