import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-switch')

export class UxSwitch implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public effect = null;
  @bindable public id: string;
  @bindable public tabindex = 0;
  @bindable public theme: UxSwitchTheme;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  @bindable public checked: boolean = false;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: HTMLElement, public resources: ViewResources, private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(new UxSwitchTheme());
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
          this.toggleSwitch();
        });
      }
    }
  }

  public detached() {
    if (this.id) {
      const labelElement = document.querySelector(`label[for=${this.id}]`);

      if (labelElement != null) {
        labelElement.removeEventListener('click', () => {
          this.toggleSwitch();
        });
      }
    }
  }

  public themeChanged(newValue: UxSwitchTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'switch';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
      this.element.classList.add('disabled');
    } else if (this.element.classList.contains('disabled')) {
      this.element.classList.remove('disabled');
    }
  }

  public checkedChanged() {
    if (this.checked) {
      this.element.classList.add('on');
      this.element.setAttribute('aria-checked', 'true');
    } else {
      this.element.classList.remove('on');
      this.element.setAttribute('aria-checked', 'false');
    }
  }

  public toggleSwitch() {
    if (this.isDisabled) {
      return;
    }

    this.checked = !this.checked;
  }

  public onKeydown(e: KeyboardEvent) {
    const key = e.which || e.keyCode;

    if (key === 13 || key === 32) {
      e.preventDefault();

      this.toggleSwitch();
    }

    return true;
  }
}
