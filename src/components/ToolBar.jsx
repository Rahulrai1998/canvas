import React, { useEffect, useState } from "react";
import { Button } from "@radix-ui/themes";
import {
  CircleIcon,
  Pencil2Icon,
  SquareIcon,
  TextIcon,
} from "@radix-ui/react-icons";
import { Circle, IText, PencilBrush, Rect } from "fabric";
const ToolBar = ({ canvas, setCanvas }) => {
  const [isDrawing, setIsDrawing] = useState(false);

  const addRectangle = () => {
    if (canvas) {
      const rect = new Rect({
        top: 100,
        left: 50,
        width: 100,
        height: 60,
        fill: "#003049",
      });
      canvas.add(rect);
    }
  };

  const addCircle = () => {
    if (canvas) {
      const circle = new Circle({
        top: 200,
        left: 50,
        radius: 50,
        stroke: "#c1121f",
        strokeWidth: 2,
        fill: "#c1121f",
      });
      canvas.add(circle);
    }
  };

  const addText = () => {
    if (canvas) {
      const text = new IText("Edit me", {
        left: 150,
        top: 150,
        fill: "#000",
        fontSize: 20,
      });
      canvas.add(text);
    }
  };

  const togglePen = () => {
    if (!canvas) return;

    const newDrawingMode = !isDrawing;
    canvas.isDrawingMode = newDrawingMode;
    setIsDrawing(newDrawingMode);

    if (newDrawingMode) {
      if (!canvas.freeDrawingBrush) {
        canvas.freeDrawingBrush = new PencilBrush(canvas);
      }
      canvas.freeDrawingBrush.width = 2;
      canvas.freeDrawingBrush.color = "#000000";
    }
  };

  const changeShapeColor = (newColor) => {
    if (canvas) {
      const activeObject = canvas.getActiveObject();
      if (activeObject) {
        activeObject.set("fill", newColor);
        canvas.renderAll();
      }
    }
  };

  useEffect(() => {
    if (!canvas) return;

    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length) {
          activeObjects.forEach((obj) => {
            canvas.remove(obj);
          });
          canvas.discardActiveObject(); // Clear selection
          canvas.requestRenderAll(); // Redraw
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [canvas]);

  return (
    <div className="toolbar dark">
      <input
        className="button color-picker"
        type="color"
        defaultValue="#0000ff" // Default color
        onChange={(e) => changeShapeColor(e.target.value)}
      />
      <Button className="button" onClick={addRectangle}>
        <SquareIcon />
      </Button>
      <Button className="button" onClick={addCircle}>
        <CircleIcon />
      </Button>
      <Button className="button" onClick={addText} title="Add Text">
        <TextIcon />
      </Button>
      <Button
        className={`button ${isDrawing ? "active" : ""}`}
        onClick={togglePen}
        title="Pen Tool"
      >
        <Pencil2Icon />
      </Button>
    </div>
  );
};

export default ToolBar;
