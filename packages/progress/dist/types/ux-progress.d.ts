import { UxProgressTheme } from './ux-progress-theme';
import { StyleEngine } from '@aurelia-ux/core';
export declare class UxProgress {
    element: HTMLElement;
    private styleEngine;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    strokeDashOffset: number;
    valueNumber: number | null | undefined;
    viewBox: string;
    animationTemplate: string;
    strokeCircumference: number;
    value: number | string;
    valueChanged(): void;
    theme: UxProgressTheme;
    themeChanged(newValue: UxProgressTheme): void;
    private diameterNumber;
    diameter: number | string;
    diameterChanged(): void;
    private strokeWidthNumber;
    strokeWidth: number | string;
    strokeWidthChanged(): void;
    bind(): void;
    private update;
}
