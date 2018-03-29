"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_ux_1 = require("./aurelia-ux");
var swatches_1 = require("./colors/swatches");
exports.swatches = swatches_1.swatches;
var shadows_1 = require("./colors/shadows");
exports.shadows = shadows_1.shadows;
var design_attributes_1 = require("./designs/design-attributes");
exports.processDesignAttributes = design_attributes_1.processDesignAttributes;
var paper_ripple_1 = require("./effects/paper-ripple");
exports.PaperRipple = paper_ripple_1.PaperRipple;
var html_attributes_1 = require("./components/html-attributes");
exports.normalizeBooleanAttribute = html_attributes_1.normalizeBooleanAttribute;
var style_engine_1 = require("./styles/style-engine");
exports.StyleEngine = style_engine_1.StyleEngine;
var global_style_engine_1 = require("./styles/global-style-engine");
exports.GlobalStyleEngine = global_style_engine_1.GlobalStyleEngine;
var aurelia_ux_2 = require("./aurelia-ux");
exports.AureliaUX = aurelia_ux_2.AureliaUX;
var ux_configuration_1 = require("./ux-configuration");
exports.UXConfiguration = ux_configuration_1.UXConfiguration;
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
exports.configure = configure;
