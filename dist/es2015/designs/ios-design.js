import { swatches } from '../colors/swatches';
export class IOSDesign {
    constructor() {
        this.type = 'ios';
        this.primary = swatches.indigo.p500;
        this.primaryForeground = swatches.white;
        this.primaryLight = swatches.indigo.p100;
        this.primaryLightForeground = swatches.grey.p500;
        this.primaryDark = swatches.indigo.p700;
        this.primaryDarkForeground = swatches.white;
        this.accent = swatches.pink.a200;
        this.accentForeground = swatches.white;
        this.accentLight = swatches.pink.a100;
        this.accentLightForeground = swatches.white;
        this.accentDark = swatches.pink.a400;
        this.accentDarkForeground = swatches.white;
    }
}
