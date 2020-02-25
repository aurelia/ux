import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipTheme } from './ux-chip-theme';
export declare class UxChip implements UxComponent {
    element: HTMLInputElement;
    private styleEngine;
    theme: UxChipTheme;
    variant: 'filled' | 'outline';
    selectedIcon: string;
    focused: boolean;
    selected: any;
    private isFocused;
    constructor(element: HTMLInputElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: UxChipTheme): void;
    closeChip(event?: Event): void;
}
