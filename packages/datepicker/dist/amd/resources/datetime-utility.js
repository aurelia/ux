define(["require", "exports", "tslib", "./moment-rexports"], function (require, exports, tslib_1, moment_rexports_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DatetimeUtility = void 0;
    var DatetimeUtility = /** @class */ (function () {
        function DatetimeUtility() {
        }
        /**
         * Checks to see if a date is beyond the min or max set date
         * @param date The date to check
         */
        DatetimeUtility.dateOutOfRange = function (date, minDate, maxDate, config) {
            var _this = this;
            var result = false;
            if (minDate != null && date.isBefore(minDate, 'day')) {
                result = true;
            }
            if (maxDate != null && date.isAfter(maxDate, 'day')) {
                result = true;
            }
            if (config && config.calendarSettings) {
                var settings = config.calendarSettings;
                if (settings.disableDays &&
                    settings.disableDays.some(function (disabledDate) { return _this.checkDayForDisabled(disabledDate, date); })) {
                    result = true;
                }
            }
            return result;
        };
        DatetimeUtility.checkDayForDisabled = function (disabledDateConfig, date) {
            if (disabledDateConfig.weekday != null) {
                return disabledDateConfig.weekday === date.weekday();
            }
            if (disabledDateConfig.day || disabledDateConfig.month || disabledDateConfig.year) {
                var disabledDate = tslib_1.__assign({}, disabledDateConfig);
                if (disabledDate.year == null) {
                    disabledDate.year = date.year();
                }
                if (disabledDate.day == null) {
                    disabledDate.day = date.date();
                }
                if (disabledDate.month == null) {
                    disabledDate.month = date.month() + 1;
                }
                var parsedVal = moment_rexports_1.moment(disabledDate.month + "-" + disabledDate.day + "-" + disabledDate.year);
                return parsedVal.isValid() && parsedVal.isSame(date, 'day');
            }
            return false;
        };
        return DatetimeUtility;
    }());
    exports.DatetimeUtility = DatetimeUtility;
});
//# sourceMappingURL=datetime-utility.js.map