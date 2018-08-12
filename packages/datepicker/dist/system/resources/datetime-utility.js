System.register(["moment"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var moment, DatetimeUtility;
    return {
        setters: [
            function (moment_1) {
                moment = moment_1;
            }
        ],
        execute: function () {
            DatetimeUtility = /** @class */ (function () {
                function DatetimeUtility() {
                }
                /**
                 * Checks to see if a date is beyond the min or max set date
                 * @param date The date to check
                 */
                DatetimeUtility.dateOutOfRange = function (date, minDate, maxDate, config) {
                    var result = false;
                    if (minDate != null && date.isBefore(minDate, 'day')) {
                        result = true;
                    }
                    if (maxDate != null && date.isAfter(maxDate, 'day')) {
                        result = true;
                    }
                    if (config && config.calendarSettings) {
                        var settings = config.calendarSettings;
                        if (settings.disableDays != null) {
                            if (settings.disableDays.some(function (disabledDate) {
                                var disabledYear = date.year();
                                if (disabledDate.year != null) {
                                    disabledYear = disabledDate.year;
                                }
                                var parsedVal = moment({ day: disabledDate.day, month: disabledDate.month, year: disabledYear });
                                if (parsedVal.isValid() && parsedVal.isSame(date, 'day')) {
                                    return true;
                                }
                                return false;
                            })) {
                                result = true;
                            }
                        }
                        if (settings.disableWeekdays != null) {
                            if (settings.disableWeekdays.some(function (disabledDay) {
                                return disabledDay.toString() === date.day().toString();
                            })) {
                                result = true;
                            }
                        }
                    }
                    return result;
                };
                return DatetimeUtility;
            }());
            exports_1("DatetimeUtility", DatetimeUtility);
        }
    };
});
