"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var swatches_1 = require("../colors/swatches");
var shadows_1 = require("../colors/shadows");
var IOSDesign = /** @class */ (function () {
    function IOSDesign() {
        this.type = 'ios';
        this.appBackground = swatches_1.swatches.grey.p50;
        this.appForeground = swatches_1.swatches.grey.p900;
        this.surfaceBackground = swatches_1.swatches.grey.p100;
        this.surfaceForeground = swatches_1.swatches.grey.p900;
        this.controlBackground = swatches_1.swatches.grey.p300;
        this.controlForeground = swatches_1.swatches.grey.p900;
        this.controlLabelColor = swatches_1.swatches.grey.p600;
        this.primary = swatches_1.swatches.indigo.p500;
        this.primaryForeground = swatches_1.swatches.white;
        this.primaryLight = swatches_1.swatches.indigo.p100;
        this.primaryLightForeground = swatches_1.swatches.grey.p500;
        this.primaryDark = swatches_1.swatches.indigo.p700;
        this.primaryDarkForeground = swatches_1.swatches.white;
        this.accent = swatches_1.swatches.pink.a200;
        this.accentForeground = swatches_1.swatches.white;
        this.accentLight = swatches_1.swatches.pink.a100;
        this.accentLightForeground = swatches_1.swatches.white;
        this.accentDark = swatches_1.swatches.pink.a400;
        this.accentDarkForeground = swatches_1.swatches.white;
        this.disabledBackground = swatches_1.swatches.grey.p500;
        this.disabledForeground = swatches_1.swatches.blueGrey.p100;
        this.error = swatches_1.swatches.red.p500;
        this.onError = swatches_1.swatches.white;
        this.elevationNone = shadows_1.shadows.depth_0;
        this.elevation2dp = shadows_1.shadows.depth_2dp;
        this.elevation3dp = shadows_1.shadows.depth_3dp;
        this.elevation4dp = shadows_1.shadows.depth_4dp;
        this.elevation6dp = shadows_1.shadows.depth_6dp;
        this.elevation8dp = shadows_1.shadows.depth_8dp;
        this.elevation16dp = shadows_1.shadows.depth_16dp;
        this.elevation24dp = shadows_1.shadows.depth_24dp;
        this.elevationFocus = shadows_1.shadows.depth_focus;
    }
    return IOSDesign;
}());
exports.IOSDesign = IOSDesign;
//# sourceMappingURL=ios-design.js.map