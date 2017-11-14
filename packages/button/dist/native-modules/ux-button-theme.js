import { swatches } from '@aurelia-ux/core';
var UxButtonTheme = /** @class */ (function () {
    function UxButtonTheme() {
        this.themeKey = 'button';
        this.background = 'var(--ux-design--primary)';
        this.foreground = 'var(--ux-design--primary-foreground)';
        this.flatBackground = 'transparent';
        this.flatForeground = 'var(--ux-design--primary)';
        this.accentBackground = 'var(--ux-design--accent)';
        this.accentForeground = 'var(--ux-design--accent-foreground)';
        this.accentFlatBackground = 'transparent';
        this.accentFlatForeground = 'var(--ux-design--accent)';
        this.backgroundDisabled = swatches.grey.p500;
        this.foregroundDisabled = swatches.grey.p100;
        this.fontWeight = '500';
        this.fontSize = 'inherit';
        this.letterSpacing = '0.5px';
        this.textTransform = 'uppercase';
    }
    return UxButtonTheme;
}());
export { UxButtonTheme };
