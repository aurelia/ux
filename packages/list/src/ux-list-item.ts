import { customElement, bindable, inlineView } from 'aurelia-templating';
import VIEW from './ux-list-item.html';

@customElement('ux-list-item')
@inlineView(VIEW)
export class UxListItem {
  @bindable public theme = null;
}
