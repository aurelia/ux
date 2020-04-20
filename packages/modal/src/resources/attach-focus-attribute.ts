import { customAttribute, inject } from "aurelia-framework";

@inject(Element)
@customAttribute('ux-attach-focus')
export class AttachFocusAttribute {

  public value: boolean | string;

  constructor(private element: HTMLElement) {}

  public attached() {
    if (this.value === '' || this.value === 'attach-focus' || (this.value && this.value !== 'false')) {
      this.element.focus();
    }
  }
}
