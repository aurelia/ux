import { ViewResources, View } from 'aurelia-templating';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
export declare class UxButton implements Themable {
    resources: ViewResources;
    private styleEngine;
    disabled: boolean;
    theme: null;
    view: View;
    constructor(resources: ViewResources, styleEngine: StyleEngine);
    created(_: any, myView: View): void;
    bind(): void;
    themeChanged(newValue: any): void;
}
