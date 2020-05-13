import { StyleEngine, UxInputComponent } from '@aurelia-ux/core';
import { UxInputTheme } from './ux-input-theme';
import '@aurelia-ux/core/components/ux-input-component.css';
import '@aurelia-ux/core/components/ux-input-component--outline.css';
export interface UxInputElement extends HTMLElement {
    value: any;
}
export declare class UxInput implements UxInputComponent {
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
    label: string;
    placeholder: string;
    type: any;
    variant: 'filled' | 'outline';
    dense: any;
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
    variantChanged(newValue: string): void;
    get placeholderMode(): boolean;
}
