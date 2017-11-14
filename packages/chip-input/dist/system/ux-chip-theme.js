System.register(["@aurelia-ux/core"], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var core_1, UxChipTheme;
    return {
        setters: [
            function (core_1_1) {
                core_1 = core_1_1;
            }
        ],
        execute: function () {
            UxChipTheme = /** @class */ (function () {
                function UxChipTheme() {
                    this.themeKey = 'chip';
                    this.background = 'var(--ux-design--accent)';
                    this.foreground = 'var(--ux-design--accent-foreground)';
                    this.deleteBackground = core_1.swatches.grey.p500;
                    this.deleteForeground = core_1.swatches.grey.p200;
                }
                return UxChipTheme;
            }());
            exports_1("UxChipTheme", UxChipTheme);
        }
    };
});
