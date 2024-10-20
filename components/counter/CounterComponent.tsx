"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export default function CounterComponent() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Counter Component</h1>
      <p data-testid="count-display">Count: {count}</p>
      <Button onClick={increment} data-testid="increment-button">
        +1
      </Button>
    </div>
  );
}