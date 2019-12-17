import React, { useEffect, useRef, useState } from "react";

import PropTypes from "prop-types";
import useWindowSize from "./WindowSize";

const Canvas = React.memo(props => {
  const [drawing, setDrawing] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const canvasRef = useRef();
  const ctx = useRef();

  const [windowWidth, windowHeight] = useWindowSize(() => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  });

  useEffect(() => {
    ctx.current = canvasRef.current.getContext("2d");
  }, []);

  console.log("hello from Canvas");

  const handleMouseMove = e => {
    // Actual Coordinates
    const coords = [
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    ];

    if (drawing) {
      ctx.current.lineTo(...coords);
      ctx.current.stroke();
    }
  };

  const startDrawing = e => {
    ctx.current.lineJoin = "round";
    ctx.current.lineCap = "round";
    ctx.current.lineWidth = 10;
    ctx.current.strokeStyle = props.color;
    ctx.current.beginPath();
    // Actual Coordinates
    ctx.current.moveTo(
      e.clientX - canvasRef.current.offsetLeft,
      e.clientY - canvasRef.current.offsetTop
    );
    setDrawing(true);
  };

  const stopDrawing = () => {
    ctx.current.closePath();
    setDrawing(false);
  };

  return (
    <canvas
      ref={canvasRef}
      width={props.width || width}
      height={props.height || height}
      onMouseDown={e => startDrawing(e)}
      onMouseUp={() => stopDrawing()}
      onMouseOut={() => stopDrawing()}
      onMouseMove={e => handleMouseMove(e)}
    />
  );
});

export default Canvas;

Canvas.propTypes = {
  color: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
