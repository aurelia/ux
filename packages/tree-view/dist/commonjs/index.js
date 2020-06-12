"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxDefaultTreeViewConfiguration = exports.UxTreeView = exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_default_tree_view_configuration_1 = require("./ux-default-tree-view-configuration");
Object.defineProperty(exports, "UxDefaultTreeViewConfiguration", { enumerable: true, get: function () { return ux_default_tree_view_configuration_1.UxDefaultTreeViewConfiguration; } });
var ux_tree_view_1 = require("./ux-tree-view/ux-tree-view");
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
var ux_tree_view_theme_1 = require("./ux-tree-view/ux-tree-view-theme");
Object.defineProperty(exports, "UxTreeViewTheme", { enumerable: true, get: function () { return ux_tree_view_theme_1.UxTreeViewTheme; } });
//# sourceMappingURL=index.js.map