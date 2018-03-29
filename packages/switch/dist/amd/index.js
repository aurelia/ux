define(["require", "exports", "aurelia-framework", "aurelia-binding", "@aurelia-ux/core", "./ux-switch-theme", "./ux-switch"], function (require, exports, aurelia_framework_1, AuBinding, core_1, ux_switch_theme_1, ux_switch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxSwitchTheme = ux_switch_theme_1.UxSwitchTheme;
    exports.UxSwitch = ux_switch_1.UxSwitch;
    function configure(config) {
        config.container.get(core_1.AureliaUX).registerUxElementConfig(uxSwitchConfig);
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
        ]);
    }
    exports.configure = configure;
    var uxSwitchConfig = {
        tagName: 'ux-switch',
        properties: {
            checked: {
                defaultBindingMode: aurelia_framework_1.bindingMode.twoWay,
                getObserver: function (element, _, observerLocator) {
                    return new AuBinding.CheckedObserver(element, uxSwitchChangeHandler, observerLocator);
                }
            }
        }
    };
    var uxSwitchChangeHandler = {
        subscribe: function (target, callbackOrListener) {
            target.addEventListener('change', callbackOrListener, false);
            return function () {
                target.removeEventListener('change', callbackOrListener, false);
            };
        }
    };
});
