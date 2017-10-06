import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';

@inject(Element)
@customElement('ux-field')

export class UxField {
  @bindable public label: string;

  constructor(private element: Element) { }

  public attached() {
    if (this.label && !this.element.querySelector('label')) {
      const newLabel = document.createElement('label');

      newLabel.textContent = this.label;

      this.element.insertBefore(newLabel, this.element.firstChild);
    }
  }
}
