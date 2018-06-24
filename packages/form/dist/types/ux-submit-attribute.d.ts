export declare class UxSubmitCustomAttribute {
    element: Element;
    submitEvent: CustomEvent;
    private canSubmit;
    constructor(element: Element);
    attached(): void;
    detached(): void;
}
