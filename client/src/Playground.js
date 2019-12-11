import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import randomColor from "randomcolor";

export default function Playground() {
  const [count, setCount] = useState(30);
  const inputRef = useRef(); // persistent Ref between renders

  const [color, setColor] = useState(randomColor());

  useEffect(() => {
    inputRef.current.focus();
  }, [count]);

  // const calculate = useCallback(<Calculate />, [count]);
  // const cb = useCallback(num => console.log(num), [count]);
  useCallback(() => console.log("useCallback")); // returns the function
  useMemo(() => console.log("useMemo")); // returns the result of the function

  console.log("hello from playground_inside");
  return (
    <div style={{ borderTop: `10px solid ${color}` }}>
      {count}
      <button onClick={() => setCount(currentCount => currentCount - 1)}>
        -
      </button>
      <button onClick={() => setCount(currentCount => currentCount + 1)}>
        +
      </button>
      <button onClick={() => setColor(randomColor())}>Change Color</button>
      <hr />
      <input
        ref={inputRef}
        type="range"
        onChange={e => setCount(e.target.value)}
        value={count}
      />
      {/* <Calculate cb={cb} num={count} /> */}
    </div>
  );
}

const Calculate = React.memo(({ cb, num }) => {
  cb(num);
  const renderCount = useRef(1);
  return <div>{renderCount.current++}</div>;
});
