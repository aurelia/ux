export declare class UxField {
    private element;
    label: string;
    private labelElement;
    constructor(element: Element);
    attached(): void;
    labelChanged(newValue: string): void;
}
