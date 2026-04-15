"use client";

import { useActionState, startTransition, useOptimistic } from "react";
import { addToCart, removeFromCart } from "./api";
import FormatTotal from "./total-formatter";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function OptimisticUI() {
  const [count, dispatchAction, isPending] = useActionState(
    updateCartAction,
    0,
  );
  const [optimisticCount, setOptimisticCount] = useOptimistic(count);

  function handleAdd() {
    startTransition(() => {
      setOptimisticCount((prev) => prev + 1);
      dispatchAction({ type: "ADD" });
    });
  }

  function handleRemove() {
    startTransition(() => {
      setOptimisticCount((prev) => Math.max(prev - 1, 0));
      dispatchAction({ type: "REMOVE" });
    });
  }

  return (
    <div className="border border-amber-400 rounded-md p-4 space-y-4">
      <h2 className="text-lg tracking-tighter font-semibold">
        Using optimistic UI updates
      </h2>
      <div className="flex items-center gap-2">
        <span className="">Tickets to show</span>{" "}
        <Separator orientation="vertical" />{" "}
        <span className="flex items-center gap-4">
          <span>Quantity: </span>
          <span className="w-6 text-center tabular-nums">
            {optimisticCount}
          </span>
        </span>
        <div className="flex items-center">
          <Button size="icon-xs" className="" onClick={handleAdd}>
            <ArrowUpIcon />
          </Button>
          <Button
            size="icon-xs"
            className=""
            onClick={handleRemove}
            disabled={optimisticCount === 0}
          >
            <ArrowDownIcon />
          </Button>
        </div>
        {isPending && <Spinner className="ml-2" />}
      </div>

      <div className="flex flex-col items-center"></div>
      <Separator />
      <FormatTotal quantity={optimisticCount} isPending={isPending} />
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
  return prevCount;
}
