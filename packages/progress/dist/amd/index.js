define(["require", "exports", "aurelia-framework", "./ux-progress", "./ux-progress-theme"], function (require, exports, aurelia_framework_1, ux_progress_1, ux_progress_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxProgress = ux_progress_1.UxProgress;
    exports.UxProgressTheme = ux_progress_theme_1.UxProgressTheme;
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-progress'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map