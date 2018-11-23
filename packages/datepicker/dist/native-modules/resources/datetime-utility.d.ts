import { DatepickerSettings } from './datepicker-settings';
import * as moment from 'moment';
declare type Moment = moment.Moment;
export declare class DatetimeUtility {
    /**
     * Checks to see if a date is beyond the min or max set date
     * @param date The date to check
     */
    static dateOutOfRange(date: Moment, minDate: Moment, maxDate: Moment, config: DatepickerSettings): boolean;
    private static checkDayForDisabled;
}
export {};
