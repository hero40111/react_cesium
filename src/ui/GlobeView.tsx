import { useEffect, useRef } from "react";
import { createViewer } from "../cesium/createViewer";
import { LayerPicker } from "./LayerPicker";

export function GlobeView() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) {
      return;
    }

    const viewer = createViewer(container);
    return () => {
      viewer.destroy();
    };
  }, []);

  return (
    <div className="app-shell">
      <LayerPicker />
      <div ref={containerRef} className="globe" />
    </div>
  );
}
