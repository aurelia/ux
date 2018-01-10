import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
export declare class UxSwitch implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    disabled: boolean | string;
    effect: string;
    id: string;
    theme: UxSwitchTheme;
    checked: any;
    private checkbox;
    private ripple;
    readonly isDisabled: boolean;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: UxSwitchTheme): void;
    disabledChanged(newValue: boolean | string): void;
    onMouseDown(e: MouseEvent): void;
    onMouseUp(e: MouseEvent): void;
}
