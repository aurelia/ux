import { BindingEngine } from 'aurelia-framework';
import { UxOptionElement } from './ux-option';
declare module './ux-option' {
    interface UxOption {
        optGroup: UxOptGroup | null;
    }
}
export interface UxOptGroupElement extends HTMLElement {
    nodeName: 'UX-OPTGROUP';
    options: UxOptionElement[];
}
export interface OptGroupOptionsCt extends HTMLElement {
    children: HTMLCollectionOf<UxOptionElement>;
}
export declare class UxOptGroup {
    readonly element: UxOptGroupElement;
    private bindingEngine;
    private subscriptions;
    private parentDisabled;
    label: string;
    disabled: boolean;
    isDisabled: boolean;
    readonly optionsCt: OptGroupOptionsCt;
    constructor(element: UxOptGroupElement, bindingEngine: BindingEngine);
    created(): void;
    bind(): void;
    attached(): void;
    detached(): void;
    private getUxSelect;
    private setParentDisabled;
    getOptions(): UxOptionElement[];
    getDisabled(): boolean;
    setDisabled(disabled: boolean): void;
}
