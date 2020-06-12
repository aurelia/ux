"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxListItem = exports.UxList = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_list_1 = require("./ux-list");
Object.defineProperty(exports, "UxList", { enumerable: true, get: function () { return ux_list_1.UxList; } });
var ux_list_item_1 = require("./ux-list-item");
Object.defineProperty(exports, "UxListItem", { enumerable: true, get: function () { return ux_list_item_1.UxListItem; } });
var ux_list_theme_1 = require("./ux-list-theme");
Object.defineProperty(exports, "UxListTheme", { enumerable: true, get: function () { return ux_list_theme_1.UxListTheme; } });
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-list'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-list-item')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map