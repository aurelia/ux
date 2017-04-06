import { View } from 'aurelia-templating';
import { Container } from 'aurelia-dependency-injection';
import { StyleController } from './style-controller';
import { StyleFactory } from './style-factory';
import { Themable } from './themable';
export declare class StyleEngine {
    private container;
    private controllers;
    constructor(container: Container);
    getThemeKeyForComponent(obj: any): string;
    applyTheme(themable: Themable, theme: string | object | null): void;
    getOrCreateStyleController(view: View, factory: StyleFactory): StyleController;
    private getShadowDOMRoot(view);
}
