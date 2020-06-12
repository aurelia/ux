define(["require", "exports", "aurelia-framework", "./ux-progress", "./ux-progress-theme"], function (require, exports, aurelia_framework_1, ux_progress_1, ux_progress_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxProgress = exports.configure = void 0;
    Object.defineProperty(exports, "UxProgress", { enumerable: true, get: function () { return ux_progress_1.UxProgress; } });
    Object.defineProperty(exports, "UxProgressTheme", { enumerable: true, get: function () { return ux_progress_theme_1.UxProgressTheme; } });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-progress'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map