"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configure = exports.UxChipInput = exports.UxChip = void 0;
var aurelia_framework_1 = require("aurelia-framework");
var ux_chip_1 = require("./ux-chip");
Object.defineProperty(exports, "UxChip", { enumerable: true, get: function () { return ux_chip_1.UxChip; } });
var ux_chip_input_1 = require("./ux-chip-input");
Object.defineProperty(exports, "UxChipInput", { enumerable: true, get: function () { return ux_chip_input_1.UxChipInput; } });
var ux_chip_input_theme_1 = require("./ux-chip-input-theme");
Object.defineProperty(exports, "UxChipInputTheme", { enumerable: true, get: function () { return ux_chip_input_theme_1.UxChipInputTheme; } });
var ux_chip_theme_1 = require("./ux-chip-theme");
Object.defineProperty(exports, "UxChipTheme", { enumerable: true, get: function () { return ux_chip_theme_1.UxChipTheme; } });
function configure(config) {
    config.globalResources([
        aurelia_framework_1.PLATFORM.moduleName('./ux-chip-input'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-chip-list'),
        aurelia_framework_1.PLATFORM.moduleName('./ux-chip')
    ]);
}
exports.configure = configure;
//# sourceMappingURL=index.js.map