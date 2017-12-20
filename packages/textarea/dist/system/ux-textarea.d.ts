import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxTextareaTheme } from './ux-textarea-theme';
export declare class UxTextarea implements UxComponent {
    private element;
    private styleEngine;
    autofocus: null;
    autoResize: null;
    cols: number;
    disabled: boolean | string;
    maxlength: number;
    minlength: number;
    readonly: boolean | string;
    rows: number;
    theme: UxTextareaTheme;
    value: any;
    textbox: HTMLTextAreaElement;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    disabledChanged(newValue: boolean | string): void;
    readonlyChanged(newValue: boolean | string): void;
    themeChanged(newValue: any): void;
    valueChanged(): void;
    onFieldBlur(): void;
    onFieldFocus(): void;
}
