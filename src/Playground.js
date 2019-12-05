import React, { useState } from "react";

import randomColor from "randomcolor";

export default function Playground() {
  const [count, setCount] = useState(0);
  return (
    <div className="">
      {count}
      <button
        onClick={() => setCount(currentCount => currentCount - 1)}
        className=""
      >
        -
      </button>
      <button
        onClick={() => setCount(currentCount => currentCount + 1)}
        className=""
      >
        +
      </button>
    </div>
  );
}
