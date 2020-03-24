import { customAttribute } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { findDrawer } from './drawer-util';

@inject(Element)
@customAttribute('dismiss-drawer')
export class DismissDrawerCustomAttribute {

  constructor(private element: HTMLElement) {}

  public bind() {
    this.element.addEventListener('click', this);
  }

  public unbind() {
    this.element.removeEventListener('click', this);
  }

  public handleEvent() {
    const drawer = findDrawer(this.element);
    if (drawer !== null) {
      drawer.dismiss();
    }
  }
}
