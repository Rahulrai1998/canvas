import React from "react";
import { Button } from "@radix-ui/themes";
import { CircleIcon, SquareIcon } from "@radix-ui/react-icons";
import { Circle, Rect } from "fabric";
const ToolBar = ({ canvas, setCanvas }) => {
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

  return (
    <div className="toolbar dark">
      <Button className="button" onClick={addRectangle}>
        <SquareIcon />
      </Button>
      <Button className="button" onClick={addCircle}>
        <CircleIcon />
      </Button>
    </div>
  );
};

export default ToolBar;
