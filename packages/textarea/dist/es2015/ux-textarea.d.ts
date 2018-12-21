import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxTextAreaTheme } from './ux-textarea-theme';
export interface UxTextAreaElement extends HTMLElement {
    value: string;
}
export declare class UxTextArea implements UxComponent {
    private element;
    private styleEngine;
    private ignoreRawChanges;
    private isAttached;
    autocomplete: string;
    autofocus: boolean | string | null;
    autoResize: boolean | string;
    cols: number;
    disabled: boolean | string;
    focus: boolean | string;
    maxlength: number;
    minlength: number;
    readonly: boolean | string;
    rows: number;
    theme: UxTextAreaTheme;
    rawValue: string;
    value: any;
    textbox: HTMLTextAreaElement;
    constructor(element: UxTextAreaElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    getValue(): any;
    setValue(value: any): void;
    autocompleteChanged(newValue: any): void;
    rawValueChanged(rawValue: string): void;
    themeChanged(newValue: any): void;
    fitTextContent(): void;
    focusChanged(focus: boolean | string): void;
}
