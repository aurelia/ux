import { customAttribute, inject } from "aurelia-framework";

@inject(Element)
@customAttribute('attach-focus-drawer')
export class AttachFocusDrawerAttribute {

  public value: boolean | string;

  constructor(private element: HTMLElement) {}

  public attached() {
    console.log('attach-focus-drawer attribute attached', this);
    if (this.value === '' || this.value === 'attach-focus-drawer' || (this.value && this.value !== 'false')) {
      this.element.focus();
    }
  }
}
