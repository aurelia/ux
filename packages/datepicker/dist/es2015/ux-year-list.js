import { __decorate } from "tslib";
import { customElement, bindable, ViewResources, useView } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { computedFrom } from 'aurelia-binding';
import { PLATFORM } from 'aurelia-pal';
// import UX_YEAR_LIST_VIEW from './ux-year-list.html';
// import { PLATFORM } from 'aurelia-pal';
let UxYearList = /** @class */ (() => {
    let UxYearList = 
    // @inlineView(
    //   UX_YEAR_LIST_VIEW,
    //   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list.css')]
    // )
    class UxYearList {
        constructor(element, resources) {
            this.element = element;
            this.resources = resources;
            this.theme = null;
            this.today = new Date();
            this.today.setHours(0, 0, 0, 0);
        }
        attached() {
            this.scrollToActive();
        }
        selectYear(year) {
            this.value = this.value.clone().set('year', year);
        }
        get yearList() {
            const yearList = [];
            let min = 1900;
            let max = 2100;
            if (this.minDate) {
                min = this.minDate.year();
            }
            if (this.maxDate) {
                max = this.maxDate.year();
            }
            while (min <= max) {
                yearList.push(min);
                min++;
            }
            return yearList;
        }
        scrollToActive() {
            let selected = this.element.querySelector('div.selected');
            if (selected == null && this.element.children.length > 5) {
                selected = this.element.children[Math.round(this.element.children.length / 2)];
            }
            if (selected != null) {
                selected.scrollIntoView();
            }
        }
    };
    __decorate([
        bindable
    ], UxYearList.prototype, "theme", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "minDate", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "maxDate", void 0);
    __decorate([
        bindable
    ], UxYearList.prototype, "value", void 0);
    __decorate([
        computedFrom('minDate', 'maxDate')
    ], UxYearList.prototype, "yearList", null);
    UxYearList = __decorate([
        inject(Element, ViewResources),
        customElement('ux-year-list'),
        useView(PLATFORM.moduleName('./ux-year-list.html'))
        // @inlineView(
        //   UX_YEAR_LIST_VIEW,
        //   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list.css')]
        // )
    ], UxYearList);
    return UxYearList;
})();
export { UxYearList };
//# sourceMappingURL=ux-year-list.js.map