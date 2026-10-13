import { availableImageryLayers } from "../domain/imageryCatalog";

export function LayerPicker() {
  return (
    <aside className="layer-picker">
      <h1>Imagery</h1>
      <ul>
        {availableImageryLayers.map((layer) => (
          <li key={layer.id}>
            <button type="button">{layer.name}</button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
