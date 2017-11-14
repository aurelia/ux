define(["require", "exports", "aurelia-framework", "./ux-form-theme"], function (require, exports, aurelia_framework_1, ux_form_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxFormTheme = ux_form_theme_1.UxFormTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-field'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-form'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-submit-attribute')
        ]);
    }
    exports.configure = configure;
});
