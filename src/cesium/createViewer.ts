import {
  buildModuleUrl,
  Cartesian3,
  EllipsoidTerrainProvider,
  ImageryLayer,
  TileMapServiceImageryProvider,
  Viewer,
} from "cesium";
import { OPENING_MAP_CENTER } from "../domain/imageryCatalog";

export const NATURAL_EARTH_UNDERLAY_INDEX = 0;

const NATURAL_EARTH_ASSET_PATH = "Assets/Textures/NaturalEarthII";
const OPENING_CAMERA_HEIGHT_METERS = 7_000_000;

export function createViewer(container: HTMLElement): Viewer {
  const viewer = new Viewer(container, {
    baseLayer: ImageryLayer.fromProviderAsync(
      TileMapServiceImageryProvider.fromUrl(buildModuleUrl(NATURAL_EARTH_ASSET_PATH)),
    ),
    terrainProvider: new EllipsoidTerrainProvider(),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    animation: false,
    timeline: false,
    fullscreenButton: false,
    infoBox: false,
    selectionIndicator: false,
  });

  viewer.camera.setView({
    destination: Cartesian3.fromDegrees(
      OPENING_MAP_CENTER.longitude,
      OPENING_MAP_CENTER.latitude,
      OPENING_CAMERA_HEIGHT_METERS,
    ),
  });

  return viewer;
}
