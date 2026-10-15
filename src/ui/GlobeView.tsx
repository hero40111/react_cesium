import { useEffect, useRef, useState } from "react";
import { createViewer } from "../cesium/createViewer";
import { LayerPicker } from "./LayerPicker";
import { Viewer } from "cesium";

export function GlobeView() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [viewer, setViewer] = useState<Viewer>()

  useEffect(() => {
    const container = containerRef.current;
    if (container === null) {
      return;
    }

    const viewer = createViewer(container);
    setViewer(viewer);
    return () => {
      setViewer(undefined);
      viewer.destroy();
    };
  }, []);

  let activeLayerId = "";
  function choose() {}

  return (
    <div className="app-shell">
      <LayerPicker 
        activeLayerId={activeLayerId}
        onChoose={choose}
      />
      <div ref={containerRef} className="globe" />
    </div>
  );
}
