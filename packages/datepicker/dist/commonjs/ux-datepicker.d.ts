import { ViewResources } from 'aurelia-templating';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { DatepickerSettings } from './resources/datepicker-settings';
import { UxDatepickerTheme } from './ux-datepicker-theme';
export declare class UxDatepicker implements UxComponent {
    element: HTMLElement;
    resources: ViewResources;
    styleEngine: StyleEngine;
    theme: UxDatepickerTheme;
    display: string;
    type: string;
    initialDate: any;
    minTime: any;
    maxTime: any;
    minDate: any;
    maxDate: any;
    placeholder: any;
    config: DatepickerSettings;
    formatters: {
        date: string;
        time: string;
        datetime: string;
    };
    parsers: {
        time: string[];
    };
    value: any;
    textbox: HTMLInputElement;
    private textboxValue;
    private showDialog;
    constructor(element: HTMLElement, resources: ViewResources, styleEngine: StyleEngine);
    bind(): void;
    toggleDialog(display: string): void;
    changeTextboxValue(): void;
    valueChanged(newValue: Date): void;
    minDateChanged(newValue: any): void;
    maxDateChanged(newValue: any): void;
    minTimeChanged(newValue: any): void;
    maxTimeChanged(newValue: any): void;
    themeChanged(newValue: any): void;
    private processAttribute;
}
