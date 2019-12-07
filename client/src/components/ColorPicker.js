import React, { useEffect, useState } from "react";

import randomColor from "randomcolor";

export default function ColorPicker({
  colors = [],
  activeColor,
  setActiveColor,
}) {
  console.log("hello from ColorPicker");
  if (!colors.length) return null;

  return (
    <fieldset className="color-picker">
      {colors.map((color, i) => (
        <label key={i}>
          <input
            name="color"
            type="radio"
            value={color}
            checked={activeColor === color}
            onChange={() => setActiveColor(color)}
          />
          <span style={{ background: color }} />
        </label>
      ))}
    </fieldset>
  );
}
