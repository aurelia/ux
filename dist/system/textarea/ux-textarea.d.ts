import { ViewResources, View } from 'aurelia-templating';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
export declare class UxTextarea implements Themable {
    private element;
    private styleEngine;
    resources: ViewResources;
    autofocus: null;
    autoResize: null;
    cols: number;
    disabled: any;
    maxlength: number;
    minlength: number;
    readonly: any;
    rows: number;
    theme: null;
    value: any;
    textbox: HTMLTextAreaElement;
    view: View;
    constructor(element: HTMLTextAreaElement, styleEngine: StyleEngine, resources: ViewResources);
    created(_: any, myView: View): void;
    bind(): void;
    attached(): void;
    detached(): void;
    disabledChanged(newValue: any): void;
    readonlyChanged(newValue: any): void;
    themeChanged(newValue: any): void;
    valueChanged(): void;
}
