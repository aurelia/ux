import { UxModal } from '../ux-modal';
export function findModal(item) {
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
export function modalViewModelFromElement(element) {
    var el = element;
    if (!el.au) {
        return null;
    }
    for (var key in el.au) {
        if (el.au[key].viewModel && el.au[key].viewModel instanceof UxModal) {
            return el.au[key].viewModel;
        }
    }
    return null;
}
//# sourceMappingURL=modal-util.js.map