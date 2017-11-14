"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
var aurelia_ux_2 = require("./aurelia-ux");
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
