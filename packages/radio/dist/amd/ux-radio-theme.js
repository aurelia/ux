define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxRadioTheme = /** @class */ (function () {
        function UxRadioTheme() {
            this.themeKey = 'radio';
            this.border = "solid 2px " + core_1.swatches.grey.p700;
            this.hoverBorder = 'solid 2px var(--ux-design--accent, #FF4081)';
            this.checkedBackground = 'var(--ux-design--accent, #FF4081)';
            this.checkmarkColor = core_1.swatches.white;
            this.disabledBorder = "solid 2px " + core_1.swatches.grey.p500;
            this.disabledBackground = core_1.swatches.grey.p500;
            this.disabledForeground = core_1.swatches.grey.p300;
        }
        return UxRadioTheme;
    }());
    exports.UxRadioTheme = UxRadioTheme;
});
