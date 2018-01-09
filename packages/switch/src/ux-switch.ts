import { customElement, bindable } from 'aurelia-templating';
import { computedFrom } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxSwitchTheme } from './ux-switch-theme';

const theme = new UxSwitchTheme();

@inject(Element, StyleEngine)
@customElement('ux-switch')
export class UxSwitch implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxSwitchTheme;
  @bindable public checked: any;

  private checkbox: HTMLInputElement;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) {
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {
    if (this.element.hasAttribute('id')) {
      const attributeValue = this.element.getAttribute('id');

      if (attributeValue != null) {
        this.checkbox.setAttribute('id', attributeValue);
      }
    }

    if (this.element.hasAttribute('tabindex')) {
      const attributeValue = this.element.getAttribute('tabindex');

      if (attributeValue != null) {
        this.checkbox.setAttribute('tabindex', attributeValue);
      }
    }

    if (this.element.hasAttribute('checked')) {
      const attributeValue = this.element.getAttribute('checked');

      if (attributeValue === 'true') {
        this.checked = true;
      }
    }

    this.themeChanged(this.theme);
    this.disabledChanged(this.disabled);
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
    }

    e.preventDefault();
  }

  public onMouseUp(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    if (this.element.classList.contains('ripple') && this.ripple !== null) {
      this.ripple.upAction();
    }
  }
}
