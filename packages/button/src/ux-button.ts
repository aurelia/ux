import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine, UxComponent } from 'aurelia-ux';
import { PaperRipple } from './effects/paper-ripple';
import { normalizeBooleanAttribute } from './html-attributes';
import { UxButtonTheme } from './ux-button-theme';

@inject(Element, StyleEngine)
@customElement('ux-button')
export class UxButton implements UxComponent {
  @bindable public type: string | null;
  @bindable public size: string | null;
  @bindable public effect: string | null;

  @bindable public disabled: boolean | string = false;

  @bindable public theme: UxButtonTheme;

  private ripple: PaperRipple | null = null;
  private button: HTMLButtonElement;

  constructor(
    public element: HTMLElement,
    private styleEngine: StyleEngine) {
      styleEngine.ensureDefaultTheme(new UxButtonTheme());
    }

  public bind() {
    if (normalizeBooleanAttribute('disabled', this.disabled)) {
      this.button.setAttribute('disabled', '');
    }

    this.themeChanged(this.theme);
    this.typeChanged(this.type);
    this.sizeChanged(this.size);
    this.effectChanged(this.effect);
  }

  public typeChanged(newValue: string | null) {
    const typeClasses = ['flat', 'raised', 'fab', 'icon'];

    this.button.classList.remove(...typeClasses);

    if (newValue == null || typeClasses.includes(newValue) === false) {
      newValue = 'raised';
    }

    this.button.classList.add(newValue);
  }

  public sizeChanged(newValue: string | null) {
    const sizeClasses = ['small', 'medium', 'large'];

    this.button.classList.remove(...sizeClasses);

    if (newValue == null || sizeClasses.includes(newValue) === false) {
      newValue = 'medium';
    }

    this.button.classList.add(newValue);
  }

  public effectChanged(newValue: string | null) {
    const effectClasses = ['ripple', 'none'];

    this.button.classList.remove(...effectClasses);

    if (newValue == null || effectClasses.includes(newValue) === false) {
      newValue = 'ripple';
    }

    this.button.classList.add(newValue);
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this.element, newValue);
  }

  public disabledChanged(newValue: boolean | string) {
    if (normalizeBooleanAttribute('disabled', newValue)) {
      this.button.setAttribute('disabled', '');
    } else {
      this.button.removeAttribute('disabled');
    }
  }

  public onMouseDown(e: MouseEvent) {
    if (this.button.classList.contains('ripple')) {
      if (this.ripple === null) {
        this.ripple = new PaperRipple();
        this.button.appendChild(this.ripple.$);
      }

      if (this.button.classList.contains('fab') || this.button.classList.contains('icon')) {
        this.ripple.center = true;
        this.ripple.round = true;
      }

      this.ripple.downAction(e);
    }

    return true;
  }

  public onMouseUp() {
    if (this.button.classList.contains('ripple') && this.ripple !== null) {
      this.ripple.upAction();
    }

    return true;
  }
}
