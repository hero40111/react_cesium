import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GlobeView } from "./ui/GlobeView";
import "cesium/Build/Cesium/Widgets/widgets.css";
import "./styles.css";

const rootElement = document.getElementById("root");
if (rootElement === null) {
  throw new Error("Root element #root is missing");
}

createRoot(rootElement).render(
  <StrictMode>
    <GlobeView />
  </StrictMode>,
);
