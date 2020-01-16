define(["require", "exports", "aurelia-framework", "./ux-list", "./ux-list-item", "./ux-list-theme"], function (require, exports, aurelia_framework_1, ux_list_1, ux_list_item_1, ux_list_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxList = ux_list_1.UxList;
    exports.UxListItem = ux_list_item_1.UxListItem;
    exports.UxListTheme = ux_list_theme_1.UxListTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-list'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-list-item')
        ]);
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map