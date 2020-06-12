define(["require", "exports", "aurelia-framework", "./ux-list", "./ux-list-item", "./ux-list-theme"], function (require, exports, aurelia_framework_1, ux_list_1, ux_list_item_1, ux_list_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = exports.UxListItem = exports.UxList = void 0;
    Object.defineProperty(exports, "UxList", { enumerable: true, get: function () { return ux_list_1.UxList; } });
    Object.defineProperty(exports, "UxListItem", { enumerable: true, get: function () { return ux_list_item_1.UxListItem; } });
    Object.defineProperty(exports, "UxListTheme", { enumerable: true, get: function () { return ux_list_theme_1.UxListTheme; } });
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-list-item')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map