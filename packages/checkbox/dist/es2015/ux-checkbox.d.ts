import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxCheckboxTheme } from './ux-checkbox-theme';
export declare class UxCheckbox implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    disabled: boolean | string;
    effect: null;
    id: string;
    label: string;
    model: any;
    tabindex: number;
    theme: UxCheckboxTheme;
    matcher: (a: any, b: any) => boolean;
    checked: any;
    value: any;
    uncheckedValue: any;
    private checkbox;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: UxCheckboxTheme): void;
    disabledChanged(newValue: boolean | string): void;
    checkedChanged(): void;
    toggleCheckbox(): void;
    onKeydown(e: KeyboardEvent): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
