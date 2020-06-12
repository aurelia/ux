import { __decorate } from "tslib";
import { customElement, useView, PLATFORM, bindable, TaskQueue, inject } from 'aurelia-framework';
import { StyleEngine, normalizeBooleanAttribute } from '@aurelia-ux/core';
var UxExpandable = /** @class */ (function () {
    function UxExpandable(element, styleEngine, taskQueue) {
        this.element = element;
        this.styleEngine = styleEngine;
        this.taskQueue = taskQueue;
        this.openBoolean = false;
        this.open = false;
        this.accordion = false;
    }
    UxExpandable_1 = UxExpandable;
    UxExpandable.prototype.themeChanged = function (newValue) {
        if (newValue != null && newValue.themeKey == null) {
            newValue.themeKey = 'expandable';
        }
        this.styleEngine.applyTheme(newValue, this.element);
    };
    UxExpandable.prototype.openChanged = function () {
        this.openBoolean = normalizeBooleanAttribute('open', this.open);
        this.updateContainerHeight();
        this.element.dispatchEvent(new CustomEvent(UxExpandable_1.OPEN_CHANGED_EVENT, { detail: { component: this, open: this.openBoolean } }));
    };
    UxExpandable.prototype.handleEvent = function (e) {
        switch (e.type) {
            case 'transitionend':
                this.setContentContainerHeightToAuto();
                break;
        }
    };
    UxExpandable.prototype.setContentContainerHeightToAuto = function () {
        this.contentContainer.style.overflow = "visible";
        this.contentContainer.style.height = "auto";
        this.contentContainer.removeEventListener("transitionend", this);
    };
    UxExpandable.prototype.bind = function () { };
    UxExpandable.prototype.attached = function () {
        this.openChanged();
    };
    UxExpandable.prototype.updateContainerHeight = function () {
        var _this = this;
        if (this.openBoolean) {
            // after transition set body height to auto so that expandable children are visible
            this.contentContainer.addEventListener("transitionend", this);
            this.contentContainer.style.height = this.content.clientHeight + "px";
        }
        else {
            // the following line is needed because height has been restored to auto"
            this.contentContainer.style.height = this.content.clientHeight + "px";
            this.taskQueue.queueTask(function () {
                _this.contentContainer.style.overflow = "hidden";
                _this.contentContainer.style.height = "0";
            });
        }
    };
    UxExpandable.prototype.toggle = function () {
        var _this = this;
        if (!this.openBoolean && normalizeBooleanAttribute('accordion', this.accordion)) {
            var otherAccordions = Array.from(this.element.parentElement.querySelectorAll('ux-expandable[accordion].ux-expandable--open'));
            otherAccordions.filter(function (x) { return x !== _this.element; })
                .map(function (x) { return x.au['ux-expandable'].viewModel; })
                .forEach(function (x) { return x.toggle(); });
        }
        this.open = !this.openBoolean;
    };
    var UxExpandable_1;
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
}());
export { UxExpandable };
//# sourceMappingURL=ux-expandable.js.map