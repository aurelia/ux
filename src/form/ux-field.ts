import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-field')
@processAttributes(processDesignAttributes)

export class UxField implements Themable {
    @bindable public theme = null;
    @bindable public label: string;

    public view: View;

    constructor(private element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

    public created(_: any, myView: View) {
        this.view = myView;
    }

    public bind() {
        if (this.theme) {
            this.styleEngine.applyTheme(this, this.theme);
        }
    }

    public attached() {
        if (this.label && !this.element.querySelector('label')) {
            const newLabel = document.createElement('label');

            newLabel.textContent = this.label;

            this.element.insertBefore(newLabel, this.element.firstChild);
        }
    }

    public themeChanged(newValue: any) {
        this.styleEngine.applyTheme(this, newValue);
    }
}
