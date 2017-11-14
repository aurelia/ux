import { swatches } from '@aurelia-ux/core';
export class UxChipTheme {
    constructor() {
        this.themeKey = 'chip';
        this.background = 'var(--ux-design--accent)';
        this.foreground = 'var(--ux-design--accent-foreground)';
        this.deleteBackground = swatches.grey.p500;
        this.deleteForeground = swatches.grey.p200;
    }
}
