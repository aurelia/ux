define(["require", "exports", "aurelia-framework", "./ux-button", "./ux-button-theme"], function (require, exports, aurelia_framework_1, ux_button_1, ux_button_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxButton = exports.configure = void 0;
    Object.defineProperty(exports, "UxButton", { enumerable: true, get: function () { return ux_button_1.UxButton; } });
    Object.defineProperty(exports, "UxButtonTheme", { enumerable: true, get: function () { return ux_button_theme_1.UxButtonTheme; } });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-button'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map