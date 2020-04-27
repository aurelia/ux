System.register(["./interfaces", "./ux-positioning"], function (exports_1, context_1) {
    "use strict";
    var interfaces_1;
    var __moduleName = context_1 && context_1.id;
    function configure(frameworkConfig, callback) {
        // config.globalResources([
        //   PLATFORM.moduleName('@aurelia-ux/boilerplate/ux-boilerplate')
        // ]);
        if (typeof callback === 'function') {
            var config = frameworkConfig.container.get(interfaces_1.UxPositioningConfiguration);
            callback(config);
        }
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        "configure": true
    };
    function exportStar_1(m) {
        var exports = {};
        for (var n in m) {
            if (n !== "default" && !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters: [
            function (interfaces_1_1) {
                interfaces_1 = interfaces_1_1;
                exportStar_1(interfaces_1_1);
            },
            function (ux_positioning_1_1) {
                exportStar_1(ux_positioning_1_1);
            }
        ],
        execute: function () {
        }
    };
});
