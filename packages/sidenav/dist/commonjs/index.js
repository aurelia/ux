"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UxDefaultSidenavConfiguration = exports.UxSidenav = exports.configure = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_sidenav_1 = require("./ux-sidenav/ux-sidenav");
Object.defineProperty(exports, "UxSidenav", { enumerable: true, get: function () { return ux_sidenav_1.UxSidenav; } });
var ux_default_sidenav_configuration_1 = require("./ux-default-sidenav-configuration");
Object.defineProperty(exports, "UxDefaultSidenavConfiguration", { enumerable: true, get: function () { return ux_default_sidenav_configuration_1.UxDefaultSidenavConfiguration; } });
var ux_sidenav_theme_1 = require("./ux-sidenav/ux-sidenav-theme");
Object.defineProperty(exports, "UxSidenavTheme", { enumerable: true, get: function () { return ux_sidenav_theme_1.UxSidenavTheme; } });
function configure(config, callback) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav/ux-sidenav'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav-content/ux-sidenav-content'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-sidenav-drawer/ux-sidenav-drawer'),
    ]);
    if (typeof callback === 'function') {
        var defaults = config.container.get(ux_default_sidenav_configuration_1.UxDefaultSidenavConfiguration);
        callback(defaults);
    }
}
exports.configure = configure;
//# sourceMappingURL=index.js.map