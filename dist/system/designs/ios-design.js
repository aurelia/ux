System.register(["../colors/swatches", "../colors/shadows"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var swatches_1, shadows_1, IOSDesign;
    return {
        setters: [
            function (swatches_1_1) {
                swatches_1 = swatches_1_1;
            },
            function (shadows_1_1) {
                shadows_1 = shadows_1_1;
            }
        ],
        execute: function () {
            IOSDesign = (function () {
                function IOSDesign() {
                    this.type = 'ios';
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
            exports_1("IOSDesign", IOSDesign);
        }
    };
});
