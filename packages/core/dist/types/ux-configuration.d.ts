import { Loader } from 'aurelia-loader';
import { GlobalStyleEngine } from './styles/global-style-engine';
export declare class UXConfiguration {
    private loader;
    private globalStyleEngine;
    private logger;
    constructor(loader: Loader, globalStyleEngine: GlobalStyleEngine);
    defaultConfiguration(): this;
    cssNormalize(): this;
}
