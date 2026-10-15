export const NORTH_AMERICA_LAYER_ID = "north-america" as const;
export const EUROPE_LAYER_ID = "europe" as const;

export type ImageryLayerId = typeof NORTH_AMERICA_LAYER_ID | typeof EUROPE_LAYER_ID;

export interface MapCenter {
  readonly longitude: number;
  readonly latitude: number;
}

export interface BoundingBox {
  readonly west: number;
  readonly south: number;
  readonly east: number;
  readonly north: number;
}

export interface ImageryLayerDefinition {
  readonly id: ImageryLayerId;
  readonly name: string;
  readonly tileUrlTemplate: string;
  readonly credit: string;
  readonly boundingBox: BoundingBox;
}

export const OPENING_MAP_CENTER: MapCenter = {
  longitude: -98,
  latitude: 39,
};

const northAmericaImagery: ImageryLayerDefinition = {
  id: NORTH_AMERICA_LAYER_ID,
  name: "North America",
  tileUrlTemplate:
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
  credit: "Esri, Maxar, Earthstar Geographics, and the GIS User Community",
  boundingBox: { west: -170, south: 7, east: -15, north: 83 },
};

const europeImagery: ImageryLayerDefinition = {
  id: EUROPE_LAYER_ID,
  name: "Europe",
  tileUrlTemplate:
    "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
  credit: "Esri, HERE, Garmin, FAO, NOAA, USGS, and the GIS User Community",
  boundingBox: { west: -35, south: 34, east: 40, north: 72 },
};

export const availableImageryLayers: readonly ImageryLayerDefinition[] = [
  northAmericaImagery,
  europeImagery,
];

export const OPENING_LAYER : ImageryLayerDefinition = northAmericaImagery;