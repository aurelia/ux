System.register(['../colors/swatches'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var swatches_1;
    var IOSDesign;
    return {
        setters:[
            function (swatches_1_1) {
                swatches_1 = swatches_1_1;
            }],
        execute: function() {
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
                }
                return IOSDesign;
            }());
            exports_1("IOSDesign", IOSDesign);
        }
    }
});
