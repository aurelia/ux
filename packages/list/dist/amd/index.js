define(["require", "exports", "aurelia-framework", "./ux-list-theme"], function (require, exports, aurelia_framework_1, ux_list_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxListTheme = ux_list_theme_1.UxListTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list/ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list/ux-list-item')
        ]);
    }
    exports.configure = configure;
});
