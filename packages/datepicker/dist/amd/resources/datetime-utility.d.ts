import { DatepickerSettings } from './datepicker-settings';
import * as moment from 'moment';
export declare class DatetimeUtility {
    /**
     * Checks to see if a date is beyond the min or max set date
     * @param date The date to check
     */
    static dateOutOfRange(date: moment.Moment, minDate: moment.Moment, maxDate: moment.Moment, config: DatepickerSettings): boolean;
}
