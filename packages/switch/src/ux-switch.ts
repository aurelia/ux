import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';
import { DOM, ElementEvents } from 'aurelia-framework';

const theme = new UxSwitchTheme();

export interface UxSwitchElement extends HTMLElement {
  type: 'checkbox';
  checked: boolean;
}

@inject(Element, StyleEngine)
@customElement('ux-switch')
export class UxSwitch implements UxComponent {
  private ignoreValueChanges: boolean;

  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxSwitchTheme;

  public checked: any;

  @observable({ initializer: () => false })
  public value: boolean;

  private checkbox: HTMLInputElement;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: UxSwitchElement, private styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, uxSwitchElementProto);
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {
    const element = this.element;
    const checkbox = this.checkbox;

    if (element.hasAttribute('id')) {
      const attributeValue = element.getAttribute('id');

      if (attributeValue != null) {
        checkbox.setAttribute('id', attributeValue);
      }
    }

    if (element.hasAttribute('tabindex')) {
      const attributeValue = element.getAttribute('tabindex');

      if (attributeValue != null) {
        checkbox.setAttribute('tabindex', attributeValue);
      }
    }

    if (element.hasAttribute('checked')) {
      const attributeValue = element.getAttribute('checked');

      if (attributeValue || attributeValue === '') {
        element.checked = true;
      }
    }

    this.themeChanged(this.theme);
    this.disabledChanged(this.disabled);
  }

  public attached() {
    this.checkbox.addEventListener('change', stopEvent);
  }

  public detached() {
    this.checkbox.removeEventListener('change', stopEvent);
  }

  public getChecked() {
    return this.checked;
  }

  public setChecked(value: any) {
    const oldValue = this.checked;
    const newValue = !!value;

    if (newValue !== oldValue) {
      this.checked = newValue;
      this.ignoreValueChanges = true;
      this.value = newValue;
      this.ignoreValueChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  public valueChanged(newValue: boolean) {
    if (this.ignoreValueChanges) {
      return;
    }
    this.setChecked(newValue);
  }

  public themeChanged(newValue: UxSwitchTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'switch';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
      this.checkbox.setAttribute('disabled', '');
    } else if (this.element.classList.contains('disabled')) {
      this.checkbox.removeAttribute('disabled');
    }
  }

  public onMouseDown(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.element.classList.contains('ripple')) {
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
      const winEvents = new ElementEvents(window as any);
      const upAction = () => {
        this.ripple!.upAction();
        winEvents.disposeAll();
      };
      winEvents.subscribe('blur', upAction);
      winEvents.subscribe('mouseup', upAction, true);
    }

    e.preventDefault();
  }
}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxSwitchElementProto = Object.create(HTMLElement.prototype, {
  type: {
    value: 'checkbox',
  },
  checked: {
    get() {
      return getVm<UxSwitch>(this).getChecked();
    },
    set(value: boolean) {
      getVm<UxSwitch>(this).setChecked(value);
    }
  }
});
