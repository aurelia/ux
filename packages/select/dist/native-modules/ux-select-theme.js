import { swatches } from '@aurelia-ux/core';
var UxSelectTheme = /** @class */ (function () {
    function UxSelectTheme() {
        this.themeKey = 'select';
        this.foreground = swatches.grey.p500;
        this.background = 'transparent';
        this.triggerBorder = "1px solid " + swatches.grey.p500;
        this.triggerBorderDisabled = "1px solid " + swatches.grey.p400;
        this.triggerBorderFocused = "1px solid " + swatches.grey.p600;
        this.listMaxWidth = 250;
        this.listMaxWidthPx = '250px';
        this.listMaxHeight = 400;
        this.listMaxHeightPx = '400px';
        this.listBackground = swatches.white;
        this.listTransition = 125;
        this.listTransitionS = '0.125s';
        this.optionHover = swatches.grey.p300;
        this.optionFocused = swatches.grey.p300;
        this.optionSelected = swatches.grey.p400;
        this.borderBottom = "1px solid " + swatches.grey.p500;
        this.borderBottomHover = '1px solid var(--aurelia-ux--design-accent)';
        this.borderBottomSelected = '';
        this.listboxShadow = 'rgba(0, 0, 0, 0.12)';
        this.error = swatches.red.p500;
    }
    return UxSelectTheme;
}());
export { UxSelectTheme };
