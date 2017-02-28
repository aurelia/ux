System.register(['./aurelia-ux', './colors/swatches', './colors/shadows', './button/ux-button-theme', './styles/decorators', './ux-configuration'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var aurelia_ux_1;
    function configure(config, callback) {
        config.globalResources([
            './button/ux-button'
        ]);
        var ux = config.container.get(aurelia_ux_1.AureliaUX);
        if (typeof callback === 'function') {
            return Promise.resolve(callback(ux))
                .then(function () { return ux.start(config); });
        }
        else {
            ux.use.defaultConfiguration();
            return ux.start(config);
        }
    }
    exports_1("configure", configure);
    var exportedNames_1 = {
        'configure': true,
        'swatches': true,
        'shadows': true,
        'UxButtonTheme': true,
        'AureliaUX': true,
        'UXConfiguration': true
    };
    function exportStar_1(m) {
        var exports = {};
        for(var n in m) {
            if (n !== "default"&& !exportedNames_1.hasOwnProperty(n)) exports[n] = m[n];
        }
        exports_1(exports);
    }
    return {
        setters:[
            function (aurelia_ux_1_1) {
                aurelia_ux_1 = aurelia_ux_1_1;
                exports_1({
                    "AureliaUX": aurelia_ux_1_1["AureliaUX"]
                });
            },
            function (swatches_1_1) {
                exports_1({
                    "swatches": swatches_1_1["swatches"]
                });
            },
            function (shadows_1_1) {
                exports_1({
                    "shadows": shadows_1_1["shadows"]
                });
            },
            function (ux_button_theme_1_1) {
                exports_1({
                    "UxButtonTheme": ux_button_theme_1_1["UxButtonTheme"]
                });
            },
            function (decorators_1_1) {
                exportStar_1(decorators_1_1);
            },
            function (ux_configuration_1_1) {
                exports_1({
                    "UXConfiguration": ux_configuration_1_1["UXConfiguration"]
                });
            }],
        execute: function() {
        }
    }
});
