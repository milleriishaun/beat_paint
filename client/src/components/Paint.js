import "../App.css";

import React, { useEffect, useState } from "react";

import ColorPicker from "./ColorPicker";
import Name from "./Name";
import randomColor from "randomcolor";

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);

  console.log("hello from paint");
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

  return (
    <header style={{ borderTop: `10px solid ${activeColor}` }}>
      <div className="app">
        <Name />
      </div>
      <div style={{ marginTop: 10 }}>
        <ColorPicker
          colors={colors}
          activeColor={activeColor}
          setActiveColor={setActiveColor}
        />
      </div>
    </header>
  );
}
