import { Logger } from 'aurelia-logging';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
export declare class UxIcon implements UxComponent {
    private element;
    private styleEngine;
    private logger;
    size: string;
    theme: UxIconTheme;
    icon: any;
    constructor(element: HTMLElement, styleEngine: StyleEngine, logger: Logger);
    bind(): void;
    themeChanged(newValue: any): void;
    iconChanged(newValue: any): void;
    private changeIcon;
}
