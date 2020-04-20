import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findModal } from './modal-util';

@inject(Element)
@customAttribute('ok-modal')
export class OkModalAttribute {

  value: any;

  constructor(private element: HTMLElement) {}

  public bind() {
    this.element.addEventListener('click', this);
  }

  public unbind() {
    this.element.removeEventListener('click', this);
  }

  public handleEvent() {
    const modal = findModal(this.element);
    if (modal !== null) {
      modal.ok(this.value);
    }
  }
}
