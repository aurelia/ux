import { ObserverLocator } from 'aurelia-binding';
import { StyleController } from './style-controller';
import { UxTheme } from './ux-theme';
export declare class ThemeInstanceController {
    private observerLocator;
    private styleController;
    private registeredThemes;
    constructor(observerLocator: ObserverLocator, styleController: StyleController);
    registerThemedElement(theme: UxTheme, element: HTMLElement): void;
    private setWatches(instance);
}
export declare class UxThemeInstance {
    theme: UxTheme;
    elements: HTMLElement[];
    constructor(theme: UxTheme);
}
