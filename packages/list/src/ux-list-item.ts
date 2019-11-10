import { customElement, bindable, inlineView } from 'aurelia-templating';
import * as VIEW from './ux-list-item.html';

@customElement('ux-list-item')
@inlineView(VIEW)
export class UxListItem {
  @bindable public theme = null;
}
