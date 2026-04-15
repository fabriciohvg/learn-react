/* eslint-disable @next/next/no-img-element */
"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

const images = [
  { src: "cats/01.jpg", alt: "01" },
  { src: "cats/02.jpg", alt: "02" },
  { src: "cats/03.jpg", alt: "03" },
  { src: "cats/01.jpg", alt: "04" },
  { src: "cats/02.jpg", alt: "05" },
  { src: "cats/03.jpg", alt: "06" },
  { src: "cats/01.jpg", alt: "07" },
  { src: "cats/02.jpg", alt: "08" },
  { src: "cats/03.jpg", alt: "09" },
  { src: "cats/01.jpg", alt: "10" },
  { src: "cats/02.jpg", alt: "11" },
  { src: "cats/03.jpg", alt: "12" },
] as const;

export default function ScrollToView() {
  const listRef = useRef<HTMLUListElement | null>(null);
  const glowTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [glowingIndex, setGlowingIndex] = useState<number | null>(null);

  function triggerGlow(index: number) {
    setGlowingIndex(index);

    if (glowTimeoutRef.current !== null) {
      clearTimeout(glowTimeoutRef.current);
    }

    glowTimeoutRef.current = setTimeout(() => {
      setGlowingIndex(null);
    }, 900);
  }

  function scrollToIndex(index: number) {
    const listNode = listRef.current;

    // this line assumes a particular DOM structure:
    const imgNode = listNode?.querySelectorAll("li > img")[index];
    imgNode?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });

    // start the glow slightly after the scroll begins.
    window.setTimeout(() => {
      triggerGlow(index);
    }, 250);
  }

  function renderScrollToButtons() {
    return images.map((_, index) => (
      <Button key={index} onClick={() => scrollToIndex(index)}>
        {String(index + 1).padStart(2, "0")}
      </Button>
    ));
  }

  return (
    <div className="flex flex-col gap-4">
      <nav className="flex flex-wrap gap-1">{renderScrollToButtons()}</nav>
      <div className="w-full overflow-x-auto rounded border border-sky-400 p-2">
        <ul
          ref={listRef}
          className="flex flex-nowrap min-w-max gap-2 rounded border border-amber-400 p-2"
        >
          {images.map((image, index) => (
            <li
              key={`${image.src}-${index}`}
              className={cn(
                "p-1 size-32 shrink-0 overflow-hidden rounded border transition-all duration-700 ease-out",
                glowingIndex === index
                  ? "border-sky-400 shadow-[0_0_30px_rgba(56,189,248,0.8)]"
                  : "border-border shadow-none",
              )}
            >
              <img
                className="h-full w-full object-cover rounded"
                src={image.src}
                alt={image.alt}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
