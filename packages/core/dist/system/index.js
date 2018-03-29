System.register(["aurelia-framework", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./styles/style-engine", "./styles/global-style-engine", "./ux-configuration"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config, callback) {
        var ux = config.container.get(aurelia_ux_1.AureliaUX);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./components/boolean-attr-binding-behavior')
        ]);
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
    var aurelia_framework_1, aurelia_ux_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
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
            },
            function (global_style_engine_1_1) {
                exports_1({
                    "GlobalStyleEngine": global_style_engine_1_1["GlobalStyleEngine"]
                });
            },
            function (ux_configuration_1_1) {
                exports_1({
                    "UXConfiguration": ux_configuration_1_1["UXConfiguration"]
                });
            }
        ],
        execute: function () {
        }
    };
});
