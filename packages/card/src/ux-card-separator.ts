import { inject, useView, PLATFORM } from 'aurelia-framework';
import { customElement } from 'aurelia-templating';

@inject(Element)
@customElement('ux-card-separator')
@useView(PLATFORM.moduleName('./ux-card-separator.html'))
export class UxCardSeparator {

  constructor(
    public element: HTMLElement) { }

  public bind() {
    if (this.element.hasAttribute('no-margin')) {
      this.element.classList.add('ux-card__separator--no-margin');
    }
  }
}
