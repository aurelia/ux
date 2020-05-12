import { customElement, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';

@customElement('ux-card-content')
@useView(PLATFORM.moduleName('./ux-card-content.html'))
export class UxCardContent {
}
