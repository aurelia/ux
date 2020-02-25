import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSliderTheme } from './ux-slider-theme';
export interface UxSliderElement extends HTMLElement {
    value: number;
}
export interface MouseOrTouchEvent extends MouseEvent {
    touches?: Array<{
        clientX: number;
    }>;
}
export declare class UxSlider implements UxComponent {
    element: UxSliderElement;
    private styleEngine;
    private isActive;
    private percentValue;
    theme: UxSliderTheme;
    value: number;
    min: number;
    max: number;
    disabled: boolean;
    step: number;
    constructor(element: UxSliderElement, styleEngine: StyleEngine);
    get sliderBeforeWidth(): number;
    get sliderAfterWidth(): number;
    bind(): void;
    stepChanged(): void;
    themeChanged(newValue: any): void;
    minChanged(): void;
    maxChanged(): void;
    valueChanged(): void;
    updateValue(currentMouseX: number): void;
    onTrackMouseDown(e: MouseOrTouchEvent): void;
    onKeyDown(e: KeyboardEvent): boolean;
    getValue(): number;
    setValue(value: number): void;
    private boundValue;
}
