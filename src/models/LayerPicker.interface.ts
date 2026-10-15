import { ImageryLayerId } from "../domain/imageryCatalog";

export interface LayerPickerProps {
    readonly activeLayerId: string;
    readonly selectableLayerIds: ReadonlySet<ImageryLayerId>;
    readonly onChoose: (id: string) => void;
}