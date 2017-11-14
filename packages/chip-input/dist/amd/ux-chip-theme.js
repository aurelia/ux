define(["require", "exports", "@aurelia-ux/core"], function (require, exports, core_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var UxChipTheme = /** @class */ (function () {
        function UxChipTheme() {
            this.themeKey = 'chip';
            this.background = 'var(--ux-design--accent)';
            this.foreground = 'var(--ux-design--accent-foreground)';
            this.deleteBackground = core_1.swatches.grey.p500;
            this.deleteForeground = core_1.swatches.grey.p200;
        }
        return UxChipTheme;
    }());
    exports.UxChipTheme = UxChipTheme;
});
