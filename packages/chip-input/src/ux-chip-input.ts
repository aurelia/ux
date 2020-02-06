import { customElement, bindable } from 'aurelia-templating';
import { bindingMode, observable } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent, normalizeBooleanAttribute } from '@aurelia-ux/core';
import { UxChipInputTheme } from './ux-chip-input-theme';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/styles/ux-input-component.css';
// tslint:disable-next-line: no-submodule-imports
import '@aurelia-ux/core/styles/ux-input-component--outline.css';

@inject(Element, StyleEngine)
@customElement('ux-chip-input')
export class UxChipInput implements UxComponent {
  @bindable public disabled: boolean | string = false;
  @bindable public readonly: boolean | string = false;
  @bindable public theme: UxChipInputTheme;
  @bindable public label: any;
  @bindable public separator: string = ', ';
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public chipVariant: 'filled' | 'outline' = 'filled';

  @observable
  public focused: boolean = false;

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

  public focus() {
    this.focused = true;
  }

  public focusedChanged() {
    this.element.classList.toggle('ux-input-component--focused', this.focused);
    if (!this.focused) {
      // blur
      this.addChip();
    }
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
    if (!this.textbox) {
      return;
    }
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

    this.element.classList.toggle('ux-input-component--has-value', this.chips.length > 0);
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

  public variantChanged(newValue: string) {
    if (newValue === 'outline') {
      let parentBackgroundColor = '';
      let el: HTMLElement = this.element;
      while (parentBackgroundColor === '' && el.parentElement) {
        let color = window.getComputedStyle(el.parentElement, null).getPropertyValue('background-color');
        if (color.toString() === 'rgba(0, 0, 0, 0)') {
          color = '';
        }
        parentBackgroundColor = color;
        el = el.parentElement;
      }
      this.element.style.backgroundColor = parentBackgroundColor || '#FFFFFF';
    } else {
      this.element.style.backgroundColor = '';
    }
  }

  public stopEvent(event: Event) {
    event.stopPropagation();
  }
}
