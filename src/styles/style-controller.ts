import {View} from 'aurelia-templating';
import {DOM} from 'aurelia-pal';

export class StyleController {
  public isDefault = false;
  private styleElementParent: Node;
  private styleElement: HTMLStyleElement = null;
  private bindingInstance: any = null;
  private count = 0;

  constructor(
    public factory: any,
    public bindingContext: any,
    public overrideContext: any,
    private expression: any,
    private destination?: Element
    ) {
  }

  public bind(view: View){
    let overrideContext: any = view.overrideContext;
    let $styles = overrideContext['$styles'] || {};

    overrideContext['$' + this.factory.id] = this.bindingContext;
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
    if (this.styleElement === null) {
      this.styleElement = <HTMLStyleElement>DOM.injectStyles('', this.destination);
      this.bindingInstance = this.expression.createBinding(this.styleElement);
    } else if (!this.styleElement.parentNode) {
      this.styleElementParent.appendChild(this.styleElement);
    }
  }

  private removeStyleElement() {
    this.styleElementParent = this.styleElement.parentNode;
    DOM.removeNode(this.styleElement);
  }
}
