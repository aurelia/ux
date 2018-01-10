System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var UxTagTheme;
    return {
        setters: [],
        execute: function () {
            UxTagTheme = /** @class */ (function () {
                function UxTagTheme() {
                    this.themeKey = 'tag';
                    this.background = 'var(--ux-design--accent, #FF4081)';
                    this.foreground = 'var(--ux-design--accent-foreground, #FFFFFF)';
                }
                return UxTagTheme;
            }());
            exports_1("UxTagTheme", UxTagTheme);
        }
    };
});
