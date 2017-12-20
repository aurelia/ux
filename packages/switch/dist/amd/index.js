define(["require", "exports", "aurelia-framework", "./ux-switch-theme"], function (require, exports, aurelia_framework_1, ux_switch_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxSwitchTheme = ux_switch_theme_1.UxSwitchTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch/ux-switch')
        ]);
    }
    exports.configure = configure;
});
