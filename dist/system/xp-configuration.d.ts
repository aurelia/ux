import { Loader } from 'aurelia-loader';
import { ViewEngine } from 'aurelia-templating';
export declare class XpConfiguration {
    private loader;
    private viewEngine;
    constructor(loader: Loader, viewEngine: ViewEngine);
    defaultConfiguration(): this;
    styleLoaderPlugin(): this;
    commandHandler(): this;
}
