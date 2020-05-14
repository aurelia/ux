import { customElement, bindable, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';

@customElement('ux-list-item')
@useView(PLATFORM.moduleName('./ux-list-item.html'))
export class UxListItem {
  @bindable public theme = null;
}
