System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxFormTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxFormTheme = /** @class */ (function () {
                function UxFormTheme() {
                    this.themeKey = 'form';
                    this.labelFontSize = '14px';
                    this.labelColor = core_1.swatches.grey.p500;
                }
                return UxFormTheme;
            }());
            exports_1("UxFormTheme", UxFormTheme);
        }
    };
});
