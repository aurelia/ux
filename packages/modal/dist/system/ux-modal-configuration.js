System.register([], function (exports_1, context_1) {
    "use strict";
    var UxDefaultModalConfiguration;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            UxDefaultModalConfiguration = /** @class */ (function () {
                function UxDefaultModalConfiguration() {
                    this.modalBreakpoint = void 0;
                    this.host = void 0;
                    this.overlayDismiss = void 0;
                    this.outsideDismiss = void 0;
                    this.lock = void 0;
                    this.position = void 0;
                    this.keyboard = void 0;
                    this.theme = void 0;
                }
                return UxDefaultModalConfiguration;
            }());
            exports_1("UxDefaultModalConfiguration", UxDefaultModalConfiguration);
        }
    };
});
