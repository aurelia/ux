define(["require", "exports", "@aurelia-ux/button", "@aurelia-ux/checkbox", "@aurelia-ux/chip-input", "@aurelia-ux/datepicker", "@aurelia-ux/form", "@aurelia-ux/input", "@aurelia-ux/input-info", "@aurelia-ux/list", "@aurelia-ux/radio", "@aurelia-ux/textarea", "@aurelia-ux/switch"], function (require, exports, button_1, checkbox_1, chip_input_1, datepicker_1, form_1, input_1, input_info_1, list_1, radio_1, textarea_1, switch_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function configure(config) {
        button_1.configure(config);
        checkbox_1.configure(config);
        chip_input_1.configure(config);
        datepicker_1.configure(config);
        form_1.configure(config);
        input_1.configure(config);
        input_info_1.configure(config);
        list_1.configure(config);
        radio_1.configure(config);
        textarea_1.configure(config);
        switch_1.configure(config);
    }
    exports.configure = configure;
});
