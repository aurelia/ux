import { DatepickerSettings } from './datepicker-settings';
import { Moment } from 'moment';
import * as moment from 'moment';

export class DatetimeUtility {

    /**
     * Checks to see if a date is beyond the min or max set date
     * @param date The date to check
     */
    public static dateOutOfRange(date: Moment, minDate: Moment, maxDate: Moment, config: DatepickerSettings) {
        let result = false;

        if (minDate != null && date.isBefore(minDate, 'day')) {
            result = true;
        }

        if (maxDate != null && date.isAfter(maxDate, 'day')) {
            result = true;
        }

        if (config && config.calendarSettings) {
            const settings = config.calendarSettings;
            if (settings.disableDays != null) {
                if (settings.disableDays.some(disabledDate => {
                    let disabledYear = date.year();

                    if (disabledDate.year != null) {
                        disabledYear = disabledDate.year;
                    } else {
                        disabledYear = date.year();
                    }

                    let parsedVal = moment({ day: disabledDate.day, month: disabledDate.month, year: disabledYear });

                    if (parsedVal.isValid() && parsedVal.isSame(date, 'day')) {
                        return true;
                    }

                    return false;
                })) {
                    result = true;
                }
            }

            if (settings.disableWeekdays != null) {
                if (settings.disableWeekdays.some(disabledDay =>
                    disabledDay.toString() === date.day().toString()
                )) {
                    result = true;
                }
            }
        }

        return result;
    }
}
