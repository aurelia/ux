System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxListTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxListTheme = /** @class */ (function () {
                function UxListTheme() {
                    this.themeKey = 'list';
                    this.listForeground = core_1.swatches.grey.p900;
                    this.listSecondaryForeground = core_1.swatches.grey.p700;
                    this.listBackground = core_1.swatches.white;
                }
                return UxListTheme;
            }());
            exports_1("UxListTheme", UxListTheme);
        }
    };
});
