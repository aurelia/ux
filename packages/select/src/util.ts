export function getAuViewModel<T = any>(el: any): T {
  return el.au.controller.viewModel;
}

export function bool(v: boolean | string) {
  return !!(v || v === '');
}
