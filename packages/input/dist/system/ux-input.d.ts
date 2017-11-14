import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';
export declare class UxInput implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    autofocus: null;
    disabled: any;
    maxlength: number;
    minlength: number;
    min: number;
    max: number;
    readonly: any;
    theme: UxInputTheme;
    type: any;
    value: any;
    private textbox;
    constructor(element: HTMLInputElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    disabledChanged(newValue: any): void;
    readonlyChanged(newValue: any): void;
    typeChanged(newValue: any): void;
    valueChanged(newValue: any): void;
}
