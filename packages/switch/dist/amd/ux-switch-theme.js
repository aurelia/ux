define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxSwitchTheme = /** @class */ (function () {
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
    exports.UxSwitchTheme = UxSwitchTheme;
});
