# StopWatch Type Notes

This component uses two different kinds of React values:

- `useState` for values that affect rendering
- `useRef` for values that should persist between renders without causing a
  re-render

## `useState` in this component

The stopwatch stores two timestamps:

```tsx
const [startTime, setStartTime] = useState<number | null>(null);
const [now, setNow] = useState<number | null>(null);
```

Why `number | null`?

- `null` is the initial value, before the stopwatch starts
- `number` is the value after calling `Date.now()`

If you wrote this instead:

```tsx
const [startTime, setStartTime] = useState(null);
```

TypeScript would infer the state too narrowly as just `null`. Then this would be
a type error:

```tsx
setStartTime(Date.now());
```

Rule of thumb:

- If the initial value already shows the full type, inference is enough.

```tsx
const [count, setCount] = useState(0); // number
const [name, setName] = useState(""); // string
const [open, setOpen] = useState(false); // boolean
```

- If the initial value is incomplete, especially `null`, add the generic
  yourself.

```tsx
const [user, setUser] = useState<User | null>(null);
const [data, setData] = useState<ResponseData | null>(null);
```

## `useRef` in this component

The stopwatch also stores the interval ID:

```tsx
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
```

This ref is not rendered on screen. It is only used so the component can stop or
replace the active timer later.

Why this type?

- `null` means there is no active interval yet
- `ReturnType<typeof setInterval>` means "whatever this environment returns from
  `setInterval`"

That is safer than hardcoding `number`, because the return type can differ
between environments and TypeScript setups.

## When to use `useState` vs `useRef`

Use `useState` when changing the value should update the UI.

Examples in this component:

- `startTime`
- `now`

Use `useRef` when the value should persist across renders but should not trigger
a render when it changes.

Example in this component:

- `intervalRef`

If `intervalRef.current` changes, the UI does not need to re-render. It is only
an internal mutable value.

## DOM ref examples

When a ref points to an element, the generic should be the element type:

```tsx
const inputRef = useRef<HTMLInputElement | null>(null);
const buttonRef = useRef<HTMLButtonElement | null>(null);
const divRef = useRef<HTMLDivElement | null>(null);
```

The pattern is the same:

- the generic describes the value stored in `.current`
- `| null` is common because the ref starts empty

## Quick summary

Use these patterns:

```tsx
const [value, setValue] = useState<Type | null>(null);
const ref = useRef<SomeType | null>(null);
```

For this stopwatch:

```tsx
const [startTime, setStartTime] = useState<number | null>(null);
const [now, setNow] = useState<number | null>(null);
const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
```

That expresses the real lifecycle of each value clearly to TypeScript.
