import "../App.css";

import React, { useCallback, useEffect, useRef, useState } from "react";

import Canvas from "./Canvas";
import ColorPicker from "./ColorPicker";
import Name from "./Name";
import PropTypes from "prop-types";
import WindowSize from "./WindowSize";
import randomColor from "randomcolor";

// import RefreshButton from "./RefreshButton";

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [activeText, setActiveText] = useState([]);
  const [randomNumber, setRandomNumber] = useState([]);

  RefreshButton.propTypes = {
    cb: PropTypes.func.isRequired,
    num: PropTypes.func.isRequired,
    getColors: PropTypes.func.isRequired
  };

  RandButton.propTypes = {
    aT: PropTypes.func.isRequired,
    randomNumber: PropTypes.func.isRequired,
    activeText: PropTypes.func.isRequired,
    setRandomNumber: PropTypes.func.isRequired
  };

  console.log("State refreshed");

  const getColors = () => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then(res => res.json())
      .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      });
  };

  useEffect(getColors, []);

  const getAT = () => {
    setRandomNumber(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 5)
    );
    setActiveText(
      Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, "")
        .substr(0, 3)
    );
  };

  useEffect(getAT, []);

  const headerRef = useRef({ offsetHeight: 0 });

  const cb = useCallback(
    num => () => console.log(`num-activeColor: ${num}:${activeColor}`),
    [activeColor]
  );

  // demo
  const aT = useCallback(
    aTNum => {
      console.log("activeTextHit in aT: ", aTNum);
      console.log("activeText in aT: ", activeText);
    },
    [activeText]
  );

  // <audio controls autoplay="1" loop="1">
  return (
    <div className="app">
      <header
        ref={headerRef}
        style={{ borderTop: `10px solid ${activeColor}` }}
      >
        <audio controls>
          <source src="https://imgur.com/pXwvhFP.mp4" type="audio/mp4"></source>
          Your browser does not support the audio element.
        </audio>
        <div className="app">
          <Name />
        </div>
        <div style={{ marginTop: 10 }}>
          <ColorPicker
            colors={colors}
            activeColor={activeColor}
            setActiveColor={setActiveColor}
          />
          <RandButton
            aT={aT}
            randomNumber={randomNumber}
            activeText={activeText}
            setRandomNumber={setRandomNumber}
          />
          <RefreshButton cb={cb} num={activeColor} getColors={getColors} />
        </div>
      </header>
      {activeColor && (
        <Canvas
          color={activeColor}
          height={window.innerHeight - headerRef.current.offsetHeight}
        />
      )}
      <WindowSize />
    </div>
  );
}

const RefreshButton = React.memo(({ cb, num, getColors }) => {
  const renderCount = useRef(1);
  cb(num);
  return (
    <button className="button-refresh-colors" onClick={() => getColors()}>
      &#8634;:
      {renderCount.current++}
    </button>
  );
});

const RandButton = React.memo(
  ({ aT, randomNumber, activeText, setRandomNumber }) => {
    const renderActiveText = useRef(1);
    aT(activeText);
    return (
      <button
        onClick={() =>
          setRandomNumber(
            Math.random()
              .toString(36)
              .replace(/[^a-z]+/g, "")
              .substr(0, 5)
          )
        }
      >
        {activeText}:{renderActiveText.current++}:{randomNumber}
      </button>
    );
  }
);

/*
//Test deck
export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const [activeText, setActiveText] = useState([
    Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, "")
      .substr(0, 5)
  ]);

  const getColors = () => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then(res => res.json())
      .then(res => {
        setColors(res.colors.map(color => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
        setActiveText(
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5)
        );
      });
  };

  useEffect(getColors, []);

  const cb = useCallback(num => console.log("refreshed num: ", num), [
    activeColor
  ]);

  return (
    <div className="app">
      <div style={{ marginTop: 10 }}>
        <ColorPicker
          colors={colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
        <RandButton activeText={activeText} setActiveText={setActiveText} />
        <RefreshButton cb={cb} num={activeColor} />
      </div>
    </div>
  );
}

const RefreshButton = React.memo(({ cb, num }) => {
  const renderCount = useRef(1);
  cb(num);
  return (
    <button className="button-refresh-colors" onClick={cb}>
      &#8634;
      {renderCount.current++}
    </button>
  );
});

const RandButton = React.memo(({ activeText, setActiveText }) => {
  const renderActiveText = useRef(1);
  return (
    <button
      onClick={() =>
        setActiveText(
          Math.random()
            .toString(36)
            .replace(/[^a-z]+/g, "")
            .substr(0, 5)
        )
      }
    >
      {activeText}:{renderActiveText.current++}
    </button>
  );
});
*/

// eslint-disable-next-line react/display-name
