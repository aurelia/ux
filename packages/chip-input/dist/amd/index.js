define(["require", "exports", "aurelia-framework", "./ux-chip-input-theme", "./ux-chip-theme"], function (require, exports, aurelia_framework_1, ux_chip_input_theme_1, ux_chip_theme_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.UxChipInputTheme = ux_chip_input_theme_1.UxChipInputTheme;
    exports.UxChipTheme = ux_chip_theme_1.UxChipTheme;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip-input'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input/ux-chip')
        ]);
    }
    exports.configure = configure;
});
