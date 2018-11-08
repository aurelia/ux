import { customElement, bindable } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxChipInputTheme } from './ux-chip-input-theme';

@inject(Element, StyleEngine)
@customElement('ux-chip-input')

export class UxChipInput implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public readonly: boolean | string = false;
  @bindable public theme: UxChipInputTheme;
  @bindable public label: any;
  @bindable public separator: string = ', ';

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public value: any = undefined;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public chips: string[] = new Array<string>();

  private textbox: HTMLInputElement;
  private chiprepeat: Element;
  private tagrepeat: Element;

  constructor(private element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);

    if (this.element.hasAttribute('placeholder')) {
      const attributeValue = this.element.getAttribute('placeholder');

      if (attributeValue) {
        this.textbox.setAttribute('placeholder', attributeValue);
        this.element.removeAttribute('placeholder');
      }
    }

    if (this.value) {
      this.chips = this.value.split(this.separator);
    }

    if (normalizeBooleanAttribute('disabled', this.disabled)) {
      this.textbox.setAttribute('disabled', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    }

    if (normalizeBooleanAttribute('readonly', this.readonly)) {
      this.textbox.setAttribute('readonly', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    }
  }

  public attached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.addEventListener('focus', () => {
      this.element.classList.add('ux-chip-input--focused');
    });

    this.textbox.addEventListener('blur', () => {
      this.addChip();
      this.element.classList.remove('ux-chip-input--focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public detached() {
    const blurEvent = DOM.createCustomEvent('blur', { bubbles: true });

    this.textbox.removeEventListener('focus', () => {
      this.element.classList.add('ux-chip-input--focused');
    });

    this.textbox.removeEventListener('blur', () => {
      this.addChip();
      this.element.classList.remove('ux-chip-input--focused');
      this.element.dispatchEvent(blurEvent);
    });
  }

  public handleKeyup(event: KeyboardEvent) {
    const key = event.which || event.keyCode;

    if (key === 13) {
      this.addChip();
    }

    if (key === 37) {
      if (this.chips && this.textbox.value === '') {
        const chip = this.chips.pop();

        if (chip !== undefined) {
          this.textbox.value = chip;
        }
      }
    }
  }

  public addChip() {
    if (this.textbox.value.length) {
      if (!this.chips) {
        this.chips = new Array<string>();
      }

      this.chips.push(this.textbox.value);
      this.textbox.value = '';
      this.chipsChanged();
    }
  }

  public editChip(value: string) {
    if (this.textbox.value.length === 0) {
      this.removeChip(value);
      this.textbox.value = value;
      this.chipsChanged();
    }
  }

  public removeChip(value: string) {
    const chipIndex = this.chips.indexOf(value, 0);

    if (chipIndex > -1) {
      this.chips.splice(chipIndex, 1);
      this.chipsChanged();
    }
  }

  public chipsChanged() {
    let chipValue: string | null = this.chips.join(this.separator);

    if (chipValue === '') {
      chipValue = null;
    }

    if (chipValue !== this.value) {
      this.value = chipValue;
    }
  }

  public valueChanged(newValue: string) {
    if (newValue && newValue !== this.chips.join(this.separator)) {
      this.chips = newValue.split(this.separator);
    }
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue)) {
      this.textbox.setAttribute('disabled', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    } else {
      this.textbox.removeAttribute('disabled');
      this.chiprepeat.setAttribute('deletable', '');
      this.tagrepeat.setAttribute('deletable', '');
    }
  }

  public readonlyChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('readonly', newValue)) {
      this.textbox.setAttribute('readonly', '');
      this.chiprepeat.removeAttribute('deletable');
      this.tagrepeat.removeAttribute('deletable');
    } else {
      this.textbox.removeAttribute('readonly');
      this.chiprepeat.setAttribute('deletable', '');
      this.tagrepeat.setAttribute('deletable', '');
    }
  }

  public themeChanged(newValue: UxChipInputTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip-input';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }
}
