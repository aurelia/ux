import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';
export interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class UxInput implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    private ignoreRawChanges;
    autofocus: null;
    autocomplete: string;
    disabled: any;
    maxlength: number;
    minlength: number;
    min: number;
    max: number;
    readonly: any;
    theme: UxInputTheme;
    label: any;
    type: any;
    rawValue: string;
    focused: boolean;
    value: any;
    textbox: HTMLInputElement;
    constructor(element: UxInputElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    getValue(): any;
    setValue(value: any): void;
    private processRawValue;
    autocompleteChanged(newValue: any): void;
    themeChanged(newValue: any): void;
    focusedChanged(focused: boolean): void;
    typeChanged(newValue: any): void;
    rawValueChanged(newValue: string): void;
    focusInput(): void;
}
