import { describe, expect, it } from "vitest";
import {
  availableImageryLayers,
  EUROPE_LAYER_ID,
  ImageryLayerDefinition,
  MapCenter,
  NORTH_AMERICA_LAYER_ID,
  OPENING_LAYER,
  OPENING_MAP_CENTER,
} from "./imageryCatalog";
import { chooseImageryLayer, selectableImageryLayers } from "./imagerySelection";

describe("imagery catalog", () => {
  it("lists North America and Europe in that order", () => {
    expect(availableImageryLayers.map((layer) => [layer.id, layer.name])).toEqual([
      [NORTH_AMERICA_LAYER_ID, "North America"],
      [EUROPE_LAYER_ID, "Europe"],
    ]);
  });

  it("overlaps the two bounding boxes over the North Atlantic", () => {
    const [northAmerica, europe] = availableImageryLayers;
    expect(northAmerica.boundingBox).toEqual({ west: -170, south: 7, east: -15, north: 83 });
    expect(europe.boundingBox).toEqual({ west: -35, south: 34, east: 40, north: 72 });
  });

  it("opens on a center inside North America and outside Europe", () => {
    expect(OPENING_MAP_CENTER).toEqual({ longitude: -98, latitude: 39 });
  });
});

describe("imagery selection", () => {

  const [northAmerica, europe] = availableImageryLayers;
  const NORTH_AMERICA_ONLY: MapCenter = OPENING_MAP_CENTER;
  const EUROPE_ONLY: MapCenter = { longitude: 10, latitude: 50 };
  const NORTH_ATL: MapCenter = { longitude: -25, latitude: 50 };
  const NOWHERE: MapCenter = { longitude: 80, latitude: 0 };

  const selectableIds = (center: MapCenter | undefined) =>
    selectableImageryLayers(center, availableImageryLayers).map((layer => layer.id));

  const choose = (
    activeLayerId: ImageryLayerDefinition,
    layerId: string,
    center: MapCenter | undefined
  ) => chooseImageryLayer(activeLayerId, layerId, center, availableImageryLayers);

  it("opens with North America active", () => {
    expect(OPENING_LAYER.id).toBe(NORTH_AMERICA_LAYER_ID);
  });

  it("a center in North America only can select North America and cannot select Europe", () => {
    expect(selectableIds(NORTH_AMERICA_ONLY)).toEqual([NORTH_AMERICA_LAYER_ID]);
  });

  it("a center in Europe only can select Europe and cannot select North America", () => {
    expect(selectableIds(EUROPE_ONLY)).toEqual([EUROPE_LAYER_ID])
  });

  it("a center in the Atlantic overlap can select either layer", () => {
    expect(selectableIds(NORTH_ATL)).toEqual([NORTH_AMERICA_LAYER_ID, EUROPE_LAYER_ID]);
  });

  describe("a center on a bbox edge counts as inside that layer", () => {
    it.each([
      { layerId: NORTH_AMERICA_LAYER_ID, center: { longitude: -170, latitude: 40 }, edge: "west" },
      { layerId: EUROPE_LAYER_ID, center: { longitude: 40, latitude: 50 }, edge: "east" },
      { layerId: NORTH_AMERICA_LAYER_ID, center: { longitude: -100, latitude: 7 }, edge: "south" },
      { layerId: EUROPE_LAYER_ID, center: { longitude: 10, latitude: 72 }, edge: "north" }
    ])("the $edge edge of $layerId", ({ center, layerId }) => {
      expect(selectableIds(center)).toEqual([layerId]);
    })

  });

  it("a center outside both boxes cannot select either layer", () => {
    expect(selectableIds(NOWHERE)).toEqual([]);
  });

  it("choosing a layer outside the center keeps the previous active layer", () => {
    expect(choose(northAmerica, EUROPE_LAYER_ID, NORTH_AMERICA_ONLY)).toBe(northAmerica);
  });

  it("an unknown id, typed as string, keeps the previous active layer", () => {
    const customID: string = "Kalaleh"
    expect(choose(europe, customID, NORTH_ATL)).toBe(europe);
  });

  it("a missing map center cannot select any layer", () => {
    expect(selectableIds(undefined)).toEqual([]);
  });
});
