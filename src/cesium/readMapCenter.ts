import { Cartesian2, Cartographic, Math as CesiumMath, type Viewer } from "cesium";
import type { MapCenter } from "../domain/imageryCatalog";

export function readMapCenter(viewer: Viewer): MapCenter | undefined {
  const canvas = viewer.scene.canvas;
  const screenCenter = new Cartesian2(canvas.clientWidth / 2, canvas.clientHeight / 2);
  const onGlobe = viewer.camera.pickEllipsoid(screenCenter, viewer.scene.globe.ellipsoid);
  if (onGlobe === undefined) {
    return undefined;
  }

  const cartographic = Cartographic.fromCartesian(onGlobe);
  return {
    longitude: CesiumMath.toDegrees(cartographic.longitude),
    latitude: CesiumMath.toDegrees(cartographic.latitude),
  };
}
