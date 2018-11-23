System.register(["aurelia-framework", "./ux-card-theme"], function (exports_1, context_1) {
    "use strict";
    var aurelia_framework_1;
    var __moduleName = context_1 && context_1.id;
    function configure(config) {
        config.globalResources([
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-header'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-action-row'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-content'),
            aurelia_framework_1.PLATFORM.moduleName('@aurelia-ux/card/ux-card-footer')
        ]);
    }
    exports_1("configure", configure);
    return {
        setters: [
            function (aurelia_framework_1_1) {
                aurelia_framework_1 = aurelia_framework_1_1;
            },
            function (ux_card_theme_1_1) {
                exports_1({
                    "UxCardTheme": ux_card_theme_1_1["UxCardTheme"]
                });
            }
        ],
        execute: function () {
        }
    };
});
