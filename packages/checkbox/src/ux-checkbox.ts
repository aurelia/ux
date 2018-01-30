import { customElement, bindable, ElementEvents } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';

import {
  StyleEngine,
  UxComponent,
  PaperRipple,
  normalizeBooleanAttribute,
  linkProperty
} from '@aurelia-ux/core';

import { UxCheckboxTheme } from './ux-checkbox-theme';
import { DOM } from 'aurelia-pal';

export interface UxCheckboxElement extends HTMLElement {
  type: 'checkbox';
  checked: boolean;
}

const theme = new UxCheckboxTheme();

@inject(Element, StyleEngine)
@customElement('ux-checkbox')
export class UxCheckbox implements UxComponent {
  private ignoreValueChanges: boolean = false;

  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxCheckboxTheme;

  public checked: boolean;

  @observable({ initializer: () => false })
  public value: boolean;

  private indeterminate: boolean;

  private checkbox: HTMLInputElement;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(
    public element: UxCheckboxElement,
    private styleEngine: StyleEngine
  ) {
    linkProperty(element, ['checked', 'indeterminate']);
    element.type = 'checkbox';

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

  public getIndeterminate() {
    return this.indeterminate;
  }

  public setIndeterminate(value: any) {
    this.indeterminate = !!value;
  }

  public themeChanged(newValue: UxCheckboxTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'checkbox';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public valueChanged(newValue: boolean) {
    if (this.ignoreValueChanges) {
      return;
    }
    this.setChecked(newValue);
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
