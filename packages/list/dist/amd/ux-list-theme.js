define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxListTheme = /** @class */ (function () {
        function UxListTheme() {
            this.themeKey = 'list';
            this.listForeground = core_1.swatches.grey.p900;
            this.listSecondaryForeground = core_1.swatches.grey.p700;
            this.listBackground = core_1.swatches.white;
        }
        return UxListTheme;
    }());
    exports.UxListTheme = UxListTheme;
});
