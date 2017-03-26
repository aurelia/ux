import {View} from 'aurelia-templating';
import {DOM, PLATFORM} from 'aurelia-pal';

export class StyleController {
  public isDefault = false;
  private styleElementParent: Node;
  private styleElement: HTMLStyleElement;
  private bindingInstance: any = null;
  private count = 0;

  public onRemove = PLATFORM.noop;

  constructor(
    public factory: any,
    public bindingContext: any,
    public overrideContext: any,
    private expression: any,
    private destination?: Element
    ) {
  }

  public bind(view: View) {
    const overrideContext: any = view.overrideContext;
    const $styles = overrideContext['$styles'] || {};

    overrideContext['$' + this.factory.themeKey] = this.bindingContext;
    overrideContext['$design'] = this.overrideContext.$design;
    overrideContext['$styles'] = Object.assign(
      $styles, this.overrideContext.$styles
    );

    if (this.count === 0) {
      this.ensureStyleElementIsAddedToDocument();
      this.count = 1;
      this.bindingInstance.bind(this);
    } else {
      this.count++;
    }
  }

  public unbind() {
    this.count--;

    if (this.count === 0) {
      this.removeStyleElement();
      this.bindingInstance.unbind();
    }
  }

  private ensureStyleElementIsAddedToDocument() {
    if (this.styleElement === undefined) {
      this.styleElement = DOM.injectStyles('', this.destination) as HTMLStyleElement;
      this.bindingInstance = this.expression.createBinding(this.styleElement);
    } else if (!this.styleElement.parentNode) {
      this.styleElementParent.appendChild(this.styleElement);
    }
  }

  private removeStyleElement() {
    this.styleElementParent = this.styleElement.parentNode as Node;
    DOM.removeNode(this.styleElement);
    this.onRemove();
  }
}
