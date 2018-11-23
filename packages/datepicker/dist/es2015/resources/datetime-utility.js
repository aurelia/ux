import * as moment from 'moment';
export class DatetimeUtility {
    /**
     * Checks to see if a date is beyond the min or max set date
     * @param date The date to check
     */
    static dateOutOfRange(date, minDate, maxDate, config) {
        let result = false;
        if (minDate != null && date.isBefore(minDate, 'day')) {
            result = true;
        }
        if (maxDate != null && date.isAfter(maxDate, 'day')) {
            result = true;
        }
        if (config && config.calendarSettings) {
            const settings = config.calendarSettings;
            if (settings.disableDays &&
                settings.disableDays.some(disabledDate => this.checkDayForDisabled(disabledDate, date))) {
                result = true;
            }
        }
        return result;
    }
    static checkDayForDisabled(disabledDateConfig, date) {
        if (disabledDateConfig.weekday != null) {
            return disabledDateConfig.weekday === date.weekday();
        }
        if (disabledDateConfig.day || disabledDateConfig.month || disabledDateConfig.year) {
            const disabledDate = Object.assign({}, disabledDateConfig);
            if (disabledDate.year == null) {
                disabledDate.year = date.year();
            }
            if (disabledDate.day == null) {
                disabledDate.day = date.date();
            }
            if (disabledDate.month == null) {
                disabledDate.month = date.month() + 1;
            }
            const parsedVal = moment(`${disabledDate.month}-${disabledDate.day}-${disabledDate.year}`);
            return parsedVal.isValid() && parsedVal.isSame(date, 'day');
        }
        return false;
    }
}
