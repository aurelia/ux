import { bindingBehavior } from "aurelia-binding";

@bindingBehavior('booleanAttr')
export class BooleanBB {

  bind(binding: any) {
    binding.targetObserver = new BooleanAttributeObserver(binding.target, binding.targetProperty);
  }

  unbind() { }
}


class BooleanAttributeObserver {

  constructor(
    public element: HTMLElement,
    public attr: string
  ) {
  }

  getValue() {
    return this.element.getAttribute(this.attr);
  }

  setValue(newValue: boolean | string) {
    if (newValue || newValue === '') {
      return this.element.setAttribute(this.attr, '');
    }
    return this.element.removeAttribute(this.attr);
  }

  subscribe() {
    const msg = `Observation of a "${this.element.nodeName}" element\'s "${this.attr}" attribute is not supported.`;
    throw new Error(msg);
  }
}