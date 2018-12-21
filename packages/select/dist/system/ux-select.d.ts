import { ObserverLocator, TaskQueue } from 'aurelia-framework';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxSelectTheme } from './ux-select-theme';
import { UxOptGroupElement } from './ux-optgroup';
import { UxOptionElement } from './ux-option';
declare module './ux-option' {
    interface UxOption {
        uxSelect: UxSelect;
    }
}
declare module './ux-optgroup' {
    interface UxOptGroup {
        uxSelect: UxSelect;
    }
}
export interface UxSelectElement<T = any> extends HTMLElement {
    matcher(a: any, b: any): boolean;
    value: T;
}
export interface UxOptionContainer extends HTMLElement {
    children: HTMLCollectionOf<UxOptGroupElement | UxOptionElement>;
}
export declare class UxSelect implements UxComponent {
    readonly element: UxSelectElement;
    private styleEngine;
    private observerLocator;
    private taskQueue;
    private selectedOption;
    private focusedUxOption;
    private winEvents;
    theme: UxSelectTheme;
    autofocus: boolean | string;
    disabled: boolean | string;
    multiple: boolean | string;
    placeholder: string;
    value: any;
    displayValue: string;
    expanded: boolean;
    readonly optionWrapperEl: HTMLElement;
    readonly optionCtEl: UxOptionContainer;
    constructor(element: UxSelectElement, styleEngine: StyleEngine, observerLocator: ObserverLocator, taskQueue: TaskQueue);
    bind(): void;
    attached(): void;
    unbind(): void;
    private resolveDisplayValue;
    private ignoreSelectEvent;
    private synchronizeOptions;
    private synchronizeValue;
    private setupListAnchor;
    private unsetupListAnchor;
    listAnchor: {
        x: number | string;
        y: number | string;
    } | null;
    private calcAnchorPosition;
    private onKeyboardSelect;
    call(): void;
    getValue(): any;
    private arrayObserver;
    setValue(newValue: any): void;
    private isExpanding;
    expand(): void;
    private isCollapsing;
    collapse(): void;
    private setFocusedOption;
    moveSelectedIndex(offset: number): void;
    onTriggerClick(): void;
    onBlur(): void;
    onSelect(e: CustomEvent): void;
    onKeyDown(event: KeyboardEvent): true | undefined;
    themeChanged(newValue: UxSelectTheme): void;
    multipleChanged(newValue: boolean | string, oldValue: boolean | string): void;
    readonly options: UxOptionElement[];
    getOptions(): UxOptionElement[];
    readonly isMultiple: boolean;
    readonly isDisabled: boolean;
}
