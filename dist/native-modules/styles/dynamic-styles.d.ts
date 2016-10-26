export interface StyleModule {
    [x: string]: Function;
}
export declare function createDynamicStyleModule(styleUrl: string): StyleModule;
