export interface StyleModule {
    [x: string]: new () => any;
}
export declare function createDynamicStyleModule(styleUrl: string): StyleModule;
