import { swatches } from '@aurelia-ux/core';
var UxChipTheme = /** @class */ (function () {
    function UxChipTheme() {
        this.themeKey = 'chip';
        this.background = 'var(--ux-design--accent)';
        this.foreground = 'var(--ux-design--accent-foreground)';
        this.deleteBackground = swatches.grey.p500;
        this.deleteForeground = swatches.grey.p200;
    }
    return UxChipTheme;
}());
export { UxChipTheme };
