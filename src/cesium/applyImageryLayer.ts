import { ImageryLayerCollection, Rectangle, UrlTemplateImageryProvider, type Viewer } from "cesium";
import type { ImageryLayerDefinition } from "../domain/imageryCatalog";
import { NATURAL_EARTH_UNDERLAY_INDEX } from "./createViewer";

const LAYERS_INDEX = NATURAL_EARTH_UNDERLAY_INDEX + 1;

export function applyImageryLayer(
  viewer: Viewer,
  layer: ImageryLayerDefinition,
): void {
  const { west, south, east, north } = layer.boundingBox;
  const provider = new UrlTemplateImageryProvider({
    url: layer.tileUrlTemplate,
    credit: layer.credit,
    rectangle: Rectangle.fromDegrees(west, south, east, north)
  });

  viewer.imageryLayers.addImageryProvider(provider, LAYERS_INDEX);
}

