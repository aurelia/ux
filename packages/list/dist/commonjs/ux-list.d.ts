import { UxComponent, StyleEngine, UxTheme } from '@aurelia-ux/core';
import { UxListTheme } from './ux-list-theme';
export declare class UxList implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: UxListTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newTheme: UxTheme): void;
}
