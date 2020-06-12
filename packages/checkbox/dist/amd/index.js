define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-checkbox-theme", "./ux-checkbox"], function (require, exports, aurelia_framework_1, aurelia_binding_1, core_1, ux_checkbox_theme_1, ux_checkbox_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxCheckboxTheme", { enumerable: true, get: function () { return ux_checkbox_theme_1.UxCheckboxTheme; } });
    Object.defineProperty(exports, "UxCheckbox", { enumerable: true, get: function () { return ux_checkbox_1.UxCheckbox; } });
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxCheckBoxConfig);
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-checkbox'));
    }
    exports.configure = configure;
    var uxCheckBoxConfig = {
        tagName: 'ux-checkbox',
        properties: {
            checked: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element, _, observerLocator) {
                    return new aurelia_binding_1.CheckedObserver(element, new aurelia_binding_1.EventSubscriber(['change']), observerLocator);
                }
            }
        }
    };
});
//# sourceMappingURL=index.js.map