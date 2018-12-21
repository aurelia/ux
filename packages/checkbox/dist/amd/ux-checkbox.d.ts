import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxCheckboxTheme } from './ux-checkbox-theme';
export interface UxCheckboxElement extends HTMLElement {
    type: 'checkbox';
    checked: boolean;
}
export declare class UxCheckbox implements UxComponent {
    element: UxCheckboxElement;
    private styleEngine;
    private ignoreValueChanges;
    disabled: boolean | string;
    effect: string;
    id: string;
    theme: UxCheckboxTheme;
    checked: boolean;
    value: boolean;
    focused: boolean;
    private indeterminate;
    private checkbox;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: UxCheckboxElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    getChecked(): boolean;
    setChecked(value: any): void;
    getIndeterminate(): boolean;
    setIndeterminate(value: any): void;
    checkedChanged(newValue: any, oldValue: any): void;
    disabledChanged(newValue: boolean): void;
    focusedChanged(newValue: boolean): void;
    themeChanged(newValue: UxCheckboxTheme): void;
    valueChanged(newValue: boolean): void;
    onMouseDown(e: MouseEvent): void;
}
