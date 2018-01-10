import { swatches } from '@aurelia-ux/core';
export class UxChipTheme {
    constructor() {
        this.themeKey = 'chip';
        this.background = 'var(--ux-design--accent, #FF4081)';
        this.foreground = 'var(--ux-design--accent-foreground, #FFFFFF)';
        this.deleteBackground = swatches.grey.p500;
        this.deleteForeground = swatches.grey.p200;
    }
}
