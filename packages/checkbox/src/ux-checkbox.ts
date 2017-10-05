import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from 'aurelia-ux';
import { Themable } from 'aurelia-ux';
import { processDesignAttributes } from 'aurelia-ux';
import { UxCheckboxTheme } from './ux-checkbox-theme';
import { PaperRipple } from '../../effects/paper-ripple';
import { normalizeBooleanAttribute } from '../../resources/html-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-checkbox')
@processAttributes(processDesignAttributes)

export class UxCheckbox implements Themable {
  @bindable public disabled: boolean | string = false;
  @bindable public effect = null;
  @bindable public id: string;
  @bindable public label: string;
  @bindable public matcher = (a: any, b: any) => a === b;
  @bindable public model: any;
  @bindable public tabindex = 0;
  @bindable public theme: UxCheckboxTheme;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public checked: any = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public value: any = null;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public uncheckedValue: any = null;

  public view: View;
  private checkbox: Element;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: HTMLElement, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    this.themeChanged(this.theme);

    if (this.checked) {
      this.checkedChanged();
    }

    if (normalizeBooleanAttribute('disabled', this.disabled) && !this.element.classList.contains('disabled')) {
      this.element.classList.add('disabled');
    } else if (this.element.classList.contains('disabled')) {
      this.element.classList.remove('disabled');
    }
  }

  public attached() {
    if (this.id) {
      const labelElement = document.querySelector(`label[for=${this.id}]`);

      if (labelElement != null) {
        labelElement.addEventListener('click', () => {
          this.toggleCheckbox();
        });
      }
    }
  }

  public detached() {
    if (this.id) {
      const labelElement = document.querySelector(`label[for=${this.id}]`);

      if (labelElement != null) {
        labelElement.removeEventListener('click', () => {
          this.toggleCheckbox();
        });
      }
    }
  }

  public themeChanged(newValue: UxCheckboxTheme) {
    if (newValue == null) {
      newValue = {
        effect: 'ripple'
      };
    }

    this.styleEngine.applyTheme(this, newValue);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
      this.element.classList.add('disabled');
    } else if (this.element.classList.contains('disabled')) {
      this.element.classList.remove('disabled');
    }
  }

  public checkedChanged() {
    const elementValue = this.model ? this.model : this.value;

    let isChecked = this.checked;

    if (Array.isArray(this.checked)) {
      isChecked = this.checked.some(item => this.matcher(item, elementValue));
    }

    if (isChecked && isChecked !== this.uncheckedValue) {
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
    } else if (elementValue != null && typeof elementValue !== 'boolean') {
      if (this.checked && this.checked !== this.uncheckedValue) {
        if (this.uncheckedValue != null) {
          this.checked = this.uncheckedValue;
        } else {
          this.checked = null;
        }
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
