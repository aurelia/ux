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
                    this.background = 'var(--ux-design--accent)';
                    this.foreground = 'var(--ux-design--accent-foreground)';
                }
                return UxTagTheme;
            }());
            exports_1("UxTagTheme", UxTagTheme);
        }
    };
});
