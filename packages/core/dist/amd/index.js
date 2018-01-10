define(["require", "exports", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./styles/style-engine", "./styles/global-style-engine", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_ux_1, swatches_1, shadows_1, design_attributes_1, paper_ripple_1, html_attributes_1, style_engine_1, global_style_engine_1, aurelia_ux_2, ux_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.swatches = swatches_1.swatches;
    exports.shadows = shadows_1.shadows;
    exports.processDesignAttributes = design_attributes_1.processDesignAttributes;
    exports.PaperRipple = paper_ripple_1.PaperRipple;
    exports.normalizeBooleanAttribute = html_attributes_1.normalizeBooleanAttribute;
    exports.StyleEngine = style_engine_1.StyleEngine;
    exports.GlobalStyleEngine = global_style_engine_1.GlobalStyleEngine;
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
    exports.UXConfiguration = ux_configuration_1.UXConfiguration;
    function configure(config, callback) {
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
    exports.configure = configure;
});
