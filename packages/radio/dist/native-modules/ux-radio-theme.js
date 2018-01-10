import { swatches } from '@aurelia-ux/core';
var UxRadioTheme = /** @class */ (function () {
    function UxRadioTheme() {
        this.themeKey = 'radio';
        this.border = "solid 2px " + swatches.grey.p700;
        this.hoverBorder = 'solid 2px var(--ux-design--accent, #FF4081)';
        this.checkedBackground = 'var(--ux-design--accent, #FF4081)';
        this.checkmarkColor = swatches.white;
        this.disabledBorder = "solid 2px " + swatches.grey.p500;
        this.disabledBackground = swatches.grey.p500;
        this.disabledForeground = swatches.grey.p300;
    }
    return UxRadioTheme;
}());
export { UxRadioTheme };
