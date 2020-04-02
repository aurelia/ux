import { UxModal } from '../ux-modal';
export function findModal(item) {
    let element = item;
    if (element === null)
        return null;
    while (element.tagName !== 'BODY' && element.tagName !== 'UX-DRAWER') {
        element = element.parentElement;
        if (element === null)
            return null;
    }
    const el = element;
    if (el !== null &&
        el.au !== undefined) {
        for (let key in el.au) {
            if (el.au[key].viewModel && el.au[key].viewModel instanceof UxModal) {
                return el.au[key].viewModel;
            }
        }
    }
    return null;
}
