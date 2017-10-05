import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from 'aurelia-ux';
import { Themable } from 'aurelia-ux';
import { processDesignAttributes } from 'aurelia-ux';
import { PaperRipple } from '../../effects/paper-ripple';
import { normalizeBooleanAttribute } from '../../resources/html-attributes';

@inject(ViewResources, StyleEngine)
@customElement('ux-button')
@processAttributes(processDesignAttributes)
export class UxButton implements Themable {
  @bindable public type = null;
  @bindable public size = null;
  @bindable public effect = null;
  @bindable public disabled: boolean | string = false;
  @bindable public theme = null;

  public view: View;
  private ripple: PaperRipple | null = null;
  private button: HTMLButtonElement;

  constructor(public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (normalizeBooleanAttribute('disabled', this.disabled)) {
      this.button.setAttribute('disabled', '');
    }

  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
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
