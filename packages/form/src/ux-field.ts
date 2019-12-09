import { customElement, bindable } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';

@inject(Element)
@customElement('ux-field')
export class UxField {
  @bindable public label: string;

  private labelElement: HTMLLabelElement;

  constructor(private element: Element) { }

  public attached() {
    if (this.label && !this.element.querySelector('label')) {
      this.labelElement = document.createElement('label');
      this.labelElement.classList.add('ux-field__label');
      this.labelElement.textContent = this.label;

      this.element.insertBefore(this.labelElement, this.element.firstChild);
    }
  }

  public labelChanged(newValue: string) {
    if (this.labelElement != null) {
      this.labelElement.textContent = newValue;
    }
  }
}
