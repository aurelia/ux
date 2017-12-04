import { swatches } from '@aurelia-ux/core';
export class UxRadioTheme {
    constructor() {
        this.themeKey = 'radio';
        this.border = `solid 2px ${swatches.grey.p700}`;
        this.hoverBorder = 'solid 2px var(--ux-design--accent)';
        this.checkedBackground = 'var(--ux-design--accent)';
        this.checkmarkColor = swatches.white;
        this.disabledBorder = `solid 2px ${swatches.grey.p500}`;
        this.disabledBackground = swatches.grey.p500;
        this.disabledForeground = swatches.grey.p300;
    }
}
