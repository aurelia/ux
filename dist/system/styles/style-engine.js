System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var StyleEngine;
    return {
        setters:[],
        execute: function() {
            StyleEngine = (function () {
                function StyleEngine() {
                }
                StyleEngine.prototype.applyTheme = function (themable, theme) {
                    var instance;
                    if (typeof theme === 'string') {
                        instance = themable.resources.getValue(theme);
                        console.log(themable, theme, instance);
                    }
                };
                return StyleEngine;
            }());
            exports_1("StyleEngine", StyleEngine);
        }
    }
});
