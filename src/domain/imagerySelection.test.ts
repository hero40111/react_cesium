import { describe, expect, it } from "vitest";
import {
  availableImageryLayers,
  EUROPE_LAYER_ID,
  NORTH_AMERICA_LAYER_ID,
  OPENING_MAP_CENTER,
} from "./imageryCatalog";

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
  it.todo("opens with North America active");
  it.todo("a center in North America only can select North America and cannot select Europe");
  it.todo("a center in Europe only can select Europe and cannot select North America");
  it.todo("a center in the Atlantic overlap can select either layer");
  it.todo("a center on a bbox edge counts as inside that layer");
  it.todo("a center outside both boxes cannot select either layer");
  it.todo("choosing a layer outside the center keeps the previous active layer");
  it.todo("an unknown id, typed as string, keeps the previous active layer");
});
