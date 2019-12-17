import "../App.css";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Name from "./Name";
import RefreshButton from "./RefreshButton";
import randomColor from "randomcolor";
import useWindowSize from "./WindowSize";

// import PropTypes from "prop-types";

const Paint = () => {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState("");
  const [visible, setVisible] = useState(false);

  let timeoutId = useRef();
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setVisible(false), 500);
  });

  console.log("Paint.js State refreshed");

  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`/api?baseColor=${baseColor}`)
      .then(res => res.json())
      .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  }, []);

  useEffect(getColors, []);

  const headerRef = useRef({ offsetHeight: 0 });

  return (
    <div className="app">
      <h1 style={{ color: `${activeColor}` }}>&#10024; BeatPaint</h1>
      <header
        ref={headerRef}
        style={{ borderTop: `10px solid ${activeColor}` }}
      >
        <div className="app">
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RefreshButton cb={getColors} />
        </div>
      </header>
      {/* Canvas component gets replaced every time window.innerHeight or window.innerWidth changes */}
      {/* Workaround would be save a history of the drawing, and reload onto the new, resized canvas */}
      {activeColor && (
        <Canvas
          color={activeColor}
          width={window.innerWidth - 30}
          height={window.innerHeight - headerRef.current.offsetHeight - 180}
        />
      )}
      <div className={`window-size ${visible ? "" : "hidden"}`}>
        Canvas Size: {windowWidth - 30} x{" "}
        {windowHeight - headerRef.current.offsetHeight - 180}, Window Size:
        {windowWidth} x {windowHeight}
      </div>
      <audio controls autoPlay="1" loop="1">
        <source src="https://imgur.com/pXwvhFP.mp4" type="audio/mp4"></source>
        Your browser does not support the audio element.
      </audio>
    </div>
  );
};

export default Paint;
