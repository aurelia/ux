System.register(['../colors/swatches'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var swatches_1;
    var MaterialDesign;
    return {
        setters:[
            function (swatches_1_1) {
                swatches_1 = swatches_1_1;
            }],
        execute: function() {
            MaterialDesign = (function () {
                function MaterialDesign() {
                    this.type = 'material';
                    this.p1 = swatches_1.swatches.blue.p500;
                    this.p2 = swatches_1.swatches.blue.p100;
                    this.p3 = swatches_1.swatches.blue.p400;
                    this.a1 = swatches_1.swatches.pink.a200;
                    this.a2 = swatches_1.swatches.pink.a100;
                    this.a3 = swatches_1.swatches.pink.a400;
                }
                return MaterialDesign;
            }());
            exports_1("MaterialDesign", MaterialDesign);
        }
    }
});
