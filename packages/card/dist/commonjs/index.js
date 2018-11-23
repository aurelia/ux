"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var aurelia_framework_1 = require("aurelia-framework");
var ux_card_theme_1 = require("./ux-card-theme");
exports.UxCardTheme = ux_card_theme_1.UxCardTheme;
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-header'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-action-row'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-content'),
        aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-footer')
    ]);
}
exports.configure = configure;
