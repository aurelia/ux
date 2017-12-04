define(["require", "exports", "./aurelia-ux", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./styles/style-engine", "./aurelia-ux"], function (require, exports, aurelia_ux_1, swatches_1, shadows_1, design_attributes_1, paper_ripple_1, html_attributes_1, style_engine_1, aurelia_ux_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.swatches = swatches_1.swatches;
    exports.shadows = shadows_1.shadows;
    exports.processDesignAttributes = design_attributes_1.processDesignAttributes;
    exports.PaperRipple = paper_ripple_1.PaperRipple;
    exports.normalizeBooleanAttribute = html_attributes_1.normalizeBooleanAttribute;
    exports.StyleEngine = style_engine_1.StyleEngine;
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
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
    exports.configure = configure;
});
