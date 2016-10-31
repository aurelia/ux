import { ViewResources, View } from 'aurelia-templating';
import { StyleEngine, Themable } from '../styles/style-engine';
export declare class XpButton implements Themable {
    resources: ViewResources;
    private styleEngine;
    raised: null;
    disabled: boolean;
    theme: null;
    view: View;
    constructor(resources: ViewResources, styleEngine: StyleEngine);
    created(_: any, myView: View): void;
    bind(): void;
    themeChanged(newValue: any): void;
}
export declare class StyleResolveValueConverter {
    toView(className: string, styleValue: boolean, elementValue: string): string;
}
