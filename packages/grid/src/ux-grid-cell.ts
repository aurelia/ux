import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';

@inject(Element)
@customElement('ux-grid-cell')
export class UxGridCell {
  @bindable public xs?: string;
  @bindable public sm?: string;
  @bindable public md?: string;
  @bindable public lg?: string;
  @bindable public xl?: string;
  @bindable public order?: string;

  constructor(private element: HTMLElement) { }

  public async bind() {
    this.processAttributes();

    this.xsChanged(this.xs);
    this.smChanged(this.sm);
    this.mdChanged(this.md);
    this.lgChanged(this.lg);
    this.xlChanged(this.xl);
  }

  public processAttributes() {
    const alignAttributes = [
      'align-self-top',
      'align-self-middle',
      'align-self-bottom',
      'align-self-stretch'
    ];

    for (const attribute of alignAttributes) {
      if (this.element.hasAttribute(attribute)) {
        this.element.removeAttribute(attribute);
        this.element.classList.add(`ux-grid-cell--${attribute}`);
      }
    }
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
      this.element.classList.remove(`ux-grid-cell--${size}-${i}`);
      this.element.classList.remove(`ux-grid-cell--order-${this.order}-${size}-${i}`);
    }

    if (typeof value === 'string') {
      this.element.classList.add(`ux-grid-cell--${size}-${value}`);

      if (typeof this.order === 'string') {
        this.element.classList.add(`ux-grid-cell--order-${this.order}-${size}-${value}`);
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
}
