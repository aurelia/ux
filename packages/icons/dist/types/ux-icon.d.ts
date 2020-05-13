import { Logger } from 'aurelia-logging';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxIconTheme } from './ux-icon-theme';
import { UxIconMap } from './ux-icon-map';
export declare class UxIcon implements UxComponent {
    private element;
    private iconMap;
    private styleEngine;
    private logger;
    size: string;
    theme: UxIconTheme;
    icon: any;
    constructor(element: HTMLElement, iconMap: UxIconMap, styleEngine: StyleEngine, logger: Logger);
    bind(): void;
    sizeChanged(newValue: string): void;
    themeChanged(newValue: any): void;
    iconChanged(newValue: any): void;
    private changeIcon;
}
