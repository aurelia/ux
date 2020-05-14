import { customElement, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';

@customElement('ux-card-action-row')
@useView(PLATFORM.moduleName('./ux-card-action-row.html'))
export class UxCardActionRow {
}
