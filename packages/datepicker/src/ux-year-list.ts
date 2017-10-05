import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { computedFrom } from 'aurelia-binding';
import { StyleEngine } from 'aurelia-ux';
import { Themable } from 'aurelia-ux';
import { processDesignAttributes } from 'aurelia-ux';
import { Moment } from 'moment';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-year-list')
@processAttributes(processDesignAttributes)
export class UxYearList implements Themable {
  @bindable public theme = null;

  public view: View;

  @bindable public minDate: Moment;
  @bindable public maxDate: Moment;

  @bindable public value: Moment;

  private today = new Date();

  constructor(public element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.today.setHours(0, 0, 0, 0);
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }
  }

  public attached() {
    this.scrollToActive();
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public selectYear(year: number) {
    this.value = this.value.clone().set('year', year);
  }

  @computedFrom('minDate', 'maxDate')
  public get yearList() {
    const yearList: Array<number> = [];
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
