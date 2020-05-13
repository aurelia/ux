export declare class UxCardHeader {
    element: HTMLElement;
    color: string;
    constructor(element: HTMLElement);
    bind(): Promise<void>;
    colorChanged(newValue: string): Promise<void>;
}
