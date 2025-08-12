import React, { useRef, useEffect } from "react";
import { Canvas, Rect } from "fabric";
import { Flex, Text, Button } from "@radix-ui/themes";

const FabricCanvas = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (canvasElement) {
      fabricCanvasRef.current = new Canvas(canvasElement, {
        backgroundColor: "#f0f0f0",
      });
      const rect = new Rect({
        left: 100,
        top: 100,
        fill: "red",
        width: 60,
        height: 70,
      });
      fabricCanvasRef.current.add(rect);
      return () => {
        if (fabricCanvasRef.current) {
          fabricCanvasRef.current.dispose();
        }
      };
    }
  }, []);

  return (
    <>
      {" "}
      <Flex direction="column" gap="2">
        <Text>Hello from Radix Themes</Text>
        <Button>Let's go</Button>
      </Flex>
      <canvas ref={canvasRef} width="800px" height="1000px" />
    </>
  );
};

export default FabricCanvas;
