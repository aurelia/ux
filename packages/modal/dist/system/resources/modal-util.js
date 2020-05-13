System.register(["../ux-modal"], function (exports_1, context_1) {
    "use strict";
    var ux_modal_1;
    var __moduleName = context_1 && context_1.id;
    function findModal(item) {
        var element = item;
        if (element === null)
            return null;
        while (element.tagName !== 'BODY') {
            element = element.parentElement;
            var isModalElement = element ? modalViewModelFromElement(element) : null;
            if (isModalElement !== null) {
                return isModalElement;
            }
            if (element === null)
                return null;
        }
        return null;
    }
    exports_1("findModal", findModal);
    function modalViewModelFromElement(element) {
        var el = element;
        if (!el.au) {
            return null;
        }
        for (var key in el.au) {
            if (el.au[key].viewModel && el.au[key].viewModel instanceof ux_modal_1.UxModal) {
                return el.au[key].viewModel;
            }
        }
        return null;
    }
    exports_1("modalViewModelFromElement", modalViewModelFromElement);
    return {
        setters: [
            function (ux_modal_1_1) {
                ux_modal_1 = ux_modal_1_1;
            }
        ],
        execute: function () {
        }
    };
});
