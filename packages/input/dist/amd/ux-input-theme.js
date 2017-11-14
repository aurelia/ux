define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxInputTheme = /** @class */ (function () {
        function UxInputTheme() {
            this.themeKey = 'input';
            this.foreground = core_1.swatches.grey.p900;
            this.background = 'transparent';
            this.borderBottom = "1px solid " + core_1.swatches.grey.p500;
            this.borderBottomHover = '1px solid var(--ux-design--accent)';
            this.borderBottomSelected = '';
            this.diabledForeground = core_1.swatches.grey.p500;
            this.disabledBorderBottom = "1px dashed " + core_1.swatches.grey.p300;
            this.fullWidthBorder = "1px solid " + core_1.swatches.grey.p200;
            this.fullWidthBackground = core_1.swatches.white;
            this.fullWidthBackgroundDisabled = core_1.swatches.grey.p200;
            this.error = core_1.swatches.red.p500;
        }
        return UxInputTheme;
    }());
    exports.UxInputTheme = UxInputTheme;
});
