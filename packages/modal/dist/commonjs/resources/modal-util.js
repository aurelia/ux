"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ux_modal_1 = require("../ux-modal");
function findModal(item) {
    var element = item;
    if (element === null)
        return null;
    while (element.tagName !== 'BODY' && element.tagName !== 'UX-DRAWER') {
        element = element.parentElement;
        if (element === null)
            return null;
    }
    var el = element;
    if (el !== null &&
        el.au !== undefined) {
        for (var key in el.au) {
            if (el.au[key].viewModel && el.au[key].viewModel instanceof ux_modal_1.UxModal) {
                return el.au[key].viewModel;
            }
        }
    }
    return null;
}
exports.findModal = findModal;
