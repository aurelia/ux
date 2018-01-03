import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, PaperRipple, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';

const theme = new UxRadioTheme();

@inject(Element, StyleEngine)
@customElement('ux-radio')
export class UxRadio implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxRadioTheme;
  @bindable public matcher: any;
  @bindable public model: any;

  @bindable({ defaultBindingMode: bindingMode.twoWay }) public checked: any;
  @bindable({ defaultBindingMode: bindingMode.twoWay }) public value: any;

  private radio: HTMLInputElement;
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
        this.radio.setAttribute('id', attributeValue);
        this.element.removeAttribute('id');
      }
    }

    if (this.element.hasAttribute('tabindex')) {
      const attributeValue = this.element.getAttribute('tabindex');

      if (attributeValue != null) {
        this.radio.setAttribute('tabindex', attributeValue);
        this.element.removeAttribute('tabindex');
      }
    }

    this.themeChanged(this.theme);
    this.disabledChanged(this.disabled);
  }

  public themeChanged(newValue: UxRadioTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'radio';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue) && !this.element.classList.contains('disabled')) {
      this.radio.setAttribute('disabled', '');
    } else if (this.element.classList.contains('disabled')) {
      this.radio.removeAttribute('disabled');
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
