# `handleClick` logic in `video-player.tsx:10-22`

The function toggles the video between playing and paused, and drives the `<video>` element imperatively through a ref.

## Step-by-step

1. **`const nextIsPlaying = !isPlaying;`** — computes the *next* state by flipping the current `isPlaying`. This is stored in a local variable, not read from state later, which matters (see below).
2. **`setIsPlaying(nextIsPlaying);`** — schedules a state update. Note: `isPlaying` in this function's scope does **not** change after this call — state updates are asynchronous and only take effect on the next render.
3. **`if (nextIsPlaying) { ref.current?.play() } else { ref.current?.pause() }`** — uses the ref to call the DOM API directly on the `<video>` element. `play()` and `pause()` aren't something React can express declaratively, so you reach into the DOM via `ref.current`. The `?.` guards against `null` in case the ref isn't attached yet.

## Why `nextIsPlaying` and not `isPlaying`

This is the key subtlety. Inside `handleClick`, the variable `isPlaying` is a **snapshot** from the render that created this handler. Even after calling `setIsPlaying(...)`, the local `isPlaying` still holds the old value until the component re-renders. That's why the `console.log` on lines 17 and 20 will always log the *previous* value — it's not a bug in React, it's closure semantics.

So the code correctly branches on `nextIsPlaying` (the freshly computed value) to decide whether to call `play()` or `pause()`. If it branched on `isPlaying` instead, it would do the opposite of what the user clicked.

## Why both state *and* a ref

- **State (`isPlaying`)** drives the UI — the Button label flips between "Play" and "Pause" on re-render.
- **Ref (`ref.current`)** drives the imperative side effect — actually telling the browser's video element to start/stop.

## The `onPlay` / `onPause` handlers on the `<video>`

Lines 30-31 are a nice safety net: if the video ends, or the user pauses via native browser controls, those events fire and sync React's `isPlaying` state back to reality. Without them, `isPlaying` would drift out of sync with the actual element.
