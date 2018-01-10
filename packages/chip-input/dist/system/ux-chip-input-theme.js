System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UxChipInputTheme;
    return {
        setters: [],
        execute: function () {
            UxChipInputTheme = /** @class */ (function () {
                function UxChipInputTheme() {
                    this.themeKey = 'chip-input';
                    this.foreground = 'var(--ux-design--primary-light-foreground, #9E9E9E)';
                }
                return UxChipInputTheme;
            }());
            exports_1("UxChipInputTheme", UxChipInputTheme);
        }
    };
});
