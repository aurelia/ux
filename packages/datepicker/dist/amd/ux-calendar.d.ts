import { ViewResources } from 'aurelia-templating';
import { DatepickerSettings } from './resources/datepicker-settings';
import * as moment from 'moment';
export declare class UxCalendar {
    resources: ViewResources;
    theme: null;
    weekdays: string[];
    minDate: moment.Moment;
    maxDate: moment.Moment;
    value: moment.Moment;
    config: DatepickerSettings;
    private calendarRows;
    private displayMonth;
    constructor(resources: ViewResources);
    bind(): void;
    previousMonth(): void;
    nextMonth(): void;
    changeCalendarSelection(newDate: moment.Moment): void;
    displayMonthChanged(newDate: moment.Moment): void;
    private isValidDate;
}
