import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';
export declare class UxCard implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: UxCardTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
}
