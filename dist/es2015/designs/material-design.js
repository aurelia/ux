import { swatches } from '../colors/swatches';
import { shadows } from '../colors/shadows';
export class MaterialDesign {
    constructor() {
        this.type = 'material';
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
        this.elevationNone = shadows.depth_0;
        this.elevation2dp = shadows.depth_2dp;
        this.elevation3dp = shadows.depth_3dp;
        this.elevation4dp = shadows.depth_4dp;
        this.elevation6dp = shadows.depth_6dp;
        this.elevation8dp = shadows.depth_8dp;
        this.elevation16dp = shadows.depth_16dp;
        this.elevation24dp = shadows.depth_24dp;
        this.elevationFocus = shadows.depth_focus;
    }
}
