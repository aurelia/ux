System.register([], function (exports_1, context_1) {
    "use strict";
    var UxModalTheme;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            UxModalTheme = /** @class */ (function () {
                function UxModalTheme() {
                    this.themeKey = 'modal';
                    this.overlayColor = void 0;
                    this.overlayOpacity = void 0;
                    this.transitionDuration = void 0;
                    this.overlayTransitionDuration = void 0;
                    this.contentTransitionDuration = void 0;
                    this.background = void 0;
                    this.foreground = void 0;
                    this.borderRadius = void 0;
                    this.minWidth = void 0;
                    this.unlocked = void 0;
                }
                return UxModalTheme;
            }());
            exports_1("UxModalTheme", UxModalTheme);
        }
    };
});
