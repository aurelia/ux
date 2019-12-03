import { customElement, bindable, ViewResources } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { computedFrom } from 'aurelia-binding';
import { Moment } from './resources/moment-rexports';
// import UX_YEAR_LIST_VIEW from './ux-year-list.html';
// import { PLATFORM } from 'aurelia-pal';

@inject(Element, ViewResources)
@customElement('ux-year-list')
// @inlineView(
//   UX_YEAR_LIST_VIEW,
//   [PLATFORM.moduleName('@aurelia-ux/datepicker/ux-year-list.css')]
// )
export class UxYearList {
  @bindable public theme = null;

  @bindable public minDate: Moment;
  @bindable public maxDate: Moment;

  @bindable public value: Moment;

  private today = new Date();

  constructor(public element: Element, public resources: ViewResources) {
    this.today.setHours(0, 0, 0, 0);
  }

  public attached() {
    this.scrollToActive();
  }

  public selectYear(year: number) {
    this.value = this.value.clone().set('year', year);
  }

  @computedFrom('minDate', 'maxDate')
  public get yearList() {
    const yearList: number[] = [];
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

  private scrollToActive() {
    let selected = this.element.querySelector('div.selected');

    if (selected == null && this.element.children.length > 5) {
      selected = this.element.children[Math.round(this.element.children.length / 2)];
    }

    if (selected != null) {
      selected.scrollIntoView();
    }
  }
}
