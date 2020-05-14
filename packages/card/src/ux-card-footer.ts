import { customElement, useView } from 'aurelia-templating';
import { PLATFORM } from 'aurelia-pal';

@customElement('ux-card-footer')
@useView(PLATFORM.moduleName('./ux-card-footer.html'))
export class UxCardFooter {
}
