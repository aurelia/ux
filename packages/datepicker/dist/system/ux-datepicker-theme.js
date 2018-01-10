System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxDatepickerTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxDatepickerTheme = /** @class */ (function () {
                function UxDatepickerTheme() {
                    this.themeKey = 'datepicker';
                    this.foreground = '#333';
                    this.overlay = 'rgba(0, 0, 0, 0.25)';
                    this.calendarIcon = 'currentColor';
                    // datepicker modal
                    this.headerForeground = 'var(--ux-design--primary-foreground, #FFF)';
                    this.headerBackground = 'var(--ux-design--primary, #3F51B5)';
                    // calendar properties
                    this.weekdayForeground = core_1.swatches.grey.p600;
                    this.selectedDayForeground = 'var(--ux-design--accent-foreground, #FFF)';
                    this.selectedDayBackground = 'var(--ux-design--accent, #FF4081)';
                    this.outOfRangeForeground = core_1.swatches.grey.p600;
                }
                return UxDatepickerTheme;
            }());
            exports_1("UxDatepickerTheme", UxDatepickerTheme);
        }
    };
});
