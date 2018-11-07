import { customElement, bindable } from 'aurelia-templating';
import { computedFrom, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import {
  StyleEngine,
  UxComponent,
  PaperRipple,
  normalizeBooleanAttribute
} from '@aurelia-ux/core';
import { UxRadioTheme } from './ux-radio-theme';
import { ElementEvents, DOM } from 'aurelia-framework';

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

  @observable()
  public focused: boolean;

  private radio: HTMLInputElement;
  private ripple: PaperRipple | null = null;

  @computedFrom('disabled')
  public get isDisabled() {
    return normalizeBooleanAttribute('disabled', this.disabled);
  }

  constructor(public element: UxRadioElement, private styleEngine: StyleEngine) {
    Object.setPrototypeOf(element, uxRadioElementProto);
  }

  public bind() {
    if (this.element.hasAttribute('id')) {
      const id = this.element.id;

      if (id != null) {
        this.radio.setAttribute('id', id);
        this.element.removeAttribute('id');
      }
    }

    if (this.element.hasAttribute('tabindex')) {
      const tabIndex = this.element.getAttribute('tabindex');

      if (tabIndex != null) {
        this.radio.setAttribute('tabindex', tabIndex);
        this.element.removeAttribute('tabindex');
      }
    }

    if (this.element.hasAttribute('name')) {
      const name = this.element.getAttribute('name');

      if (name != null) {
        this.radio.setAttribute('name', name);
        this.element.removeAttribute('name');
      }
    }

    if (this.element.hasAttribute('checked')) {
      this.element.checked = true;
    }

    if (this.checked) {
      this.radio.checked = true;
      this.element.classList.add('ux-radio--checked');
    }

    this.disabledChanged(this.radio.disabled);
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

        if (this.radio.checked) {
          this.element.classList.add('ux-radio--checked');
        } else {
          this.element.classList.remove('ux-radio--checked');
        }
      }

      this.ignoreValueChanges = false;
      this.element.dispatchEvent(DOM.createCustomEvent('change', { bubbles: true }));
    }
  }

  public disabledChanged(newValue: boolean) {
    if (newValue === true) {
      this.element.classList.add('ux-radio--disabled');
    } else {
      this.element.classList.remove('ux-radio--disabled');
    }
  }

  public focusedChanged(newValue: boolean) {
    if (newValue === true) {
      this.element.classList.add('ux-radio--focused');
    } else {
      this.element.classList.remove('ux-radio--focused');
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
const uxRadioElementProto = Object.create(HTMLElement.prototype, {
  type: {
    value: 'radio',
  },
  checked: {
    get() {
      return getVm<UxRadio>(this).getChecked();
    },
    set(value: boolean) {
      getVm<UxRadio>(this).setChecked(value);
    }
  }
});
