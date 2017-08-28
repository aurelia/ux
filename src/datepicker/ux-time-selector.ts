import { customElement, bindable, ViewResources, View, processAttributes } from 'aurelia-templating';
import { inject } from 'aurelia-dependency-injection';
import { StyleEngine } from '../styles/style-engine';
import { Themable } from '../styles/themable';
import { processDesignAttributes } from '../designs/design-attributes';
import { observable, computedFrom } from 'aurelia-binding';
import { Moment } from 'moment';
import * as moment from 'moment';

@inject(Element, ViewResources, StyleEngine)
@customElement('ux-time-selector')
@processAttributes(processDesignAttributes)
export class UxTimeSelector implements Themable {
  @bindable public theme = null;
  @bindable public minTime: Moment | null;
  @bindable public maxTime: Moment | null;
  @bindable public value: Moment;

  public view: View;

  @observable private selectedAmPm: string = 'am';

  constructor(public element: Element, public resources: ViewResources, private styleEngine: StyleEngine) { }

  public created(_: any, myView: View) {
    this.view = myView;
  }

  public bind() {
    if (this.theme) {
      this.styleEngine.applyTheme(this, this.theme);
    }

    if (this.hour12 === true) {
      if (this.value.hour() > 12) {
        this.selectedAmPm = 'pm';
      } else {
        this.selectedAmPm = 'am';
      }
    }
  }

  public themeChanged(newValue: any) {
    this.styleEngine.applyTheme(this, newValue);
  }

  public changeAmPm(newValue: string) {
    const value = this.value.clone();

    if (newValue === 'am' && this.value.hour() >= 12) {
      value.subtract('hours', 12);
    }

    if (newValue === 'pm' && this.value.hour() < 12) {
      value.add('hours', 12);
    }

    if (this.isValidTime(value)) {
      this.value = value;
    }
  }

  @computedFrom('minTime', 'maxTime', 'value', 'selectedAmPm')
  public get hoursBelow() {
    const hours = new Array<any>();
    let counter = 1;

    while (hours.length < 2) {
      const currentHour = this.value.clone().subtract(counter, 'hour');

      if (this.hour12 && this.value.hour() >= 12 && currentHour.hour() === 11) {
        return hours;
      } else if (currentHour.hour() === 23) {
        return hours;
      }

      hours.splice(0, 0, currentHour);

      counter++;
    }

    return hours;
  }

  @computedFrom('minTime', 'maxTime', 'value', 'selectedAmPm')
  public get hoursAbove() {
    const hours = new Array<any>();
    let counter = 1;

    while (hours.length < 2) {
      const currentHour = this.value.clone().add(counter, 'hour');

      if (this.hour12 && this.value.hour() < 12 && currentHour.hour() === 12) {
        return hours;
      } else if (currentHour.hour() === 0) {
        return hours;
      }

      hours.push(currentHour);

      counter++;
    }

    return hours;
  }

  @computedFrom('minTime', 'maxTime', 'value', 'selectedAmPm')
  public get minutesBelow() {
    const minutes = new Array<any>();
    let counter = 1;

    while (minutes.length < 2) {
      const currentMinute = this.value.clone().subtract(counter, 'minute');

      if (currentMinute.minute() === 59) {
        return minutes;
      }

      minutes.splice(0, 0, currentMinute);

      counter++;
    }

    return minutes;
  }

  @computedFrom('minTime', 'maxTime', 'value', 'selectedAmPm')
  public get minutesAbove() {
    const minutes = new Array<any>();
    let counter = 1;

    while (minutes.length < 2) {
      const currentMinute = this.value.clone().add(counter, 'minute');

      if (currentMinute.minute() === 0) {
        return minutes;
      }

      minutes.push(currentMinute);

      counter++;
    }

    return minutes;
  }

  public selectHour(hour: Moment) {
    if (this.isValidTime(hour)) {
      this.value = hour;
    }
  }

  public selectMinute(minute: Moment) {
    if (this.isValidTime(minute)) {
      this.value = minute;
    }
  }

  public hourScroll(event: MouseWheelEvent) {
    let value: Moment;

    if (event.deltaY > 0) {
      value = this.value.clone().add(1, 'hour');
    } else {
      value = this.value.clone().subtract(1, 'hour');
    }

    if (this.isValidTime(value)) {
      this.value = value;
    }
  }

  public minuteScroll(event: MouseWheelEvent) {
    let value: Moment;

    if (event.deltaY > 0) {
      value = this.value.clone().add(1, 'minute');
    } else {
      value = this.value.clone().subtract(1, 'minute');
    }

    if (this.isValidTime(value) === false || this.value.isSame(value, 'hour') === false) {
      return;
    }

    this.value = value;
  }

  public isValidTime(value: Moment) {
    let minHour = 0;
    let maxHour = 23;
    let minMinute = 0;
    let maxMinute = 59;

    if (this.hour12 === true) {
      maxHour = value.hour() < 12 ? 11 : 23;
      minHour = value.hour() < 12 ? 0 : 12;
    }

    if (this.maxTime != null && maxHour > this.maxTime.hour()) {
      maxHour = this.maxTime.hour();
    }

    if (this.minTime != null && minMinute < this.minTime.minute()) {
      minMinute = this.minTime.minute();
    }

    if (this.maxTime != null && maxMinute > this.maxTime.minute()) {
      maxMinute = this.maxTime.minute();
    }

    if (this.minTime != null && minHour < this.minTime.hour()) {
      minHour = this.minTime.hour();
    }

    // This gets rid of a typescript caused by passing null into a moment comparison
    const blank: any = null;

    return value.isBetween(
      this.value.clone()
        .hour(minHour)
        .minute(minMinute),
      this.value.clone()
        .hour(maxHour)
        .minute(maxMinute), blank, '[]');
  }

  private get hour12() {
    if (moment().format('LT').match(/am|pm/i)) {
      return true;
    } else {
      return false;
    }
  }
}
