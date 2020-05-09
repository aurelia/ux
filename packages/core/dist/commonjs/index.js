"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_ux_1 = require("./aurelia-ux");
var boolean_attr_binding_behavior_1 = require("./components/boolean-attr-binding-behavior");
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
var background_color_parent_1 = require("./components/background-color-parent");
exports.getBackgroundColorThroughParents = background_color_parent_1.getBackgroundColorThroughParents;
var ux_choice_attribute_1 = require("./components/ux-choice-attribute");
exports.UxChoiceAttribute = ux_choice_attribute_1.UxChoiceAttribute;
var ux_choice_container_attribute_1 = require("./components/ux-choice-container-attribute");
exports.UxChoiceContainerAttribute = ux_choice_container_attribute_1.UxChoiceContainerAttribute;
var style_engine_1 = require("./styles/style-engine");
exports.StyleEngine = style_engine_1.StyleEngine;
var global_style_engine_1 = require("./styles/global-style-engine");
exports.GlobalStyleEngine = global_style_engine_1.GlobalStyleEngine;
var aurelia_ux_2 = require("./aurelia-ux");
exports.AureliaUX = aurelia_ux_2.AureliaUX;
var ux_configuration_1 = require("./ux-configuration");
exports.UXConfiguration = ux_configuration_1.UXConfiguration;
var uxCorePromise;
function configure(config, callback) {
    if (uxCorePromise) {
        return uxCorePromise;
    }
    var ux = config.container.get(aurelia_ux_1.AureliaUX);
    var boolAttr = new aurelia_framework_1.BindingBehaviorResource('');
    boolAttr.initialize(config.container, boolean_attr_binding_behavior_1.BooleanBB);
    boolAttr.register(config.aurelia.resources, 'booleanAttr');
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./components/ux-choice-attribute'),
        aurelia_framework_1.PLATFORM.moduleName('./components/ux-choice-container-attribute')
    ]);
    if (typeof callback === 'function') {
        return uxCorePromise = Promise.resolve(callback(ux))
            .then(function () { return ux.start(config); });
    }
    else {
        ux.use.defaultConfiguration();
        return uxCorePromise = ux.start(config);
    }
}
exports.configure = configure;
//# sourceMappingURL=index.js.map