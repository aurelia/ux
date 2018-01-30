import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import {
  StyleEngine,
  UxComponent,
  PaperRipple,
  normalizeBooleanAttribute,
  linkProperty
} from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';
import { ElementEvents, DOM } from 'aurelia-framework';

const theme = new UxRadioTheme();

export interface UxRadioElement extends HTMLElement {
  type: 'radio';
  checked: boolean;
}

@inject(Element, StyleEngine)
@customElement('ux-radio')
export class UxRadio implements UxComponent {
  private ignoreValueChanges: boolean;

  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxRadioTheme;

  public checked: boolean = false;

  @observable({ initializer: () => false })
  public value: boolean;

  private radio: HTMLInputElement;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: UxRadioElement, private styleEngine: StyleEngine) {
    element.type = 'radio';
    linkProperty(element, 'checked');
    styleEngine.ensureDefaultTheme(theme);
  }

  public bind() {
    const element = this.element;
    const radio = this.radio;

    if (element.hasAttribute('id')) {
      const id = element.id;

      if (id != null) {
        radio.setAttribute('id', id);
        element.removeAttribute('id');
      }
    }

    if (element.hasAttribute('tabindex')) {
      const tabIndex = element.getAttribute('tabindex');

      if (tabIndex != null) {
        radio.setAttribute('tabindex', tabIndex);
        element.removeAttribute('tabindex');
      }
    }

    if (element.hasAttribute('checked')) {
      this.element.checked = true;
    }

    if (this.checked) {
      radio.checked = true;
    }

    this.themeChanged(this.theme);
  }

  public attached() {
    this.radio.addEventListener('change', stopEvent);
  }

  public detached() {
    this.radio.removeEventListener('change', stopEvent);
  }

  public getChecked() {
    return this.checked;
  }

  public setChecked(value: any) {
    const oldValue = this.checked;
    const newValue = value;

    if (newValue !== oldValue) {
      this.checked = newValue;
      this.ignoreValueChanges = true;
      this.value = newValue;
      if (this.radio) {
        this.radio.checked = !!newValue;
      }
      this.ignoreValueChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  public themeChanged(newValue: UxRadioTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'radio';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public valueChanged(value: boolean) {
    if (this.ignoreValueChanges) {
      return;
    }
    this.setChecked(value);
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
      const winEvents = new ElementEvents(window);
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
