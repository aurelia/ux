define(["require", "exports", "aurelia-framework", "./ux-input-info", "./ux-input-info-theme"], function (require, exports, aurelia_framework_1, ux_input_info_1, ux_input_info_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxInputInfo = void 0;
    Object.defineProperty(exports, "UxInputInfo", { enumerable: true, get: function () { return ux_input_info_1.UxInputInfo; } });
    Object.defineProperty(exports, "UxInputInfoTheme", { enumerable: true, get: function () { return ux_input_info_theme_1.UxInputInfoTheme; } });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-input-info'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map