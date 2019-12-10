import React, { useEffect, useRef, useState } from "react";

import randomColor from "randomcolor";

export default function Playground() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(randomColor());
    inputRef.current.focus();
  }, [count]);
  const inputRef = useRef(50); // persistent Ref between renders

  console.log("hello from playground_inside");
  return (
    <div style={{ borderTop: `10px solid ${color}` }}>
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
      <hr />
      <input
        ref={inputRef}
        type="range"
        onChange={e => setCount(e.target.value)}
        value={count}
      />
    </div>
  );
}
