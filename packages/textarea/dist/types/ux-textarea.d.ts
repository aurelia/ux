import { StyleEngine, UxInputComponent } from '@aurelia-ux/core';
import { UxTextAreaTheme } from './ux-textarea-theme';
import '@aurelia-ux/core/components/ux-input-component.css';
import '@aurelia-ux/core/components/ux-input-component--outline.css';
export interface UxTextAreaElement extends HTMLElement {
    value: string;
}
export declare class UxTextArea implements UxInputComponent {
    private element;
    private styleEngine;
    private ignoreRawChanges;
    private isAttached;
    autocomplete: string;
    autofocus: boolean | string | null;
    autoResize: boolean | string;
    cols: number;
    disabled: boolean | string;
    maxlength: number;
    minlength: number;
    readonly: boolean | string;
    rows: number;
    label: string;
    placeholder: string;
    theme: UxTextAreaTheme;
    variant: 'filled' | 'outline';
    dense: any;
    rawValue: string;
    focused: boolean;
    value: any;
    textbox: HTMLTextAreaElement;
    constructor(element: UxTextAreaElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    focus(): void;
    blur(): void;
    getValue(): any;
    setValue(value: any): void;
    autocompleteChanged(newValue: any): void;
    rawValueChanged(newValue: string): void;
    themeChanged(newValue: any): void;
    fitTextContent(): void;
    focusedChanged(focus: boolean | string): void;
    variantChanged(newValue: string): void;
    get placeholderMode(): boolean;
}
