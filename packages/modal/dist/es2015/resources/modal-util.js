import { UxModal } from '../ux-modal';
export function findModal(item) {
    let element = item;
    if (element === null)
        return null;
    while (element.tagName !== 'BODY') {
        element = element.parentElement;
        const isModalElement = element ? modalViewModelFromElement(element) : null;
        if (isModalElement !== null) {
            return isModalElement;
        }
        if (element === null)
            return null;
    }
    return null;
}
export function modalViewModelFromElement(element) {
    const el = element;
    if (!el.au) {
        return null;
    }
    for (let key in el.au) {
        if (el.au[key].viewModel && el.au[key].viewModel instanceof UxModal) {
            return el.au[key].viewModel;
        }
    }
    return null;
}
//# sourceMappingURL=modal-util.js.map