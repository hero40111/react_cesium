import { Viewer } from "cesium";
import { ImageryControl } from "../models/LayerPicker.interface";
import { useEffect, useState } from "react";
import { availableImageryLayers, MapCenter, OPENING_LAYER, OPENING_MAP_CENTER } from "../domain/imageryCatalog";
import { applyImageryLayer } from "../cesium/applyImageryLayer";
import { readMapCenter } from "../cesium/readMapCenter";
import { selectableImageryLayers } from "../domain/imagerySelection";

export function useImageryControl(viewer: Viewer | undefined): ImageryControl {
    const [activeLayer, setActiveLayer] = useState(OPENING_LAYER);

    const [mapCenter, setMapCenter] = useState<MapCenter | undefined>(OPENING_MAP_CENTER);

    const selectableLayerIds = new Set(
        selectableImageryLayers(mapCenter, availableImageryLayers).map((layer) => layer.id)
    )

    const choose = (id: string): void => { }

    return { activeLayerId: activeLayer.id, selectableLayerIds, choose }
}