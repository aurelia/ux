"use strict";
var StyleEngine = (function () {
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
exports.StyleEngine = StyleEngine;
