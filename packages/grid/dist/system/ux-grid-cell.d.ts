export declare class UxGridCell {
    private element;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    order?: string;
    constructor(element: HTMLElement);
    bind(): Promise<void>;
    processAttributes(): void;
    xsChanged(newValue?: string): void;
    smChanged(newValue?: string): void;
    mdChanged(newValue?: string): void;
    lgChanged(newValue?: string): void;
    xlChanged(newValue?: string): void;
    sizeChanged(size: string, value?: string): void;
    orderChanged(): void;
}
