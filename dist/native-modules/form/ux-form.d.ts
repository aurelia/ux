import { ViewResources, View } from 'aurelia-templating';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
export declare class UxForm implements Themable {
    private element;
    resources: ViewResources;
    private styleEngine;
    theme: null;
    submitOnEnter: any;
    view: View;
    private bindSubmitToEnter;
    constructor(element: Element, resources: ViewResources, styleEngine: StyleEngine);
    created(_: any, myView: View): void;
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    submitForm(): void;
}
