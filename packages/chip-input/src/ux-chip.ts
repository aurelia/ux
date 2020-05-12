import { customElement, bindable, observable, useView } from 'aurelia-framework';
import { DOM, PLATFORM } from 'aurelia-pal';
import { bindingMode } from 'aurelia-binding';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from '@aurelia-ux/core';
import { UxChipTheme } from './ux-chip-theme';

@inject(Element, StyleEngine)
@customElement('ux-chip')
@useView(PLATFORM.moduleName('./ux-chip.html'))
export class UxChip implements UxComponent {
  @bindable public theme: UxChipTheme;
  @bindable public variant: 'filled' | 'outline' = 'filled';
  @bindable public selectedIcon: string = 'check';

  @observable
  public focused: boolean = false;

  @bindable({ defaultBindingMode: bindingMode.twoWay })
  public selected: any = undefined;

  private isFocused: () => void;

  constructor(
    public element: HTMLInputElement,
    private styleEngine: StyleEngine) { }

  public bind() {
    this.themeChanged(this.theme);

    if (this.element.hasAttribute('deletable')) {
      this.element.removeAttribute('deletable');
      this.element.classList.add('ux-chip--deletable');
    }
  }

  public attached() {
    this.isFocused = () => {
      this.focused = document.activeElement === this.element;
    };
    window.addEventListener('focus', this.isFocused, true);
    window.addEventListener('blur', this.isFocused, true);
  }

  public detached() {
    window.removeEventListener('focus', this.isFocused, true);
    window.removeEventListener('blur', this.isFocused, true);
  }

  public themeChanged(newValue: UxChipTheme) {
    if (newValue != null && newValue.themeKey == null) {
      newValue.themeKey = 'chip';
    }

    this.styleEngine.applyTheme(newValue, this.element);
  }

  public closeChip(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    const closeEvent = DOM.createCustomEvent('close', { bubbles: false });

    this.element.dispatchEvent(closeEvent);
  }
}
