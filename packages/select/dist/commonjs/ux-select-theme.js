"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@aurelia-ux/core");
var UxSelectTheme = /** @class */ (function () {
    function UxSelectTheme() {
        this.themeKey = 'select';
        this.foreground = core_1.swatches.grey.p500;
        this.background = 'transparent';
        this.triggerBorder = "1px solid " + core_1.swatches.grey.p500;
        this.triggerBorderDisabled = "1px solid " + core_1.swatches.grey.p400;
        this.triggerBorderFocused = "1px solid " + core_1.swatches.grey.p600;
        this.listMaxWidth = 250;
        this.listMaxWidthPx = '250px';
        this.listMaxHeight = 400;
        this.listMaxHeightPx = '400px';
        this.listBackground = core_1.swatches.white;
        this.listTransition = 125;
        this.listTransitionS = '0.125s';
        this.optionHover = core_1.swatches.grey.p300;
        this.optionFocused = core_1.swatches.grey.p300;
        this.optionSelected = core_1.swatches.grey.p400;
        this.borderBottom = "1px solid " + core_1.swatches.grey.p500;
        this.borderBottomHover = '1px solid var(--ux-design--accent)';
        this.borderBottomSelected = '';
        this.listboxShadow = 'rgba(0, 0, 0, 0.12)';
        this.error = core_1.swatches.red.p500;
    }
    return UxSelectTheme;
}());
exports.UxSelectTheme = UxSelectTheme;
