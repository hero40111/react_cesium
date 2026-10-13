import type { Viewer } from "cesium";
import type { ImageryLayerDefinition } from "../domain/imageryCatalog";

export function applyImageryLayer(
  viewer: Viewer,
  layer: ImageryLayerDefinition,
): void {
  throw new Error("applyImageryLayer is not implemented");
}
