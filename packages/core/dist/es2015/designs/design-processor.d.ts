import { ObserverLocator } from 'aurelia-binding';
import { Design } from '../designs/design';
export declare class DesignProcessor {
    private observerLocator;
    private designStyleElement;
    constructor(observerLocator: ObserverLocator);
    setSwatchVariables(): void;
    setDesignVariables(design: Design): void;
    setDesignWatches(design: Design): void;
    private buildInnerHTML(design);
}
