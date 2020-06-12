define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-default-select-configuration", "./ux-option", "./ux-optgroup", "./ux-select", "./ux-select-theme"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_default_select_configuration_1, ux_option_1, ux_optgroup_1, ux_select_1, ux_select_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxDefaultSelectConfiguration = void 0;
    Object.defineProperty(exports, "UxDefaultSelectConfiguration", { enumerable: true, get: function () { return ux_default_select_configuration_1.UxDefaultSelectConfiguration; } });
    Object.defineProperty(exports, "UxOption", { enumerable: true, get: function () { return ux_option_1.UxOption; } });
    Object.defineProperty(exports, "UxOptGroup", { enumerable: true, get: function () { return ux_optgroup_1.UxOptGroup; } });
    Object.defineProperty(exports, "UxSelect", { enumerable: true, get: function () { return ux_select_1.UxSelect; } });
    Object.defineProperty(exports, "UxSelectTheme", { enumerable: true, get: function () { return ux_select_theme_1.UxSelectTheme; } });
    function configure(config, callback) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSelectConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-select'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-optgroup'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-option')
        ]);
        if (typeof callback === 'function') {
            var defaults = config.container.get(ux_default_select_configuration_1.UxDefaultSelectConfiguration);
            callback(defaults);
        }
    }
    exports.configure = configure;
    var uxSelectConfig = {
        tagName: 'ux-select',
        properties: {
            value: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element, _) {
                    return new aurelia_binding_1.ValueAttributeObserver(element, 'value', new aurelia_binding_1.EventSubscriber(['change']));
                }
            }
        }
    };
});
//# sourceMappingURL=index.js.map