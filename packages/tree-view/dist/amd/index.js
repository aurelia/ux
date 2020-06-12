define(["require", "exports", "aurelia-framework", "./ux-default-tree-view-configuration", "./ux-tree-view/ux-tree-view", "./ux-tree-view/ux-tree-view-theme"], function (require, exports, aurelia_framework_1, ux_default_tree_view_configuration_1, ux_tree_view_1, ux_tree_view_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxDefaultTreeViewConfiguration = exports.UxTreeView = exports.configure = void 0;
    Object.defineProperty(exports, "UxDefaultTreeViewConfiguration", { enumerable: true, get: function () { return ux_default_tree_view_configuration_1.UxDefaultTreeViewConfiguration; } });
    Object.defineProperty(exports, "UxTreeView", { enumerable: true, get: function () { return ux_tree_view_1.UxTreeView; } });
    function configure(config, callback) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-tree-view/ux-tree-view')
        ]);
        if (typeof callback === 'function') {
            var defaults = config.container.get(ux_default_tree_view_configuration_1.UxDefaultTreeViewConfiguration);
            callback(defaults);
        }
    }
    exports.configure = configure;
    Object.defineProperty(exports, "UxTreeViewTheme", { enumerable: true, get: function () { return ux_tree_view_theme_1.UxTreeViewTheme; } });
});
//# sourceMappingURL=index.js.map