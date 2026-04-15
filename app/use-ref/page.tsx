"use client";

import { Separator } from "@/components/ui/separator";
import FocusInput from "./focus-text-input";
import StopWatch from "./stop-watch";
import ScrollToView from "./scroll-to-view";

export default function useRefPage() {
  return (
    <div className="border font-sans rounded-md p-4 space-y-4">
      <h2 className="text-lg tracking-tighter font-semibold">
        Learning about <code className="font-normal px-1">useRef</code> in React
      </h2>
      <div className="flex items-center gap-2">
        <span className="">This is a placeholder for the useRef example.</span>
      </div>
      <div className="flex flex-col gap-4">
        <StopWatch />
        <Separator />
        <FocusInput />
        <Separator />
        <ScrollToView />
      </div>
    </div>
  );
}
