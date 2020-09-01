import { TaskQueue } from 'aurelia-framework';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxPopupTheme } from './ux-popup-theme';
interface IAnchor {
    left: string | undefined;
    right: string | undefined;
    top: string | undefined;
    bottom: string | undefined;
    maxHeight: number | undefined;
    maxWidth: number | undefined;
}
export declare class UxPopup implements UxComponent, EventListenerObject {
    private element;
    private styleEngine;
    private taskQueue;
    constructor(element: HTMLElement, styleEngine: StyleEngine, taskQueue: TaskQueue);
    anchor: IAnchor | null;
    isWrapperOpen: boolean;
    isOpen: boolean;
    popupContent: HTMLDivElement;
    isMeasured: boolean;
    trigger: HTMLElement | undefined;
    triggerChanged(newValue: HTMLElement, oldValue: HTMLElement): void;
    theme: UxPopupTheme;
    themeChanged(newValue: UxPopupTheme): void;
    autoclose: string | boolean;
    detached(): void;
    handleEvent(evt: Event): void;
    triggerClick(): void;
    close(): void;
    updateAnchor(): void;
    onWindowWheel(evt: Event): void;
    onWindowResize(): void;
    onWindowClick(evt: Event): void;
    /**
     * Retrieves the computed CSS variable value for the given element and key.
     *
     * @param element
     * @param key Key of the theme
     * @param variableName Name of the theme variable to retrieve
     * @param defaultValue Default value
     */
    getVariableValue(element: Element, key: string, variableName: string, defaultValue?: string): string;
}
export {};
