import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';
export declare class UxGrid implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: UxGridTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
