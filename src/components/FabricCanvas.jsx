import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "fabric";
import ToolBar from "./ToolBar";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import { Button, Text } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";

const FabricCanvas = () => {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // 1. Initialize Canvas
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

  // 2. Load scene from Firestore once canvas is ready
  useEffect(() => {
    console.log(canvas);
    if (!canvas) return;

    async function loadScene() {
      const sceneRef = doc(db, "scenes", id);
      const snap = await getDoc(sceneRef);

      if (snap.exists()) {
        canvas.loadFromJSON(snap.data().data, canvas.renderAll.bind(canvas));
      } else {
        await setDoc(sceneRef, {
          data: JSON.stringify(canvas.toJSON()),
          updatedAt: new Date(),
        });
      }
    }

    loadScene();
  }, [canvas, id]);

  // 3. Auto-save with debounce after any change
  useEffect(() => {
    if (!canvas) return;

    const saveCanvas = debounce(async () => {
      const json = JSON.stringify(canvas.toJSON());
      await updateDoc(doc(db, "scenes", id), {
        data: json,
        updatedAt: new Date(),
      });
    }, 1000);

    canvas.on("object:added", saveCanvas);
    canvas.on("object:modified", saveCanvas);
    canvas.on("object:removed", saveCanvas);

    return () => {
      saveCanvas.cancel();
      canvas.off("object:added", saveCanvas);
      canvas.off("object:modified", saveCanvas);
      canvas.off("object:removed", saveCanvas);
    };
  }, [canvas, id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(<Text weight="bold">Link copied!</Text>);
  };

  return (
    <div className="App">
      <Toaster />
      <ToolBar canvas={canvas} setCanvas={setCanvas} canvasRef={canvasRef} />
      <canvas id="canvas-elm" ref={canvasRef} />
      <Button onClick={copyLink} mt={"2"}>
        Share Canvas
      </Button>
    </div>
  );
};

export default FabricCanvas;
