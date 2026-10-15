import { useEffect, useRef, useState } from "react";
import { createViewer } from "../cesium/createViewer";
import { LayerPicker } from "./LayerPicker";
import { Viewer } from "cesium";
import { useImageryControl } from "./ImageryControl.hook";

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

  const {activeLayerId, selectableLayerIds, choose} = useImageryControl(viewer);

  return (
    <div className="app-shell">
      <LayerPicker 
        activeLayerId={activeLayerId}
        selectableLayerIds={selectableLayerIds}
        choose={choose}
      />
      <div ref={containerRef} className="globe" />
    </div>
  );
}
