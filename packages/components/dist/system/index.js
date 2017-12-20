System.register(["@aurelia-ux/button", "@aurelia-ux/checkbox", "@aurelia-ux/chip-input", "@aurelia-ux/datepicker", "@aurelia-ux/form", "@aurelia-ux/input", "@aurelia-ux/input-info", "@aurelia-ux/list", "@aurelia-ux/radio", "@aurelia-ux/textarea", "@aurelia-ux/switch"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
    exports_1("configure", configure);
    var button_1, checkbox_1, chip_input_1, datepicker_1, form_1, input_1, input_info_1, list_1, radio_1, textarea_1, switch_1;
    return {
        setters: [
            function (button_1_1) {
                button_1 = button_1_1;
            },
            function (checkbox_1_1) {
                checkbox_1 = checkbox_1_1;
            },
            function (chip_input_1_1) {
                chip_input_1 = chip_input_1_1;
            },
            function (datepicker_1_1) {
                datepicker_1 = datepicker_1_1;
            },
            function (form_1_1) {
                form_1 = form_1_1;
            },
            function (input_1_1) {
                input_1 = input_1_1;
            },
            function (input_info_1_1) {
                input_info_1 = input_info_1_1;
            },
            function (list_1_1) {
                list_1 = list_1_1;
            },
            function (radio_1_1) {
                radio_1 = radio_1_1;
            },
            function (textarea_1_1) {
                textarea_1 = textarea_1_1;
            },
            function (switch_1_1) {
                switch_1 = switch_1_1;
            }
        ],
        execute: function () {
        }
    };
});
