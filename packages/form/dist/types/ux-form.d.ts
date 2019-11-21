import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFormTheme } from './ux-form-theme';
export declare class UxForm implements UxComponent {
    private element;
    private styleEngine;
    theme: UxFormTheme;
    submitOnEnter: any;
    private bindSubmitToEnter;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    themeChanged(newValue: any): void;
    submitForm(): void;
}
