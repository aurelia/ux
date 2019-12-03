import { customElement, bindable } from 'aurelia-templating';

@customElement('ux-list-item')
export class UxListItem {
  @bindable public theme = null;
}
