import { customElement, bindable, inlineView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import * as UX_FIELD_VIEW from './ux-field.html';

@inject(Element)
@customElement('ux-field')
@inlineView(UX_FIELD_VIEW)
export class UxField {
  @bindable public label: string;

  private labelElement: HTMLLabelElement;

  constructor(private element: Element) { }

  public attached() {
    if (this.label && !this.element.querySelector('label')) {
      this.labelElement = document.createElement('label');

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
