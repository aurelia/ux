define(["require", "exports", "aurelia-framework", "./ux-lookup-configuration", "./ux-lookup", "./ux-lookup-theme"], function (require, exports, aurelia_framework_1, ux_lookup_configuration_1, ux_lookup_1, ux_lookup_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    Object.defineProperty(exports, "UxLookup", { enumerable: true, get: function () { return ux_lookup_1.UxLookup; } });
    Object.defineProperty(exports, "UxLookupTheme", { enumerable: true, get: function () { return ux_lookup_theme_1.UxLookupTheme; } });
    function configure(frameworkConfig, callback) {
        frameworkConfig.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-lookup')
        ]);
        if (typeof callback === 'function') {
            var config = frameworkConfig.container.get(ux_lookup_configuration_1.UxDefaultLookupConfiguration);
            callback(config);
        }
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map