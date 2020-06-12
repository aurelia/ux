define(["require", "exports", "aurelia-framework", "./aurelia-ux", "./components/boolean-attr-binding-behavior", "./attributes/ux-size-attribute", "./colors/swatches", "./colors/shadows", "./designs/design-attributes", "./effects/paper-ripple", "./components/html-attributes", "./components/background-color-parent", "./components/ux-choice-attribute", "./components/ux-choice-container-attribute", "./styles/style-engine", "./styles/global-style-engine", "./aurelia-ux", "./ux-configuration"], function (require, exports, aurelia_framework_1, aurelia_ux_1, boolean_attr_binding_behavior_1, ux_size_attribute_1, swatches_1, shadows_1, design_attributes_1, paper_ripple_1, html_attributes_1, background_color_parent_1, ux_choice_attribute_1, ux_choice_container_attribute_1, style_engine_1, global_style_engine_1, aurelia_ux_2, ux_configuration_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxSizeCustomAttribute", { enumerable: true, get: function () { return ux_size_attribute_1.UxSizeCustomAttribute; } });
    Object.defineProperty(exports, "swatches", { enumerable: true, get: function () { return swatches_1.swatches; } });
    Object.defineProperty(exports, "shadows", { enumerable: true, get: function () { return shadows_1.shadows; } });
    Object.defineProperty(exports, "processDesignAttributes", { enumerable: true, get: function () { return design_attributes_1.processDesignAttributes; } });
    Object.defineProperty(exports, "PaperRipple", { enumerable: true, get: function () { return paper_ripple_1.PaperRipple; } });
    Object.defineProperty(exports, "normalizeBooleanAttribute", { enumerable: true, get: function () { return html_attributes_1.normalizeBooleanAttribute; } });
    Object.defineProperty(exports, "normalizeNumberAttribute", { enumerable: true, get: function () { return html_attributes_1.normalizeNumberAttribute; } });
    Object.defineProperty(exports, "getBackgroundColorThroughParents", { enumerable: true, get: function () { return background_color_parent_1.getBackgroundColorThroughParents; } });
    Object.defineProperty(exports, "UxChoiceAttribute", { enumerable: true, get: function () { return ux_choice_attribute_1.UxChoiceAttribute; } });
    Object.defineProperty(exports, "UxChoiceContainerAttribute", { enumerable: true, get: function () { return ux_choice_container_attribute_1.UxChoiceContainerAttribute; } });
    Object.defineProperty(exports, "StyleEngine", { enumerable: true, get: function () { return style_engine_1.StyleEngine; } });
    Object.defineProperty(exports, "GlobalStyleEngine", { enumerable: true, get: function () { return global_style_engine_1.GlobalStyleEngine; } });
    Object.defineProperty(exports, "AureliaUX", { enumerable: true, get: function () { return aurelia_ux_2.AureliaUX; } });
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
});
//# sourceMappingURL=index.js.map