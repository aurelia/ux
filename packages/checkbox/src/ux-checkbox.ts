import { customElement, bindable, ElementEvents, useView } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';

import {
  StyleEngine,
  UxComponent,
  PaperRipple,
  normalizeBooleanAttribute,
} from '@aurelia-ux/core';

import { UxCheckboxTheme } from './ux-checkbox-theme';
import { DOM, PLATFORM } from 'aurelia-pal';

export interface UxCheckboxElement extends HTMLElement {
  type: 'checkbox';
  checked: boolean;
}

@inject(Element, StyleEngine)
@customElement('ux-checkbox')
@useView(PLATFORM.moduleName('./ux-checkbox.html'))
export class UxCheckbox implements UxComponent, EventListenerObject {
  private ignoreValueChanges: boolean = false;
  private label?: HTMLLabelElement;

  @bindable public disabled: boolean | string = false;
  @bindable public effect = 'ripple';
  @bindable public id: string;
  @bindable public theme: UxCheckboxTheme;

  @observable()
  public checked: boolean;

  @observable()
  public value: boolean;

  @observable()
  public focused: boolean;

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
    Object.setPrototypeOf(element, uxCheckboxElementProto);
  }

  handleEvent(evt: Event): void {
    switch (evt.currentTarget) {
      case this.label:
        switch (evt.type) {
          case 'mousedown': this.onLabelMouseDown(evt as MouseEvent); break;
        }
        break;
      case this.checkbox:
        switch (evt.type) {
          case 'change': stopEvent(evt); break;
        }
        break;
    }
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

    this.valueChanged(this.value);
    this.disabledChanged(this.checkbox.disabled);
    this.themeChanged(this.theme);
  }

  public attached() {
    this.checkbox.addEventListener('change', this);
    if (this.element.nextElementSibling && (this.element.nextElementSibling as HTMLLabelElement).tagName === 'LABEL') {
      this.label = this.element.nextElementSibling as HTMLLabelElement;
      this.label.addEventListener('mousedown', this);
      this.label.style.cursor = 'pointer';
    }
  }

  public detached() {
    this.checkbox.removeEventListener('change', this);
    if (this.label) {
      this.label.removeEventListener('mousedown', this);
    }
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

  public checkedChanged(newValue: any, oldValue: any) {
    if (newValue === oldValue) {
      return;
    }

    if (newValue === true) {
      this.element.classList.add('ux-checkbox--checked');
    } else {
      this.element.classList.remove('ux-checkbox--checked');
    }
  }

  public disabledChanged(newValue: boolean) {
    if (newValue === true) {
      this.element.classList.add('ux-checkbox--disabled');
    } else {
      this.element.classList.remove('ux-checkbox--disabled');
    }
  }

  public focusedChanged(newValue: boolean) {
    if (newValue === true) {
      this.element.classList.add('ux-checkbox--focused');
    } else {
      this.element.classList.remove('ux-checkbox--focused');
    }
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

  private onLabelMouseDown(e: MouseEvent) {
    this.value = !this.value;
    this.showRipple(e);
  }

  public onMouseDown(e: MouseEvent) {
    if (e.button !== 0 || this.isDisabled) {
      return;
    }

    this.showRipple(e);

    // TODO: 6.2.2020 - Follow up to make sure we don't need to return false / preventDefault ?
    // https://github.com/aurelia/ux/pull/232#discussion_r375815578
    return true;
  }

  private showRipple(e: MouseEvent) {
    if (!this.element.classList.contains('ripple')) {
      return;
    }
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
}

function stopEvent(e: Event) {
  e.stopPropagation();
}

const getVm = <T>(_: any) => _.au.controller.viewModel as T;
const uxCheckboxElementProto = Object.create(HTMLElement.prototype, {
  type: {
    value: 'checkbox',
  },
  checked: {
    get() {
      return getVm<UxCheckbox>(this).getChecked();
    },
    set(value: boolean) {
      getVm<UxCheckbox>(this).setChecked(value);
    }
  },
  indeterminate: {
    get() {
      return getVm<UxCheckbox>(this).getIndeterminate();
    },
    set(value: boolean) {
      getVm<UxCheckbox>(this).setIndeterminate(value);
    }
  }
});
