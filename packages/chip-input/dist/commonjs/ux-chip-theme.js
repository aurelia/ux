"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aurelia-ux/core");
var UxChipTheme = /** @class */ (function () {
    function UxChipTheme() {
        this.themeKey = 'chip';
        this.background = 'var(--ux-design--accent, #FF4081)';
        this.foreground = 'var(--ux-design--accent-foreground, #FFFFFF)';
        this.deleteBackground = core_1.swatches.grey.p500;
        this.deleteForeground = core_1.swatches.grey.p200;
    }
    return UxChipTheme;
}());
exports.UxChipTheme = UxChipTheme;
