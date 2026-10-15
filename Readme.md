## Assumptions and changes

1. **A missing map center selects nothing.** `readMapCenter` returns `undefined` when the middle of
  the screen is not on the globe (for example when the camera looks at the sky). In that case no
   layer is selectable. The imagery already shown stays.
2. **The map center is read on Cesium's** `camera.moveEnd` **event.** Selectable buttons update after
  the camera stops moving, not on every frame while dragging
3. **Bounding boxes do not cross the antimeridian** (`west <= east`). This holds for both catalog
  boxes.

## Files changed


| File                                  | What changed                                                                                                                                                |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/domain/imageryCatalog.ts`        | Added `OPENING_ACTIVE_LAYER` (North America).                                                                                                               |
| `src/domain/imagerySelection.ts`      | Implemented the selection rules: `selectableImageryLayers` and `chooseImageryLayer`.                                                                        |
| `src/domain/imagerySelection.test.ts` | Replaced the `it.todo` cases with real tests.                                                                                                               |
| `src/cesium/applyImageryLayer.ts`     | Implemented applying the chosen layer above the Natural Earth underlay and removing the previous selectable layer.                                          |
| `src/ui/useImageryControl.ts`         | **New file.** Hook that holds the active layer and map center, calls the domain on choose/move, and calls the Cesium adapter when the active layer changes. |
| `src/ui/LayerPicker.tsx`              | Wired props for active / selectable layers; buttons report `onChoose(id)` only (no URLs or bounding boxes in the click handler).                            |
| `src/ui/GlobeView.tsx`                | Creates the viewer, passes it to the hook, and connects the picker.                                                                                         |
| `src/styles.css`                      | Styles for the active button (`aria-current`) and disabled buttons.                                                                                         |