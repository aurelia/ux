import { swatches } from '../colors/swatches';
import { shadows } from '../colors/shadows';
var MaterialDesign = /** @class */ (function () {
    function MaterialDesign() {
        this.type = 'material';
        this.appBackground = swatches.grey.p50;
        this.appForeground = swatches.grey.p900;
        this.surfaceBackground = swatches.grey.p100;
        this.surfaceForeground = swatches.grey.p900;
        this.controlBackground = swatches.grey.p300;
        this.controlForeground = swatches.grey.p900;
        this.controlLabelColor = swatches.grey.p600;
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
        this.disabledBackground = swatches.grey.p500;
        this.disabledForeground = swatches.blueGrey.p100;
        this.error = swatches.red.p500;
        this.onError = swatches.white;
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
    return MaterialDesign;
}());
export { MaterialDesign };
//# sourceMappingURL=material-design.js.map