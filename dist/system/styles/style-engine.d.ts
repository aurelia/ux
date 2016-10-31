import { ViewResources, View } from 'aurelia-templating';
import { Container } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { StyleFactory } from './style-factory';
export interface Themable {
    resources: ViewResources;
    view: View;
}
export declare class StyleEngine {
    private container;
    private controllers;
    constructor(container: Container);
    applyTheme(themable: Themable, theme: string | Object | null): void;
    getOrCreateStlyeController(view: View, factory: StyleFactory): StyleController;
    renderingInShadowDOM(view: View): boolean;
}
