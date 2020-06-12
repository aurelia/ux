define(["require", "exports", "aurelia-framework", "./ux-expandable", "./ux-expandable-theme"], function (require, exports, aurelia_framework_1, ux_expandable_1, ux_expandable_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxExpandable = exports.configure = void 0;
    Object.defineProperty(exports, "UxExpandable", { enumerable: true, get: function () { return ux_expandable_1.UxExpandable; } });
    Object.defineProperty(exports, "UxExpandableTheme", { enumerable: true, get: function () { return ux_expandable_theme_1.UxExpandableTheme; } });
    function configure(config) {
        config.globalResources(aurelia_framework_1.PLATFORM.moduleName('./ux-expandable'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map