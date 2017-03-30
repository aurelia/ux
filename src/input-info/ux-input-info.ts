import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-input-info')
@processAttributes(processDesignAttributes)

export class UxInputInfo implements Themable {
  @bindable public target: Element;
  @bindable public uxInputCounter = null;
  @bindable public theme = null;

  public inputElementModel: any;
  public view: View;

  constructor(private element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.target === undefined) {
      this.findAndSetTarget(this.element);
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  private findAndSetTarget(element: any) {
    const inputElement = element.previousElementSibling;

    if (!inputElement) {
      return;
    }

    if (inputElement.nodeName === 'UX-INPUT' || inputElement.nodeName === 'UX-TEXTAREA') {
      this.target = inputElement.au.controller.viewModel;
    }
  }
}
