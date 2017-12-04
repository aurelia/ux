System.register(["./aurelia-ux", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./styles/style-engine"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config, callback) {
        var ux = config.container.get(aurelia_ux_1.AureliaUX);
        if (typeof callback === 'function') {
            return Promise.resolve(callback(ux))
                .then(function () { return ux.start(config); });
        }
        else {
            return ux.start(config);
        }
    }
    exports_1("configure", configure);
    var aurelia_ux_1;
    return {
        setters: [
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
            function (design_attributes_1_1) {
                exports_1({
                    "processDesignAttributes": design_attributes_1_1["processDesignAttributes"]
                });
            },
            function (paper_ripple_1_1) {
                exports_1({
                    "PaperRipple": paper_ripple_1_1["PaperRipple"]
                });
            },
            function (html_attributes_1_1) {
                exports_1({
                    "normalizeBooleanAttribute": html_attributes_1_1["normalizeBooleanAttribute"]
                });
            },
            function (style_engine_1_1) {
                exports_1({
                    "StyleEngine": style_engine_1_1["StyleEngine"]
                });
            }
        ],
        execute: function () {
        }
    };
});
