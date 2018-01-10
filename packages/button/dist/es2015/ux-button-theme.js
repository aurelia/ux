import { swatches } from '@aurelia-ux/core';
export class UxButtonTheme {
    constructor() {
        this.themeKey = 'button';
        this.background = 'var(--ux-design--primary, #3F51B5)';
        this.foreground = 'var(--ux-design--primary-foreground, #fff)';
        this.flatBackground = 'transparent';
        this.flatForeground = 'var(--ux-design--primary, #3F51B5)';
        this.accentBackground = 'var(--ux-design--accent, #FF4081)';
        this.accentForeground = 'var(--ux-design--accent-foreground, #fff)';
        this.accentFlatBackground = 'transparent';
        this.accentFlatForeground = 'var(--ux-design--accent, #FF4081)';
        this.backgroundDisabled = swatches.grey.p500;
        this.foregroundDisabled = swatches.grey.p100;
        this.fontWeight = '500';
        this.fontSize = 'inherit';
        this.letterSpacing = '0.5px';
        this.textTransform = 'uppercase';
    }
}
