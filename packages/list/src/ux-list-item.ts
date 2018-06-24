import { customElement, bindable, inlineView } from 'aurelia-templating';
import UX_LIST_ITEM_VIEW from './ux-list-item.html';

@customElement('ux-list-item')
@inlineView(UX_LIST_ITEM_VIEW)
export class UxListItem {
  @bindable public theme = null;
}
