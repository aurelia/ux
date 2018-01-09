export function defineValueProperty(el: Element) {
  if ('value' in el) {
    throw new Error('Cannot shadow element value property');
  }
  Object.defineProperty(el, 'value', {
    get: getAuVmValue,
    set: setAuVmValue
  });
}

function getAuVmValue(this: Element & { au: any }) {
  return this.au.controller.viewModel.getValue();
}

function setAuVmValue(this: Element & { au: any }, value: any) {
  this.au.controller.viewModel.setValue(value);
}
