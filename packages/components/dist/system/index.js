System.register(["@aurelia-ux/card", "@aurelia-ux/button", "@aurelia-ux/checkbox", "@aurelia-ux/chip-input", "@aurelia-ux/grid", "@aurelia-ux/datepicker", "@aurelia-ux/form", "@aurelia-ux/input", "@aurelia-ux/input-info", "@aurelia-ux/list", "@aurelia-ux/radio", "@aurelia-ux/textarea", "@aurelia-ux/switch", "@aurelia-ux/select"], function (exports_1, context_1) {
    "use strict";
    var button_1, card_1, checkbox_1, chip_input_1, datepicker_1, grid_1, form_1, input_1, input_info_1, list_1, radio_1, textarea_1, switch_1, select_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        button_1.configure(config);
        card_1.configure(config);
        checkbox_1.configure(config);
        chip_input_1.configure(config);
        datepicker_1.configure(config);
        grid_1.configure(config);
        form_1.configure(config);
        input_1.configure(config);
        input_info_1.configure(config);
        list_1.configure(config);
        radio_1.configure(config);
        textarea_1.configure(config);
        switch_1.configure(config);
        select_1.configure(config);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (card_2_1) {
                exports_1({
                    "UxCardTheme": card_2_1["UxCardTheme"]
                });
                card_1 = card_2_1;
            },
            function (button_2_1) {
                exports_1({
                    "UxButtonTheme": button_2_1["UxButtonTheme"]
                });
                button_1 = button_2_1;
            },
            function (checkbox_2_1) {
                exports_1({
                    "UxCheckboxTheme": checkbox_2_1["UxCheckboxTheme"],
                    "UxCheckbox": checkbox_2_1["UxCheckbox"]
                });
                checkbox_1 = checkbox_2_1;
            },
            function (chip_input_2_1) {
                exports_1({
                    "UxChipInputTheme": chip_input_2_1["UxChipInputTheme"],
                    "UxChipTheme": chip_input_2_1["UxChipTheme"]
                });
                chip_input_1 = chip_input_2_1;
            },
            function (grid_2_1) {
                exports_1({
                    "UxGridTheme": grid_2_1["UxGridTheme"],
                    "UxResponsiveUtilities": grid_2_1["UxResponsiveUtilities"]
                });
                grid_1 = grid_2_1;
            },
            function (datepicker_2_1) {
                exports_1({
                    "UxDatepickerTheme": datepicker_2_1["UxDatepickerTheme"]
                });
                datepicker_1 = datepicker_2_1;
            },
            function (form_2_1) {
                exports_1({
                    "UxFormTheme": form_2_1["UxFormTheme"]
                });
                form_1 = form_2_1;
            },
            function (input_2_1) {
                exports_1({
                    "UxInputTheme": input_2_1["UxInputTheme"],
                    "UxInput": input_2_1["UxInput"]
                });
                input_1 = input_2_1;
            },
            function (input_info_2_1) {
                exports_1({
                    "UxInputInfoTheme": input_info_2_1["UxInputInfoTheme"]
                });
                input_info_1 = input_info_2_1;
            },
            function (list_2_1) {
                exports_1({
                    "UxListTheme": list_2_1["UxListTheme"]
                });
                list_1 = list_2_1;
            },
            function (radio_2_1) {
                exports_1({
                    "UxRadioTheme": radio_2_1["UxRadioTheme"],
                    "UxRadio": radio_2_1["UxRadio"]
                });
                radio_1 = radio_2_1;
            },
            function (textarea_2_1) {
                exports_1({
                    "UxTextAreaTheme": textarea_2_1["UxTextAreaTheme"],
                    "UxTextArea": textarea_2_1["UxTextArea"]
                });
                textarea_1 = textarea_2_1;
            },
            function (switch_2_1) {
                exports_1({
                    "UxSwitchTheme": switch_2_1["UxSwitchTheme"],
                    "UxSwitch": switch_2_1["UxSwitch"]
                });
                switch_1 = switch_2_1;
            },
            function (select_2_1) {
                exports_1({
                    "UxOption": select_2_1["UxOption"],
                    "UxOptGroup": select_2_1["UxOptGroup"],
                    "UxSelect": select_2_1["UxSelect"],
                    "UxSelectTheme": select_2_1["UxSelectTheme"]
                });
                select_1 = select_2_1;
            }
        ],
        execute: function () {
        }
    };
});
