import React, { useRef, useEffect, useState } from "react";
import { Canvas, Rect } from "fabric";
import ToolBar from "./ToolBar";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      const initCanvas = new Canvas(canvasRef.current, {
        width: 600,
        height: 600,
      });
      initCanvas.backgroundColor = "#fff";
      initCanvas.renderAll();
      setCanvas(initCanvas);
      return () => {
        initCanvas.dispose();
      };
    }
  }, []);

  return (
    <>
      <ToolBar canvas={canvas} setCanvas={setCanvas} canvasRef={canvasRef} />
      <canvas id="canvas" ref={canvasRef} />
    </>
  );
};

export default FabricCanvas;
