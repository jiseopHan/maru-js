# Maru.js

A minimal global state management library for React

## Installation

```bash
npm i --save maru-js
```

or using yarn,

```bash
yarn add maru-js
```

## Quick guide with example codes

Initialize first from root component.

```typescript
// App.tsx

import { useMaruInitialization } from "maru-js";

const App = () => {
  useMaruInitialization({ counter: 0, inputValue: "" });

  return (
    <div>
      <CounterA />
      <CounterB />
    </div>
  );
};
```

Then, use states from any component.

```tsx
import { useMaru } from "maru-js";

const CounterA = () => {
  const [count, setCount] = useMaru("count");
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      A: {count}
    </button>
  );
};

const CounterB = () => {
  const [count, setCount] = useMaru("count");
  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      B: {count}
    </button>
  );
};

const Input = () => {
  const [inputValue, setInputValue] = useMaru("inputValue");
  return (
    <input
      type="text"
      value={inputValue}
      onChange={({ target }) => setInputValue(target.value)}
    />
  );
};
```
