import { BindingEngine } from 'aurelia-framework';
import { PaperRipple } from '@aurelia-ux/core';
export interface UxOptionElement extends HTMLElement {
    disabled: boolean;
    focused: boolean;
    nodeName: 'UX-OPTION';
    selected: boolean;
    ripple: PaperRipple;
    value: any;
    wave(): void;
}
export interface UxOptionSelectEvent extends Event {
    target: UxOptionElement;
}
export declare class UxOption {
    readonly element: UxOptionElement;
    private bindingEngine;
    private selected;
    private subscriptions;
    disabled: boolean;
    parentDisabled: boolean;
    isDisabled: boolean;
    focused: boolean;
    isMultiple: boolean;
    readonly textEl: HTMLElement;
    text: string;
    value: any;
    constructor(element: UxOptionElement, bindingEngine: BindingEngine);
    created(): void;
    bind(): void;
    attached(): void;
    detached(): void;
    private getOptGroup;
    private getUxSelect;
    private uxMultipleChanged;
    private setParentDisabled;
    private notify;
    getFocused(): boolean;
    setFocused(focused: boolean): void;
    getSelected(): boolean;
    setSelected(selected: boolean): void;
    getDisabled(): boolean;
    setDisabled(disabled: boolean): void;
    onClick(): void;
    onMouseDown(e: MouseEvent): boolean;
    /**
     * @param autoEnd Internal flag to distinguish between keyboard navigation and mouse
     */
    addWave(e?: MouseEvent | null, autoEnd?: boolean): void;
}
