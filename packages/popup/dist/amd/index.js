define(["require", "exports", "aurelia-framework", "./ux-popup", "./ux-popup-theme"], function (require, exports, aurelia_framework_1, ux_popup_1, ux_popup_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxPopup", { enumerable: true, get: function () { return ux_popup_1.UxPopup; } });
    Object.defineProperty(exports, "UxPopupTheme", { enumerable: true, get: function () { return ux_popup_theme_1.UxPopupTheme; } });
    function configure(frameworkConfig) {
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-popup')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map