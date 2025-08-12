import React from "react";
import FabricCanvas from "./components/FabricCanvas";
import { Theme } from "@radix-ui/themes";

function App() {
  return (
    <Theme>
      <div className="App">
        <h1>My Fabric.js React App</h1>
        <FabricCanvas />
      </div>
    </Theme>
  );
}

export default App;
