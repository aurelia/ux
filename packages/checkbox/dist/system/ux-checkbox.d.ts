import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxCheckboxTheme } from './ux-checkbox-theme';
export declare class UxCheckbox implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    disabled: boolean | string;
    effect: string;
    id: string;
    theme: UxCheckboxTheme;
    matcher: any;
    model: any;
    checked: any;
    value: any;
    private checkbox;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    attached(): void;
    themeChanged(newValue: UxCheckboxTheme): void;
    disabledChanged(newValue: boolean | string): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
