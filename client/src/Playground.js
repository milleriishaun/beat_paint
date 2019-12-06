import React, { useEffect, useState } from "react";

import randomColor from "randomcolor";

export default function Playground() {
  const [count, setCount] = useState(0);
  const [color, setColor] = useState(null);
  useEffect(() => {
    setColor(randomColor());
  }, []);

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
    </div>
  );
}
