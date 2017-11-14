import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipTheme } from './ux-chip-theme';
export declare class UxChip implements UxComponent {
    private element;
    private styleEngine;
    theme: UxChipTheme;
    type: any;
    value: any;
    constructor(element: HTMLInputElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: UxChipTheme): void;
    closeChip(): void;
}
