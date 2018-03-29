export function getAuViewModel(el) {
    return el.au.controller.viewModel;
}
export function bool(v) {
    return !!(v || v === '');
}
