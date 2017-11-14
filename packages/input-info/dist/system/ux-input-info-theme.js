System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxInputInfoTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxInputInfoTheme = /** @class */ (function () {
                function UxInputInfoTheme() {
                    this.themeKey = 'input-info';
                    this.foreground = core_1.swatches.grey.p600;
                    this.error = core_1.swatches.red.p500;
                }
                return UxInputInfoTheme;
            }());
            exports_1("UxInputInfoTheme", UxInputInfoTheme);
        }
    };
});
