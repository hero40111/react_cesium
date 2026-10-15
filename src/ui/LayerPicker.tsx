import { availableImageryLayers } from "../domain/imageryCatalog";
import { ImageryControl } from "../models/LayerPicker.interface";

export function LayerPicker({ activeLayerId, selectableLayerIds, choose }: ImageryControl) {
  return (
    <aside className="layer-picker">
      <h1>Imagery</h1>
      <ul>
        {availableImageryLayers.map((layer) => (
          <li key={layer.id}>
            <button
              type="button"
              aria-current={layer.id === activeLayerId ? "true" : undefined}
              disabled={!selectableLayerIds.has(layer.id)}
              onClick={() => choose(layer.id)}
            >{layer.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
