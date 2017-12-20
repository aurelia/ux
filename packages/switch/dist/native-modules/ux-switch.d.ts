import { ViewResources } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
export declare class UxSwitch implements UxComponent {
    element: HTMLElement;
    resources: ViewResources;
    private styleEngine;
    disabled: boolean | string;
    effect: null;
    id: string;
    tabindex: number;
    theme: UxSwitchTheme;
    checked: boolean;
    readonly isDisabled: boolean;
    constructor(element: HTMLElement, resources: ViewResources, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: UxSwitchTheme): void;
    disabledChanged(newValue: boolean | string): void;
    checkedChanged(): void;
    toggleSwitch(): void;
    onKeydown(e: KeyboardEvent): boolean;
}
