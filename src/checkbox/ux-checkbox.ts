import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { PaperRipple } from '../effects/paper-ripple';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-checkbox')
@processAttributes(processDesignAttributes)
export class UxCheckbox implements Themable {
  @bindable public disabled: any = null;
  @bindable public effect = null;
  @bindable public label: string;
  @bindable public matcher = (a: any, b: any) => a === b;
  @bindable public model: any;
  @bindable public tabindex = 0;
  @bindable public theme = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public checked = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public value: any = false;

  public view: View;
  private checkbox: Element;
  private ripple: PaperRipple | null = null;

  public get isDisabled() {
    return this.disabled === true || this.disabled === '' || this.disabled === 'disabled';
  }

  constructor(public element: HTMLElement, public resources: ViewResources, private styleEngine: StyleEngine) { }

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
      this.element.setAttribute('aria-checked', 'true');
    } else {
      this.element.classList.remove('checked');
      this.element.setAttribute('aria-checked', 'false');
    }
  }

  public toggleCheckbox() {
    if (this.isDisabled) {
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

  public onKeyup(e: KeyboardEvent) {
    const key = e.which || e.keyCode;

    if (key === 13) {
      this.toggleCheckbox();
    }
  }

  public onMouseDown(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.checkbox.classList.contains('ripple')) {
      if (this.ripple === null) {
        this.ripple = new PaperRipple();
        const container = this.element.querySelector('.ripplecontainer');

        if (container != null) {
          container.appendChild(this.ripple.$);
        }
      }

      this.ripple.center = true;
      this.ripple.round = true;

      this.ripple.downAction(e);
    }

    this.toggleCheckbox();
    e.preventDefault();
  }

  public onMouseUp(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.checkbox.classList.contains('ripple') && this.ripple !== null) {
      this.ripple.upAction();
    }
  }
}
