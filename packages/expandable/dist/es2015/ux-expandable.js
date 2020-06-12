import { __decorate } from "tslib";
import { customElement, useView, PLATFORM, bindable, TaskQueue, inject } from 'aurelia-framework';
import { StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
let UxExpandable = /** @class */ (() => {
    var UxExpandable_1;
    let UxExpandable = UxExpandable_1 = class UxExpandable {
        constructor(element, styleEngine, taskQueue) {
            this.element = element;
            this.styleEngine = styleEngine;
            this.taskQueue = taskQueue;
            this.openBoolean = false;
            this.open = false;
            this.accordion = false;
        }
        themeChanged(newValue) {
            if (newValue != null && newValue.themeKey == null) {
                newValue.themeKey = 'expandable';
            }
            this.styleEngine.applyTheme(newValue, this.element);
        }
        openChanged() {
            this.openBoolean = normalizeBooleanAttribute('open', this.open);
            this.updateContainerHeight();
            this.element.dispatchEvent(new CustomEvent(UxExpandable_1.OPEN_CHANGED_EVENT, { detail: { component: this, open: this.openBoolean } }));
        }
        handleEvent(e) {
            switch (e.type) {
                case 'transitionend':
                    this.setContentContainerHeightToAuto();
                    break;
            }
        }
        setContentContainerHeightToAuto() {
            this.contentContainer.style.overflow = "visible";
            this.contentContainer.style.height = "auto";
            this.contentContainer.removeEventListener("transitionend", this);
        }
        bind() { }
        attached() {
            this.openChanged();
        }
        updateContainerHeight() {
            if (this.openBoolean) {
                // after transition set body height to auto so that expandable children are visible
                this.contentContainer.addEventListener("transitionend", this);
                this.contentContainer.style.height = this.content.clientHeight + "px";
            }
            else {
                // the following line is needed because height has been restored to auto"
                this.contentContainer.style.height = this.content.clientHeight + "px";
                this.taskQueue.queueTask(() => {
                    this.contentContainer.style.overflow = "hidden";
                    this.contentContainer.style.height = "0";
                });
            }
        }
        toggle() {
            if (!this.openBoolean && normalizeBooleanAttribute('accordion', this.accordion)) {
                const otherAccordions = Array.from(this.element.parentElement.querySelectorAll('ux-expandable[accordion].ux-expandable--open'));
                otherAccordions.filter(x => x !== this.element)
                    .map(x => x.au['ux-expandable'].viewModel)
                    .forEach(x => x.toggle());
            }
            this.open = !this.openBoolean;
        }
    };
    UxExpandable.OPEN_CHANGED_EVENT = 'open-changed';
    __decorate([
        bindable
    ], UxExpandable.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxExpandable.prototype, "open", void 0);
    __decorate([
        bindable
    ], UxExpandable.prototype, "accordion", void 0);
    UxExpandable = UxExpandable_1 = __decorate([
        inject(Element, StyleEngine, TaskQueue),
        customElement('ux-expandable'),
        useView(PLATFORM.moduleName('./ux-expandable.html'))
    ], UxExpandable);
    return UxExpandable;
})();
export { UxExpandable };
//# sourceMappingURL=ux-expandable.js.map