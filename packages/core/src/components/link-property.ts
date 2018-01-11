const lookup: { [propertyName: string]: PropertyDescriptor } = {};
function getPropertyDescriptor(propertyName: string) {
  let descriptor = lookup[propertyName];
  if (descriptor) {
    return descriptor;
  }
  const setterName = 'set' + propertyName;
  const getterName = 'get' + propertyName;
  descriptor = lookup[propertyName] = {
    get() {
      return this.au.controller.viewModel[getterName]();
    },
    set(value: any) {
      this.au.controller.viewModel[setterName](value);
    }
  };
  return descriptor;
}

export function linkProperty(el: Element, propertyNames: string | string[]): void {
  if (typeof propertyNames === 'string') {
    Object.defineProperty(el, propertyNames, getPropertyDescriptor(propertyNames));
  } else {
    for (const propertyName of propertyNames) {
      Object.defineProperty(el, propertyName, getPropertyDescriptor(propertyName));
    }
  }
}
