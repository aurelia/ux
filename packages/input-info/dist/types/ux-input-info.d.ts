import { UxInputInfoTheme } from './ux-input-info-theme';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
export declare class UxInputInfo implements UxComponent {
    private element;
    styleEngine: StyleEngine;
    target: Element;
    uxInputCounter: null;
    theme: UxInputInfoTheme;
    inputElementModel: any;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: UxInputInfoTheme): void;
    private findAndSetTarget;
}
