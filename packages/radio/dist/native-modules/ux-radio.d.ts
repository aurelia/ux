import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';
export interface UxRadioElement extends HTMLElement {
    type: 'radio';
    checked: boolean;
}
export declare class UxRadio implements UxComponent {
    element: UxRadioElement;
    private styleEngine;
    private ignoreValueChanges;
    disabled: boolean | string;
    effect: string;
    id: string;
    theme: UxRadioTheme;
    checked: boolean;
    value: boolean;
    focused: boolean;
    private radio;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: UxRadioElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    getChecked(): boolean;
    setChecked(value: any): void;
    disabledChanged(newValue: boolean): void;
    focusedChanged(newValue: boolean): void;
    themeChanged(newValue: UxRadioTheme): void;
    valueChanged(value: boolean): void;
    onMouseDown(e: MouseEvent): void;
}
