define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-textarea-theme", "./ux-textarea"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_textarea_theme_1, ux_textarea_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxTextAreaTheme = ux_textarea_theme_1.UxTextAreaTheme;
    exports.UxTextArea = ux_textarea_1.UxTextArea;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxTextAreaConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea/ux-textarea')
        ]);
    }
    exports.configure = configure;
    var uxTextAreaConfig = {
        tagName: 'ux-textarea',
        properties: {
            value: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element) {
                    return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
                }
            }
        }
    };
});
