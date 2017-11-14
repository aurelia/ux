System.register(["aurelia-framework", "./ux-chip-input-theme", "./ux-tag-theme", "./ux-chip-theme"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('./ux-chip-input'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-chip'),
            aurelia_framework_1.PLATFORM.moduleName('./ux-tag')
        ]);
    }
    exports_1("configure", configure);
    var aurelia_framework_1;
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_chip_input_theme_1_1) {
                exports_1({
                    "UxChipInputTheme": ux_chip_input_theme_1_1["UxChipInputTheme"]
                });
            },
            function (ux_tag_theme_1_1) {
                exports_1({
                    "UxTagTheme": ux_tag_theme_1_1["UxTagTheme"]
                });
            },
            function (ux_chip_theme_1_1) {
                exports_1({
                    "UxChipTheme": ux_chip_theme_1_1["UxChipTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
