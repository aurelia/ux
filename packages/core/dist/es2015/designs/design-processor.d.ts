import { ObserverLocator } from 'aurelia-binding';
import { Design } from '../designs/design';
import { GlobalStyleEngine } from '../styles/global-style-engine';
export declare class DesignProcessor {
    private observerLocator;
    private globalStyleEngine;
    constructor(observerLocator: ObserverLocator, globalStyleEngine: GlobalStyleEngine);
    setSwatchVariables(): void;
    setDesignVariables(design: Design): void;
    setDesignWatches(design: Design): void;
    private buildInnerHTML;
}
