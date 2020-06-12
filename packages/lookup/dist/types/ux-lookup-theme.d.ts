import { UxTheme } from '@aurelia-ux/core';
export declare class UxLookupTheme implements UxTheme {
    themeKey: string;
    static DEFAULT_INPUT_DISTANCE: number;
    static DEFAULT_WINDOW_EDGE_DISTANCE: number;
    static DEFAULT_BOTTOM_HEIGHT_THRESHOLD: number;
    static DEFAULT_TRANSITION_DURATION: string;
    transitionDuration: string;
    background: string;
    foreground: string;
    elevation: string;
    optionHoverBackground: string;
    optionFocusedBackground: string;
    inputDistance: number;
    windowEdgeDistance: number;
    bottomHeightThreshold: number;
}
