import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxTagTheme } from './ux-tag-theme';
export declare class UxTag implements UxComponent {
    private element;
    private styleEngine;
    theme: UxTagTheme;
    type: any;
    value: any;
    constructor(element: HTMLInputElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: any): void;
    closeTag(): void;
}
