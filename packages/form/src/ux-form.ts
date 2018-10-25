import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxFormTheme } from './ux-form-theme';

@inject(Element, StyleEngine)
@customElement('ux-form')

export class UxForm implements UxComponent {
  @bindable public theme: UxFormTheme;
  @bindable public submitOnEnter: any;

  private bindSubmitToEnter: boolean = false;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }

    if (this.submitOnEnter !== undefined) {
      this.bindSubmitToEnter = true;
    }
  }

  public attached() {
    if (this.bindSubmitToEnter) {
      this.element.addEventListener('keyup', (e: KeyboardEvent) => {
        let canSubmit = true;

        if (e.srcElement != null && e.srcElement.tagName === 'TEXTAREA') {
          canSubmit = false;
        }

        if (e.keyCode === 13 && canSubmit) {
          this.submitForm();
        }
      });
    }
  }

  public detached() {
    if (this.bindSubmitToEnter) {
      this.element.removeEventListener('keyup', (e: KeyboardEvent) => {
        if (e.keyCode === 13) {
          this.submitForm();
        }
      });
    }
  }

  public themeChanged(newValue: any) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'form';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public submitForm() {
    const submitEvent = DOM.createCustomEvent('submit', { bubbles: true, target: this.element } as any);

    this.element.dispatchEvent(submitEvent);
  }
}
