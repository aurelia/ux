import { TaskQueue } from 'aurelia-framework';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxExpandableTheme } from './ux-expandable-theme';
export declare class UxExpandable implements UxComponent {
    element: HTMLElement;
    private styleEngine;
    private taskQueue;
    constructor(element: HTMLElement, styleEngine: StyleEngine, taskQueue: TaskQueue);
    static OPEN_CHANGED_EVENT: string;
    header: HTMLElement;
    content: HTMLElement;
    contentContainer: HTMLElement;
    theme: UxExpandableTheme;
    themeChanged(newValue: any): void;
    openBoolean: boolean;
    open: boolean | string;
    openChanged(): void;
    accordion: boolean | string;
    handleEvent(e: Event): void;
    setContentContainerHeightToAuto(): void;
    bind(): void;
    attached(): void;
    updateContainerHeight(): void;
    toggle(): void;
}
