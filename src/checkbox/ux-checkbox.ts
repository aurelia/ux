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
  @bindable public disabled: any = null;
  @bindable public effect = null;
  @bindable public matcher = (a: any, b: any) => a === b;
  @bindable public model: any;
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
      this.checkedChanged();
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public checkedChanged() {
    const elementValue = this.model ? this.model : this.value;
    let isChecked = this.checked;

    if (Array.isArray(this.checked)) {
      isChecked = this.checked.some(item => this.matcher(item, elementValue));
    }

    if (isChecked) {
      this.element.classList.add('checked');
    } else {
      this.element.classList.remove('checked');
    }
  }

  public toggleCheckbox() {
    if (this.disabled === true || this.disabled === '') {
      return;
    }

    const elementValue = this.model ? this.model : this.value;

    if (Array.isArray(this.checked)) {
      const index = this.checked.findIndex(item => this.matcher(item, elementValue));

      if (index === -1) {
        this.checked.push(elementValue);
      } else if (index !== -1) {
        this.checked.splice(index, 1);
      }

      this.checkedChanged();
    } else if (typeof elementValue !== 'boolean') {
      if (this.checked) {
        delete this.checked;
      } else {
        this.checked = elementValue;
      }
    } else {
      this.checked = !this.checked;
    }
  }
}
