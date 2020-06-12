"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var aurelia_ux_1 = require("./aurelia-ux");
var boolean_attr_binding_behavior_1 = require("./components/boolean-attr-binding-behavior");
var ux_size_attribute_1 = require("./attributes/ux-size-attribute");
Object.defineProperty(exports, "UxSizeCustomAttribute", { enumerable: true, get: function () { return ux_size_attribute_1.UxSizeCustomAttribute; } });
var swatches_1 = require("./colors/swatches");
Object.defineProperty(exports, "swatches", { enumerable: true, get: function () { return swatches_1.swatches; } });
var shadows_1 = require("./colors/shadows");
Object.defineProperty(exports, "shadows", { enumerable: true, get: function () { return shadows_1.shadows; } });
var design_attributes_1 = require("./designs/design-attributes");
Object.defineProperty(exports, "processDesignAttributes", { enumerable: true, get: function () { return design_attributes_1.processDesignAttributes; } });
var paper_ripple_1 = require("./effects/paper-ripple");
Object.defineProperty(exports, "PaperRipple", { enumerable: true, get: function () { return paper_ripple_1.PaperRipple; } });
var html_attributes_1 = require("./components/html-attributes");
Object.defineProperty(exports, "normalizeBooleanAttribute", { enumerable: true, get: function () { return html_attributes_1.normalizeBooleanAttribute; } });
Object.defineProperty(exports, "normalizeNumberAttribute", { enumerable: true, get: function () { return html_attributes_1.normalizeNumberAttribute; } });
var background_color_parent_1 = require("./components/background-color-parent");
Object.defineProperty(exports, "getBackgroundColorThroughParents", { enumerable: true, get: function () { return background_color_parent_1.getBackgroundColorThroughParents; } });
var ux_choice_attribute_1 = require("./components/ux-choice-attribute");
Object.defineProperty(exports, "UxChoiceAttribute", { enumerable: true, get: function () { return ux_choice_attribute_1.UxChoiceAttribute; } });
var ux_choice_container_attribute_1 = require("./components/ux-choice-container-attribute");
Object.defineProperty(exports, "UxChoiceContainerAttribute", { enumerable: true, get: function () { return ux_choice_container_attribute_1.UxChoiceContainerAttribute; } });
var style_engine_1 = require("./styles/style-engine");
Object.defineProperty(exports, "StyleEngine", { enumerable: true, get: function () { return style_engine_1.StyleEngine; } });
var global_style_engine_1 = require("./styles/global-style-engine");
Object.defineProperty(exports, "GlobalStyleEngine", { enumerable: true, get: function () { return global_style_engine_1.GlobalStyleEngine; } });
var aurelia_ux_2 = require("./aurelia-ux");
Object.defineProperty(exports, "AureliaUX", { enumerable: true, get: function () { return aurelia_ux_2.AureliaUX; } });
var ux_configuration_1 = require("./ux-configuration");
Object.defineProperty(exports, "UXConfiguration", { enumerable: true, get: function () { return ux_configuration_1.UXConfiguration; } });
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
        aurelia_framework_1.PLATFORM.moduleName('./attributes/ux-size-attribute'),
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