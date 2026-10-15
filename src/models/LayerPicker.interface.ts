export interface LayerPickerProps {
    readonly activeLayerId: string;
    readonly onChoose: (id: string) => void;
}