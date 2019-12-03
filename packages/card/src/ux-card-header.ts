import { inject } from 'aurelia-dependency-injection';
import { bindable, customElement } from 'aurelia-templating';

@inject(Element)
@customElement('ux-card-header')
export class UxCardHeader {
  @bindable public color: string;

  constructor(public element: HTMLElement) {}

  public async bind() {
    this.colorChanged(this.color);
  }

  public async colorChanged(newValue: string) {
    this.element.classList.remove(
      'ux-card__header--accent',
      'ux-card__header--primary'
    );

    if (newValue === 'primary') {
      this.element.classList.add('ux-card__header--primary');
    }
    if (newValue === 'accent') {
      this.element.classList.add('ux-card__header--accent');
    }
  }
}
