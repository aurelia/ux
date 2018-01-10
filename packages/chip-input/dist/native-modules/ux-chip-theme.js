import { swatches } from '@aurelia-ux/core';
var UxChipTheme = /** @class */ (function () {
    function UxChipTheme() {
        this.themeKey = 'chip';
        this.background = 'var(--ux-design--accent, #FF4081)';
        this.foreground = 'var(--ux-design--accent-foreground, #FFFFFF)';
        this.deleteBackground = swatches.grey.p500;
        this.deleteForeground = swatches.grey.p200;
    }
    return UxChipTheme;
}());
export { UxChipTheme };
