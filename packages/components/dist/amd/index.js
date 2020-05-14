define(["require", "exports", "aurelia-framework", "@aurelia-ux/card", "@aurelia-ux/button", "@aurelia-ux/checkbox", "@aurelia-ux/chip-input", "@aurelia-ux/grid", "@aurelia-ux/datepicker", "@aurelia-ux/form", "@aurelia-ux/input", "@aurelia-ux/input-info", "@aurelia-ux/list", "@aurelia-ux/radio", "@aurelia-ux/textarea", "@aurelia-ux/switch", "@aurelia-ux/select", "@aurelia-ux/slider"], function (require, exports, aurelia_framework_1, card_1, button_1, checkbox_1, chip_input_1, grid_1, datepicker_1, form_1, input_1, input_info_1, list_1, radio_1, textarea_1, switch_1, select_1, slider_1) {
    "use strict";
    function __export(m) {
        for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
    }
    Object.defineProperty(exports, "__esModule", { value: true });
    __export(card_1);
    __export(button_1);
    __export(checkbox_1);
    __export(chip_input_1);
    __export(grid_1);
    __export(datepicker_1);
    __export(form_1);
    __export(input_1);
    __export(input_info_1);
    __export(list_1);
    __export(radio_1);
    __export(textarea_1);
    __export(switch_1);
    __export(select_1);
    __export(slider_1);
    function configure(config) {
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select'));
        config.plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map