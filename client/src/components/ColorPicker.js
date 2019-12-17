import PropTypes from "prop-types";
import React from "react";

const ColorPicker = React.memo(
  ({ colors = [], activeColor, setActiveColor }) => {
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
);
export default ColorPicker;

ColorPicker.propTypes = {
  colors: PropTypes.array.isRequired,
  activeColor: PropTypes.string.isRequired,
  setActiveColor: PropTypes.func.isRequired
};
