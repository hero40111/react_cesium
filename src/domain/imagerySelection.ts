import { BoundingBox, ImageryLayerDefinition, MapCenter } from "./imageryCatalog";

function isInsideBBox(center: MapCenter, box: BoundingBox): boolean {
    return (
        center.longitude >= box.west
        && center.longitude <= box.east
        && center.latitude >= box.south
        && center.latitude <= box.north
    );
}

export function selectableImageryLayers(
    center: MapCenter | undefined,
    layers: readonly ImageryLayerDefinition[],
): readonly ImageryLayerDefinition[] {
    if (!center) return [];
    return layers.filter((layer) => isInsideBBox(center, layer.boundingBox));
}

export function chooseImageryLayer(
    activeLayer: ImageryLayerDefinition,
    layerId: string,
    center: MapCenter | undefined,
    layers: readonly ImageryLayerDefinition[]
): ImageryLayerDefinition {
    const requestedLayer = selectableImageryLayers(center, layers).find(
        (layer) => layer.id === layerId
    );
    return requestedLayer ?? activeLayer;
}