import { bindingBehavior } from 'aurelia-binding';

@bindingBehavior('booleanAttr')
export class BooleanBB {

  public bind(binding: any) {
    binding.targetObserver = new BooleanAttributeObserver(binding.target, binding.targetProperty);
  }

  public unbind() {
    // Empty
  }
}

class BooleanAttributeObserver {

  private useString: boolean;

  constructor(
    public element: HTMLElement,
    public attr: string
  ) {
    this.useString = /(?:^data-)|(?:^aria-)|\w+:/.test(attr);
  }

  public getValue() {
    const val = this.element.getAttribute(this.attr);
    return val || val === '' ? true : false;
  }

  public setValue(newValue: boolean | string) {
    if (newValue || newValue === '') {
      return this.element.setAttribute(this.attr, this.useString ? 'true' : '');
    }
    return this.useString ? this.element.setAttribute(this.attr, 'false') : this.element.removeAttribute(this.attr);
  }

  public subscribe() {
    const msg = `Observation of a "${this.element.nodeName}" element\'s "${this.attr}" attribute is not supported.`;
    throw new Error(msg);
  }
}
