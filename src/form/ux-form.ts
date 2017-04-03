import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { DOM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-form')
@processAttributes(processDesignAttributes)

export class UxForm implements Themable {
    @bindable public theme = null;
    @bindable public submitOnEnter: any;

    public view: View;
    private bindSubmitToEnter: boolean = false;

    constructor(private element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

    public created(_: any, myView: View) {
        this.view = myView;
    }

    public bind() {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }

        if (this.submitOnEnter !== undefined) {
            this.bindSubmitToEnter = true;
        }
    }

    public attached() {
        if (this.bindSubmitToEnter) {
            this.element.addEventListener('keyup', (e: KeyboardEvent) => {
                if (e.keyCode === 13) {
                    this.submitForm();
                }
            });
        }
    }

    public detached() {
        if (this.bindSubmitToEnter) {
            this.element.removeEventListener('keyup', (e: KeyboardEvent) => {
                if (e.keyCode === 13) {
                    this.submitForm();
                }
            });
        }
    }

    public themeChanged(newValue: any) {
        this.styleEngine.applyTheme(this, newValue);
    }

    public submitForm() {
        const submitEvent = DOM.createCustomEvent('submit', { bubbles: true, target: this.element });

        this.element.dispatchEvent(submitEvent);
    }
}
