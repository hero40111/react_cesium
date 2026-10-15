import { availableImageryLayers } from "../domain/imageryCatalog";
import { LayerPickerProps } from "../models/LayerPicker.interface";

export function LayerPicker({ activeLayerId, selectableLayerIds, onChoose }: LayerPickerProps) {
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
              onClick={() => onChoose(layer.id)}
            >{layer.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
