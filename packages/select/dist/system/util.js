System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function getAuViewModel(el) {
        return el.au.controller.viewModel;
    }
    exports_1("getAuViewModel", getAuViewModel);
    function bool(v) {
        return !!(v || v === '');
    }
    exports_1("bool", bool);
    return {
        setters: [],
        execute: function () {
        }
    };
});
