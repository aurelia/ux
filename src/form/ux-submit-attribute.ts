import { inject } from 'aurelia-dependency-injection';
import { DOM } from 'aurelia-pal';

@inject(Element)
export class UxSubmitCustomAttribute {
    public submitEvent: CustomEvent;
    private canSubmit: boolean = false;

    constructor(public element: Element) { }

    public attached() {
        let currentParent = this.element.parentElement;

        while (currentParent != null) {
            if (currentParent.tagName === 'UX-FORM') {

                this.canSubmit = true;
                this.submitEvent = DOM.createCustomEvent('submit', { bubbles: true });

                this.element.addEventListener('mouseup', () => {
                    this.element.dispatchEvent(this.submitEvent);
                });

                break;
            }

            currentParent = currentParent.parentElement;
        }
    }

    public detached() {
        if (this.canSubmit) {
            this.element.removeEventListener('mouseup', () => {
                this.element.dispatchEvent(this.submitEvent);
            });
        }
    }
}
