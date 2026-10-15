import { ImageryLayerId } from "../domain/imageryCatalog";

export interface ImageryControl {
    readonly activeLayerId: string;
    readonly selectableLayerIds: ReadonlySet<ImageryLayerId>;
    readonly choose: (id: string) => void;
}