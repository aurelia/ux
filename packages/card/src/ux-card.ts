import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';
import { UxComponent, StyleEngine } from '@aurelia-ux/core';
import { UxCardTheme } from './ux-card-theme';

@inject(Element, StyleEngine)
@customElement('ux-card')
export class UxCard implements UxComponent {
  @bindable public xs?: string;
  @bindable public sm?: string;
  @bindable public md?: string;
  @bindable public lg?: string;
  @bindable public xl?: string;
  @bindable public order?: string;
  @bindable public theme: UxCardTheme;

  constructor(public element: HTMLElement, private styleEngine: StyleEngine) { }

  public bind() {
    if (this.theme != null) {
      this.themeChanged(this.theme);
    }
    this.xsChanged(this.xs);
    this.smChanged(this.sm);
    this.mdChanged(this.md);
    this.lgChanged(this.lg);
    this.xlChanged(this.xl);
  }

  public xsChanged(newValue?: string) {
    this.sizeChanged('xs', newValue);
  }

  public smChanged(newValue?: string) {
    this.sizeChanged('sm', newValue);
  }

  public mdChanged(newValue?: string) {
    this.sizeChanged('md', newValue);
  }

  public lgChanged(newValue?: string) {
    this.sizeChanged('lg', newValue);
  }

  public xlChanged(newValue?: string) {
    this.sizeChanged('xl', newValue);
  }

  public sizeChanged(size: string, value?: string) {
    for (let i = 0; i < 10; i++) {
      this.element.classList.remove(`ux-card--${size}-${i}`);
      this.element.classList.remove(`ux-card--order-${this.order}-${size}-${i}`);
    }

    if (typeof value === 'string') {
      this.element.classList.add(`ux-card--${size}-${value}`);

      if (typeof this.order === 'string') {
        this.element.classList.add(`ux-card--order-${this.order}-${size}-${value}`);
      }
    }
  }

  public orderChanged() {
    this.xsChanged(this.xs);
    this.smChanged(this.sm);
    this.mdChanged(this.md);
    this.lgChanged(this.lg);
    this.xlChanged(this.xl);
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(newValue, this.element);
  }
}
