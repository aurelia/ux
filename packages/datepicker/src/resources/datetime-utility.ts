import { DatepickerSettings } from './datepicker-settings';
import * as moment from 'moment';

type Moment = moment.Moment;

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

      if (settings.disableDays &&
        settings.disableDays.some(disabledDate => this.checkDayForDisabled(disabledDate, date))) {
        result = true;
      }
    }

    return result;
  }

  private static checkDayForDisabled(disabledDateConfig: any, date: Moment) {
    if (disabledDateConfig.weekday != null) {
      return disabledDateConfig.weekday === date.weekday();
    }

    if (disabledDateConfig.day || disabledDateConfig.month || disabledDateConfig.year) {
      const disabledDate = { ...disabledDateConfig };

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
