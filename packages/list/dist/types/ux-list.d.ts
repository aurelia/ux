import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxListTheme } from './ux-list-theme';
export declare class UxList implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    theme: UxListTheme;
    type: string;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    typeChanged(newValue: string, oldValue?: string): void;
    themeChanged(newValue: UxListTheme): void;
}
