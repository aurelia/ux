import { ViewResources } from 'aurelia-templating';
import { DatepickerSettings } from './resources/datepicker-settings';
import * as moment from 'moment';
export declare class UxPickerDialog {
    resources: ViewResources;
    theme: null;
    type: string;
    display: string;
    weekdays: any;
    config: DatepickerSettings;
    initialDate: any;
    minDate: moment.Moment;
    maxDate: moment.Moment;
    value: Date | null;
    closeDialog: () => {};
    private selectedDate;
    constructor(resources: ViewResources);
    bind(): void;
    valueChanged(newDate: Date): void;
    selectDate(): void;
    changeView(view: string): void;
}
