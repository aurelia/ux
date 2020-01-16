import { ViewResources } from 'aurelia-templating';
import { DatepickerSettings } from './resources/datepicker-settings';
import { Moment } from './resources/moment-rexports';
export declare class UxCalendar {
    resources: ViewResources;
    theme: null;
    weekdays: string[];
    minDate: Moment;
    maxDate: Moment;
    value: Moment;
    config: DatepickerSettings;
    private calendarRows;
    private displayMonth;
    constructor(resources: ViewResources);
    bind(): void;
    previousMonth(): void;
    nextMonth(): void;
    changeCalendarSelection(newDate: Moment): void;
    displayMonthChanged(newDate: Moment): void;
    private isValidDate;
}
