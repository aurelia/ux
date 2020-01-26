import { ViewResources } from 'aurelia-templating';
import { DatepickerSettings } from './resources/datepicker-settings';
import { Moment } from './resources/moment-rexports';
export declare class UxPickerDialog {
    resources: ViewResources;
    theme: null;
    type: string;
    display: string;
    weekdays: any;
    config: DatepickerSettings;
    initialDate: any;
    minDate: Moment;
    maxDate: Moment;
    value: Date | null;
    closeDialog: () => {};
    private selectedDate;
    constructor(resources: ViewResources);
    bind(): void;
    valueChanged(newDate: Date): void;
    selectDate(): void;
    changeView(view: string): void;
}
