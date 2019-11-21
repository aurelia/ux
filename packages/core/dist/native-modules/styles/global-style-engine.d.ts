export declare class GlobalStyleEngine {
    private logger;
    private globalStyles;
    private styleTag;
    constructor();
    addOrUpdateGlobalStyle(id: string, css: string, tagGroup?: string): void;
    removeGlobalStyle(id: string): void;
    private updateGlobalStyleElement;
}
