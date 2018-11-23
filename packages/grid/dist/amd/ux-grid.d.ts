import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxGridTheme } from './ux-grid-theme';
export declare class UxGrid implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: UxGridTheme;
    columns: null | number;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    processAttributes(): void;
    themeChanged(newValue: any): void;
    columnsChanged(newValue: null | number): void;
}
