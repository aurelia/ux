define(["require", "exports", "aurelia-framework", "./ux-textarea-theme"], function (require, exports, aurelia_framework_1, ux_textarea_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxTextareaTheme = ux_textarea_theme_1.UxTextareaTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-textarea')
        ]);
    }
    exports.configure = configure;
});
