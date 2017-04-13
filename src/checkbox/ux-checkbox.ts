import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-checkbox')
@processAttributes(processDesignAttributes)
export class UxCheckbox implements Themable {
  @bindable public effect = null;
  @bindable public disabled = false;
  @bindable public theme = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public checked = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public value: any = false;

  public view: View;

  constructor(public element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.checked) {
      this.element.classList.add('checked');
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public checkedChanged(newValue: any) {
    if (newValue) {
      this.element.classList.add('checked');
    } else {
      this.element.classList.remove('checked');
    }
  }

  public toggle() {
    this.checked = !this.checked;
  }
}
