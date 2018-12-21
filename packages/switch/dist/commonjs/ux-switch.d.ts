import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
export interface UxSwitchElement extends HTMLElement {
    type: 'checkbox';
    checked: boolean;
}
export declare class UxSwitch implements UxComponent {
    element: UxSwitchElement;
    private styleEngine;
    private ignoreValueChanges;
    disabled: boolean | string;
    effect: string;
    id: string;
    theme: UxSwitchTheme;
    checked: any;
    value: boolean;
    focused: boolean;
    private checkbox;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: UxSwitchElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    getChecked(): any;
    setChecked(value: any): void;
    checkedChanged(newValue: any, oldValue: any): void;
    focusedChanged(newValue: boolean): void;
    valueChanged(newValue: boolean): void;
    themeChanged(newValue: UxSwitchTheme): void;
    disabledChanged(newValue: boolean | string): void;
    onMouseDown(e: MouseEvent): void;
}
