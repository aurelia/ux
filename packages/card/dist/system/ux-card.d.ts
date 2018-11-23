import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';
export declare class UxCard implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    xs?: string;
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
    order?: string;
    theme: UxCardTheme;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    xsChanged(newValue?: string): void;
    smChanged(newValue?: string): void;
    mdChanged(newValue?: string): void;
    lgChanged(newValue?: string): void;
    xlChanged(newValue?: string): void;
    sizeChanged(size: string, value?: string): void;
    orderChanged(): void;
    themeChanged(newValue: any): void;
}
