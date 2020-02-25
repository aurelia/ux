import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipListTheme } from './ux-chip-list-theme';
export declare class UxChipList implements UxComponent {
    private element;
    private styleEngine;
    theme: UxChipListTheme;
    type: 'inline' | 'scroll' | 'stack';
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    themeChanged(newValue: UxChipListTheme): void;
}
