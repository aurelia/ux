import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipInputTheme } from './ux-chip-input-theme';
export declare class UxChipInput implements UxComponent {
    private element;
    private styleEngine;
    disabled: boolean | string;
    readonly: boolean | string;
    theme: UxChipInputTheme;
    label: any;
    separator: string;
    value: any;
    chips: string[];
    private textbox;
    private chiprepeat;
    private tagrepeat;
    constructor(element: HTMLElement, styleEngine: StyleEngine);
    bind(): void;
    attached(): void;
    detached(): void;
    handleKeyup(event: KeyboardEvent): void;
    addChip(): void;
    editChip(value: string): void;
    removeChip(value: string): void;
    chipsChanged(): void;
    valueChanged(newValue: string): void;
    disabledChanged(newValue: boolean | string): void;
    readonlyChanged(newValue: boolean | string): void;
    themeChanged(newValue: UxChipInputTheme): void;
}
