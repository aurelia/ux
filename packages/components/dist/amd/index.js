define(["require", "exports", "tslib", "aurelia-framework", "@aurelia-ux/card", "@aurelia-ux/button", "@aurelia-ux/checkbox", "@aurelia-ux/chip-input", "@aurelia-ux/grid", "@aurelia-ux/datepicker", "@aurelia-ux/expandable", "@aurelia-ux/form", "@aurelia-ux/input", "@aurelia-ux/input-info", "@aurelia-ux/list", "@aurelia-ux/progress", "@aurelia-ux/radio", "@aurelia-ux/switch", "@aurelia-ux/select", "@aurelia-ux/slider", "@aurelia-ux/textarea", "@aurelia-ux/tree-view"], function (require, exports, tslib_1, aurelia_framework_1, card_1, button_1, checkbox_1, chip_input_1, grid_1, datepicker_1, expandable_1, form_1, input_1, input_info_1, list_1, progress_1, radio_1, switch_1, select_1, slider_1, textarea_1, tree_view_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.configure = void 0;
    tslib_1.__exportStar(card_1, exports);
    tslib_1.__exportStar(button_1, exports);
    tslib_1.__exportStar(checkbox_1, exports);
    tslib_1.__exportStar(chip_input_1, exports);
    tslib_1.__exportStar(grid_1, exports);
    tslib_1.__exportStar(datepicker_1, exports);
    tslib_1.__exportStar(expandable_1, exports);
    tslib_1.__exportStar(form_1, exports);
    tslib_1.__exportStar(input_1, exports);
    tslib_1.__exportStar(input_info_1, exports);
    tslib_1.__exportStar(list_1, exports);
    tslib_1.__exportStar(progress_1, exports);
    tslib_1.__exportStar(radio_1, exports);
    tslib_1.__exportStar(switch_1, exports);
    tslib_1.__exportStar(select_1, exports);
    tslib_1.__exportStar(slider_1, exports);
    tslib_1.__exportStar(textarea_1, exports);
    tslib_1.__exportStar(tree_view_1, exports);
    function configure(config) {
        config
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/button'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/checkbox'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/chip-input'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/datepicker'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/expandable'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/grid'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/form'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/input-info'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/list'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/progress'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/radio'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/switch'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/select'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/slider'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/textarea'))
            .plugin(aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/tree-view'));
    }
    exports.configure = configure;
});
//# sourceMappingURL=index.js.map