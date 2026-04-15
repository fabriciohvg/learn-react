# Focus Text Input Type Notes

In this component, the ref is attached to an input element:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

## Why this type is correct

The generic passed to `useRef` describes what will be stored in `.current`.

In this case:

- `HTMLInputElement` is the DOM element type for `<input />`
- `null` is included because the ref starts empty before React attaches the
  element

So the type means:

```tsx
inputRef.current; // HTMLInputElement | null
```

## Why `| null` matters

Even though the input exists after render, TypeScript still has to account for
moments when the ref is not attached yet.

Examples:

- before the first render finishes
- if the element is conditionally removed
- during unmount

Because of that, calling methods directly on `inputRef.current` can be unsafe
unless you guard against `null`.

## Safer ways to use the ref

Instead of:

```tsx
inputRef.current.focus();
```

prefer one of these:

```tsx
inputRef.current?.focus();
```

or:

```tsx
if (inputRef.current !== null) {
  inputRef.current.focus();
}
```

Use optional chaining when doing nothing on `null` is fine. Use an `if` block
when you want to do more work after the null check.

## General rule for DOM refs

When a ref points to an element, use this pattern:

```tsx
const ref = useRef<ElementType | null>(null);
```

Examples:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
const buttonRef = useRef<HTMLButtonElement | null>(null);
const divRef = useRef<HTMLDivElement | null>(null);
```

## Quick summary

For `inputRef`, the correct type is:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
```

That tells TypeScript:

- React will eventually place an input element in `.current`
- until then, `.current` may be `null`

That is why DOM refs usually need both the element type and `| null`.
