System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxSwitchTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxSwitchTheme = /** @class */ (function () {
                function UxSwitchTheme() {
                    this.themeKey = 'switch';
                    this.track = core_1.swatches.grey.p300;
                    this.indicator = core_1.swatches.white;
                    this.trackActive = 'var(--ux-design--accent-light)';
                    this.indicatorActive = 'var(--ux-design--accent)';
                    this.trackDisabled = core_1.swatches.grey.p500;
                    this.indicatorDisabled = core_1.swatches.grey.p300;
                }
                return UxSwitchTheme;
            }());
            exports_1("UxSwitchTheme", UxSwitchTheme);
        }
    };
});
