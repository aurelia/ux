define(["require", "exports", "aurelia-framework", "./ux-card-theme"], function (require, exports, aurelia_framework_1, ux_card_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxCardTheme = ux_card_theme_1.UxCardTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card')
        ]);
    }
    exports.configure = configure;
});
