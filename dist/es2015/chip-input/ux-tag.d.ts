import { ViewResources, View } from 'aurelia-templating';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
export declare class UxTag implements Themable {
    private element;
    resources: ViewResources;
    private styleEngine;
    theme: null;
    type: any;
    value: any;
    view: View;
    constructor(element: HTMLInputElement, resources: ViewResources, styleEngine: StyleEngine);
    created(_: any, myView: View): void;
    bind(): void;
    themeChanged(newValue: any): void;
    closeTag(): void;
}
