define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    function getAuViewModel(el) {
        return el.au.controller.viewModel;
    }
    exports.getAuViewModel = getAuViewModel;
    function bool(v) {
        return !!(v || v === '');
    }
    exports.bool = bool;
});
