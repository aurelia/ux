define(["require", "exports", "aurelia-framework", "./aurelia-ux", "./components/boolean-attr-binding-behavior", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./components/background-color-parent", "./components/ux-choice-attribute", "./components/ux-choice-container-attribute", "./styles/style-engine", "./styles/global-style-engine", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_framework_1, aurelia_ux_1, boolean_attr_binding_behavior_1, swatches_1, shadows_1, design_attributes_1, paper_ripple_1, html_attributes_1, background_color_parent_1, ux_choice_attribute_1, ux_choice_container_attribute_1, style_engine_1, global_style_engine_1, aurelia_ux_2, ux_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.swatches = swatches_1.swatches;
    exports.shadows = shadows_1.shadows;
    exports.processDesignAttributes = design_attributes_1.processDesignAttributes;
    exports.PaperRipple = paper_ripple_1.PaperRipple;
    exports.normalizeBooleanAttribute = html_attributes_1.normalizeBooleanAttribute;
    exports.getBackgroundColorThroughParents = background_color_parent_1.getBackgroundColorThroughParents;
    exports.UxChoiceAttribute = ux_choice_attribute_1.UxChoiceAttribute;
    exports.UxChoiceContainerAttribute = ux_choice_container_attribute_1.UxChoiceContainerAttribute;
    exports.StyleEngine = style_engine_1.StyleEngine;
    exports.GlobalStyleEngine = global_style_engine_1.GlobalStyleEngine;
    exports.AureliaUX = aurelia_ux_2.AureliaUX;
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
});
//# sourceMappingURL=index.js.map