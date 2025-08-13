import React, { useRef, useEffect, useState } from "react";
import { Canvas } from "fabric";
import ToolBar from "./ToolBar";
import { getDoc, setDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { useParams } from "react-router-dom";
import { debounce } from "lodash";
import { Button, Text } from "@radix-ui/themes";
import toast, { Toaster } from "react-hot-toast";
import { DownloadIcon } from "@radix-ui/react-icons";

const FabricCanvas = () => {
  const { id } = useParams();
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;

    const parent = canvasElement.parentElement;
    if (!parent) return;

    const canvasInstance = new Canvas(canvasElement, {
      width: parent.offsetWidth,
      height: parent.offsetHeight,
    });

    canvasInstance.backgroundColor = "#fff";
    canvasInstance.renderAll();
    setCanvas(canvasInstance);

    const handleResize = () => {
      canvasInstance.setDimensions({
        width: parent.offsetWidth,
        height: parent.offsetHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      canvasInstance.dispose();
    };
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
    canvas.on("object:changed", saveCanvas);

    return () => {
      saveCanvas.cancel();
      canvas.off("object:added", saveCanvas);
      canvas.off("object:modified", saveCanvas);
      canvas.off("object:removed", saveCanvas);
      canvas.on("object:changed", saveCanvas);
    };
  }, [canvas, id]);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(<Text weight="bold">Link copied!</Text>);
  };
  const exportPNG = () => {
    if (!canvas) return;
    const dataURL = canvas.toDataURL({ format: "png", quality: 1.0 });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "canvas.png";
    link.click();
  };

  const exportSVG = () => {
    if (!canvas) return;
    const svgData = canvas.toSVG();
    const blob = new Blob([svgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "canvas.svg";
    link.click();
    URL.revokeObjectURL(url);
  };
  return (
    <div className="App">
      <Toaster />

      <ToolBar canvas={canvas} setCanvas={setCanvas} canvasRef={canvasRef} />
      <div className="canvas-wrapper">
        <div className="btn-group">
          <Button onClick={copyLink}>
            Copy & Share
          </Button>
          <Button onClick={exportPNG} title="Export as PNG">
            <DownloadIcon /> PNG
          </Button>
          <Button onClick={exportSVG} title="Export as SVG">
            <DownloadIcon /> SVG
          </Button>
        </div>
        <canvas id="canvas-elm" ref={canvasRef} />
      </div>
    </div>
  );
};

export default FabricCanvas;
