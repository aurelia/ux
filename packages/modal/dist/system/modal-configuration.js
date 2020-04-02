System.register([], function (exports_1, context_1) {
    "use strict";
    var DefaultModalConfiguration;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            DefaultModalConfiguration = /** @class */ (function () {
                function DefaultModalConfiguration() {
                    this.modalBreakpoint = void 0;
                    this.host = void 0;
                    this.overlayDismiss = void 0;
                    this.position = void 0;
                    this.keyboard = void 0;
                    this.theme = void 0;
                }
                return DefaultModalConfiguration;
            }());
            exports_1("DefaultModalConfiguration", DefaultModalConfiguration);
        }
    };
});
